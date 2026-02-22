import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../config/env';
import logger from '../utils/logger';

/**
 * Verifies GitHub webhook signatures using HMAC SHA-256.
 *
 * IMPORTANT:
 * This middleware MUST be used with `express.raw({ type: 'application/json' })`
 * on the webhook route so that `req.body` is a Buffer.
 */
export function verifyGithubSignature(req: Request, res: Response, next: NextFunction): void {
  const method = req.method;
  const url = req.originalUrl;

  logger.debug(`[GitHubSignatureMiddleware] Verifying signature for ${method} ${url}`);

  const signatureHeader = req.headers['x-hub-signature-256'];

  if (!signatureHeader) {
    logger.warn('[GitHubSignatureMiddleware] Missing x-hub-signature-256 header');
    res.status(401).json({ message: 'Missing GitHub signature' });
    return;
  }

  if (Array.isArray(signatureHeader)) {
    logger.warn('[GitHubSignatureMiddleware] Multiple signature headers received');
    res.status(400).json({ message: 'Invalid GitHub signature header' });
    return;
  }

  const webhookSecret = config.github.webhookSecret;
  if (!webhookSecret) {
    logger.error('[GitHubSignatureMiddleware] GitHub webhook secret not configured');
    res.status(500).json({ message: 'Server misconfiguration' });
    return;
  }

  if (!Buffer.isBuffer(req.body)) {
    logger.error('[GitHubSignatureMiddleware] Request body is not a Buffer');
    res.status(400).json({
      message: 'Invalid payload format. Did you forget express.raw()?',
    });
    return;
  }

  const expectedSignature = createGithubSignature(req.body, webhookSecret);

  try {
    if (!safeCompare(signatureHeader, expectedSignature)) {
      logger.warn(`[GitHubSignatureMiddleware] Invalid signature for ${method} ${url}`);
      res.status(401).json({ message: 'Invalid GitHub signature' });
      return;
    }
  } catch (error) {
    logger.error('[GitHubSignatureMiddleware] Signature comparison failed', error);
    res.status(400).json({ message: 'Invalid GitHub signature' });
    return;
  }

  next();
}

/**
 * Creates the expected GitHub signature for a given payload.
 */
function createGithubSignature(payload: Buffer, secret: string): string {
  const digest = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  return `sha256=${digest}`;
}

/**
 * Constant-time comparison to prevent timing attacks.
 */
function safeCompare(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}
