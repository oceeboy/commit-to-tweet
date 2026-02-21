import { z } from 'zod';

export const HealthUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
});
