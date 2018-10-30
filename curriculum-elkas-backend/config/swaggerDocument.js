module.exports = {
  json: {
    swagger: '2.0',
    info: {
      description: 'API do software: Curriculum-Elkas: Gerador de currículo online',
      version: '1.0.0',
      title: 'Aplicação Curriculum Elkas API',
      contact: {
        email: 'gabriellima.silva96@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    host: '167.99.182.79',
    basePath: '/api',
    tags: [
      {
        name: 'Signin',
        description: 'API para entrar no sistema',
      },
      {
        name: 'Signup',
        description: 'API para se cadastrar no sistema',
      },
      {
        name: 'Users',
        description: 'API para fazer operações com Usuário',
      },
    ],
    schemes: ['http'],
    paths: {
      '/signin': {
        post: {
          tags: ['Signin'],
          summary: 'Entra no sistema',
          description: 'Entrar no sistema para receber um Token de acesso as demais áreas',
          operationId: 'signin',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                'Um JSON contendo o email e senha do usuário. Obs: também pode enviar o usuário no atributo email.',
              required: true,
              schema: {
                $ref: '#/definitions/Signin',
              },
            },
          ],
          responses: {
            200: {
              description: 'Invalid input',
            },
            401: {
              description: 'Invalid ...',
            },
          },
        },
      },
      '/signup': {
        post: {
          tags: ['Signup'],
          summary: 'Cadastro no sistema',
          description: 'Cadastro no sistema',
          operationId: 'signup',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'Um JSON contendo o email, username, name e password do usuário.',
              required: true,
              schema: {
                $ref: '#/definitions/Signup',
              },
            },
          ],
          responses: {
            400: {
              description: 'Já existe um usuário com o e-mail cadastrado',
            },
            409: {
              description: 'Já existe um usuário com o username cadastrado',
            },
            200: {
              description: 'Sucesso, será retornado um objeto user e um token',
            },
          },
        },
      },
    },
    definitions: {
      Signin: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      Signup: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
    },
  },
};
