import logger from '@/utils/logger';

export class HealthService {
  constructor() {}

  async addUser({ username, email }: { username: string; email: string }) {
    logger.info(`[adding user]: ${username}, ${email}`);

    const newUser = { id: Date.now(), username, email };

    return { status: 'ok', message: 'User added successfully', user: newUser };
  }
}
