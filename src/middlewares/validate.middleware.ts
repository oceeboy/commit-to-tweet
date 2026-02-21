import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

type ValidateTarget = 'body' | 'query' | 'params';

interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

interface ValidationResponse {
  success: false;
  errors: ValidationError[];
}

export class Validator {
  constructor(
    private schema: ZodSchema,
    private target: ValidateTarget = 'body',
  ) {}

  validate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = req[this.target];

      // Parse and validate - this will throw ZodError if invalid
      const validatedData = this.schema.parse(dataToValidate);

      // Attach validated data back to request for use in route handler
      // This allows access via req.validatedBody, req.validatedQuery, etc.
      const key = `validated${this.target.charAt(0).toUpperCase() + this.target.slice(1)}` as const;
      (req as any)[key] = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = this.formatZodErrors(error);
        res.status(400).json({
          success: false,
          errors: formattedErrors,
        } as ValidationResponse);
      } else {
        // Handle unexpected errors
        res.status(500).json({
          success: false,
          errors: [
            {
              field: 'unknown',
              message: 'An unexpected validation error occurred',
            },
          ],
        });
      }
    }
  };

  /**
   * Formats Zod errors into a more user-friendly structure
   */
  private formatZodErrors(error: ZodError): ValidationError[] {
    return error.issues.map((issue) => ({
      field: issue.path.join('.') || 'root',
      message: issue.message,
      code: issue.code,
    }));
  }
}

/**
 * Factory function for creating validators with better ergonomics
 */
export const validate = (schema: ZodSchema, target: ValidateTarget = 'body') => {
  return new Validator(schema, target).validate;
};
