export const notFound = {
  description: 'Api não encontrada',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
