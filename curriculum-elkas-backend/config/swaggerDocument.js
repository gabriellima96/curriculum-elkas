module.exports = {
  json: {
    swagger: '2.0',
    info: {
      description: 'API do software: Curriculum-Elkas: Gerador de currículo online',
      version: '1.0.0',
      title: 'Curriculum-Elkas API',
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
        name: 'Users',
        description: 'Rota para operações com o(a) Usuário(a)',
      },
      {
        name: 'Curriculums',
        description: 'Rota para operações com Curriculums',
      },
    ],
    schemes: ['http'],
    paths: {
      '/users/signin': {
       post: {
          tags: ['Users'],
          summary: 'Entrar no sistema',
          description: 'Entrar no sistema para receber um Token de acesso para as demais áreas',
          operationId: 'signin',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                'Um JSON contendo o e-mail e senha do usuário. Obs: também pode enviar o usuário no atributo e-mail.',
              required: true,
              schema: {
                $ref: '#/definitions/Credentials',
              },
            },
          ],
          responses: {
            200: {
              description: 'Sucesso!',
            },
            400: {
              description: 'Senha inválida',
            },
			      404: {
			        description: 'E-mail/Usuário não encontrado',
			      },
          },
        },
      },
      '/users/{username}': {
        get: {
          tags: ['Users'],
          summary: 'Buscar o usuário por username',
          description: 'Buscar informações sobre o usuário pelo username',
          operationId: 'userController.index',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'path',
              name: 'username',
              description: 'O username que precisa ser buscado',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'Sucesso na operação!',
              schema: {
                $ref: '#/definitions/User',
              },
            },
            404: {
              description: 'Usuário não encontrado!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
            403: {
              description: 'Permissão negada para acessar esse usuário!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
          },
        },
        '/users': {
          post: {
            tags: ['Users'],
            summary: 'Cadastro no sistema',
            description: 'Cadastro no sistema',
            operationId: 'signup',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Um JSON contendo o e-mail, username, name e password do usuário.',
                required: true,
                schema: {
                  $ref: '#/definitions/Signup',
                },
              },
            ],
            responses: {
              200: {
                description: 'Sucesso! Será retornado um objeto user e um token!',
              },
              400: {
                description: 'Já existe um usuário com o e-mail cadastrado!',
              },
              405: {
                description: 'O campo é [nome] obrigatório!',
              },
              409: {
                description: 'Já existe um usuário com o username cadastrado!',
              },           
            },
          },
        },
        put: {
          tags: ['Users'],
          summary: 'Atualizar o usuário por username',
          description: 'Atualizar informações sobre o usuário pelo username',
          operationId: 'userController.update',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'path',
              name: 'username',
              description: 'O username que precisa ser buscado',
              required: true,
              type: 'string',
            },
            {
              in: 'body',
              name: 'body',
              description: 'Objeto user atualizado',
              required: true,
              schema: {
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
                  currentPassword: {
                    type: 'string',
                  },
                  newPassword: {
                    type: 'string',
                  },
                  personalInformation: {
                    type: 'object',
                    properties: {
                      emails: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      phones: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      dataOfbirth: {
                        type: 'string',
                        format: 'date',
                      },
                      maritalStatus: {
                        type: 'string',
                      },
                      academicDegree: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            institution: {
                              type: 'string',
                            },
                            degree: {
                              type: 'string',
                            },
                            course: {
                              type: 'string',
                            },
                            initialization: {
                              type: 'string',
                              format: 'date',
                            },
                            conclusion: {
                              type: 'string',
                              format: 'date',
                            },
                          },
                        },
                      },
                    },
                  },
                  address: {
                    type: 'object',
                    properties: {
                      publicArea: {
                        type: 'string',
                      },
                      district: {
                        type: 'string',
                      },
                      city: {
                        type: 'string',
                      },
                      postalCode: {
                        type: 'string',
                      },
                      country: {
                        type: 'string',
                      },
                      state: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          ],
          responses: {
            200: {
              description: 'Sucesso na operação!',
              schema: {
                $ref: '#/definitions/User',
              },
            },
            404: {
              description: 'Usuário não encontrado!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
            403: {
              description: 'Permissão negada para acessar esse usuário!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
            401: {
              description: 'Senha atual inválida',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
            409: {
              description: 'Já existe um usuário com o username cadastrado!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
            400: {
              description: 'Já existe um usuário com o e-mail cadastrado!',
              schema: {
                $ref: '#/definitions/ApiResponse',
              },
            },
          },
        },
      },
      '/curriculums': {
        post: {
          tags: ['Curriculums'],
          summary: 'Criar um novo curriculum no sistema',
          description: 'Criar um novo curriculum no sistema',
          operationId: 'curriculum.store',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'Um JSON contendo os dados do curriculum',
              required: true,
              schema: {
                $ref: '#/definitions/Curriculum',
              },
            },
          ],
          responses: {
            404: {
              description: 'Sucesso!',
            },
            400: {
              description: 'Mal Requisição!',
            },
			      404: {
			        description: 'Não Encontrado!',
			      },
          },
        },
      },
    },
    definitions: {
      Credentials: {
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
      User: {
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
          personalInformation: {
            type: 'object',
            properties: {
              emails: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              phones: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              dataOfbirth: {
                type: 'string',
                format: 'date',
              },
              maritalStatus: {
                type: 'string',
              },
              academicDegree: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    institution: {
                      type: 'string',
                    },
                    degree: {
                      type: 'string',
                    },
                    course: {
                      type: 'string',
                    },
                    initialization: {
                      type: 'string',
                      format: 'date',
                    },
                    conclusion: {
                      type: 'string',
                      format: 'date',
                    },
                  },
                },
              },
            },
          },
          address: {
            type: 'object',
            properties: {
              publicArea: {
                type: 'string',
              },
              district: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
              },
              state: {
                type: 'string',
              },
            },
          },
        },
      },
      Curriculum: {
        type: 'object',
        properties: {
          user: {
            type: 'string',
          },
          template: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          emails: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          phones: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          dataOfbirth: {
            type: 'string',
            format: 'date',
          },
          maritalStatus: {
            type: 'string',
          },
          academicDegree: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                institution: {
                  type: 'string',
                },
                degree: {
                  type: 'string',
                },
                course: {
                  type: 'string',
                },
                initialization: {
                  type: 'string',
                  format: 'date',
                },
                conclusion: {
                  type: 'string',
                  format: 'date',
                },
              },
            },
          },
          address: {
            type: 'object',
            properties: {
              publicArea: {
                type: 'string',
              },
              district: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
              },
              state: {
                type: 'string',
              },
            },
          },
          goals: {
            type: 'string',
            required: true,
          },
          skills: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                other: {
                  type: 'string',
                },
              },
            },
          },
          experiences: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                office: {
                  type: 'string',
                },
                location: {
                  type: 'string',
                },
                company: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                type: {
                  type: 'string',
                },
                initialization: {
                  type: 'string',
                  format: 'date',
                },
                conclusion: {
                  type: 'string',
                  format: 'date',
                },
              },
            },
          },
          languages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                language: {
                  type: 'string',
                },
                fluency: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'number',
          },
          error: {
            type: 'string',
          },
        },
      },
    },
  },
};
