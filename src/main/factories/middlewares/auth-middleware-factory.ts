import { makeDbLoadAccountByToken } from '@/main/factories/usecases';
import { AuthMiddleware } from '@/presentation/middlewares';
import { Middleware } from '@/presentation/protocols';

export const makeAuthMiddleware = (role?: string): Middleware => {
  const authMiddleware = new AuthMiddleware(makeDbLoadAccountByToken(), role);
  return authMiddleware;
};
