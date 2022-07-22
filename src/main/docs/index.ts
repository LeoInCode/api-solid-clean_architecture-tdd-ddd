import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Solid Clean Architecture TDD DDD',
    description: 'Projeto desenvolvido seguindo o curso do Rodrigo Mango',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'Enquete',
    },
  ],
  paths,
  schemas,
  components,
};
