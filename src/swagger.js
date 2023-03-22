export default {
  openapi: '3.0.1',
  info: {
    title: 'API REST - E-commerce Back-end',
    description: 'Sistema de gerenciamento de produtos e categorias.',
    contact: {
      email: 'lucaasmedeiros7@gmail.com@gmail.com'
    },
    version: 1.0
  },
  tags: [
    {
      name: 'Autorização'
    },
    {
      name: 'Categorias'
    },
    {
      name: 'Produtos'
    }
  ],
  paths: {
    '/auth': {
      get: {
        tags: ['Autorização'],
        summary: 'Retorna o Token de acesso',
        description: 'Token de acesso',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Auth'
                }
              }
            }
          },
          403: {
            description: 'Token não fornecido.'
          },
          401: {
            description: 'Token inválido.'
          }
        }
      }
    },
    '/categories': {
      post: {
        tags: ['Categorias'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Cria uma categoria',
        description: 'Criação de categoria',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Category'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Categoria criada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          404: {
            description: 'Categoria já cadastrada".'
          },
          500: {
            description: 'Internal server error.'
          }
        }
      },
      get: {
        tags: ['Categorias'],
        summary: 'Retorna todas as categorias',
        description: 'Listagem de categorias',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category'
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request.'
          }
        }
      }
    },
    '/categories/{id}': {
      put: {
        tags: ['Categorias'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Editar categoria',
        description: 'Atualizar nome da categoria',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Category id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        requestBody: {
          description: 'Updated category object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Category'
              }
            }
          }
        },
        responses: {
          201: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          404: {
            description: 'Categoria não existe.'
          }
        }
      },
      delete: {
        tags: ['Categorias'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Deleta categoria pelo id',
        description: 'Deleção de categorias',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Category id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          201: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          404: {
            description: 'Categoria não existente.'
          }
        }
      }
    },
    '/products': {
      get: {
        tags: ['Produtos'],
        summary: 'Retorna todos os produtos',
        description: 'Listagem de produtos',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      format: 'int64',
                      readOnly: true
                    },
                    description: {
                      type: 'string',
                      example: 'Novo produto'
                    },
                    retailPrice: {
                      type: 'number',
                      example: 150
                    },
                    wholesalePrice: {
                      type: 'number',
                      example: 150
                    },
                    categories: {
                      type: 'array',
                      example: ['Categoria 1']
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request.'
          }
        }
      },
      post: {
        tags: ['Produtos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Criar um produto',
        description: 'Criação de produtos',
        requestBody: {
          description: 'Created product object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Produto criado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          400: {
            description: 'ID de categoria informado não existente.'
          }
        }
      }
    },
    '/products/{id}': {
      get: {
        tags: ['Produtos'],
        summary: 'Lista produto pelo id',
        description: 'Retorna apenas um produto',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          404: {
            description: 'Product not found.'
          },
          500: {
            description: 'Internal server error.'
          }
        }
      },
      put: {
        tags: ['Produtos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Editar um produto',
        description: 'Atualiza informações de um produto existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        requestBody: {
          description: 'Updated product object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          }
        },
        404: {
          description: 'Product not found.'
        },
        500: {
          description: 'Internal server error.'
        }
      },
      delete: {
        tags: ['Produtos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Deletar um produto pelo id',
        description: 'Deleção de produtos',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product id',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          404: {
            description: 'Product not found.'
          },
          500: {
            description: 'Internal server error.'
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Auth: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string'
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          name: {
            type: 'string',
            example: 'Category 0'
          }
        },
        required: ['id, name']
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            readOnly: true
          },
          description: {
            type: 'string',
            example: 'Novo produto'
          },
          retailPrice: {
            type: 'number',
            example: 150
          },
          wholesalePrice: {
            type: 'number',
            example: 150
          },
          categories: {
            type: 'array',
            example: [1, 2]
          }
        },
        required: [
          'id, description, retailPrice, wholesalePrice, categories'
        ]
      }
    }
  }
}
