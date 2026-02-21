import z from 'zod';
import { HealthUserSchema } from './health.validator';

export type HealthUserInput = z.infer<typeof HealthUserSchema>;

// export interface IHealthController {
//   checkHealth(): Promise<{ status: string }>;
//   checkDatabase(): Promise<{ status: string }>;
//   addUser(id: number, userData: HealthUserInput): Promise<{ id: number; username: string; email: string }>;
// }
