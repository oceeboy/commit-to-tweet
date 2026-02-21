import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// 1. Load env ONCE
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

// 2. Define strict env schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().int().positive(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),

  // Example secrets (add yours)
  JWT_SECRET: z.string().min(32),
  DATABASE_URL: z.string().url(),
});

// 3. Validate environment
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsedEnv.error.format());
  process.exit(1); // FAIL FAST (critical for prod)
}

// 4. Export immutable, typed config
export const config = Object.freeze({
  env: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  logLevel: parsedEnv.data.LOG_LEVEL,

  jwt: {
    secret: parsedEnv.data.JWT_SECRET,
  },

  database: {
    url: parsedEnv.data.DATABASE_URL,
  },

  isProd: parsedEnv.data.NODE_ENV === 'production',
  isDev: parsedEnv.data.NODE_ENV === 'development',
});
