import { adaptResolver } from '@/main/adapters';
import { makeLoginController } from '../../factories/controllers/login-controller-factory';

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args),
  },
};
