import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Produtos,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioProdutosController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/produtos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Produtos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Produtos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Produtos>,
  ): Promise<Produtos[]> {
    return this.usuarioRepository.produtos(id).find(filter);
  }

  @post('/usuarios/{id}/produtos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Produtos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produtos, {
            title: 'NewProdutosInUsuario',
            exclude: ['id'],
            optional: ['id_dono']
          }),
        },
      },
    }) produtos: Omit<Produtos, 'id'>,
  ): Promise<Produtos> {
    return this.usuarioRepository.produtos(id).create(produtos);
  }

  @patch('/usuarios/{id}/produtos', {
    responses: {
      '200': {
        description: 'Usuario.Produtos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produtos, {partial: true}),
        },
      },
    })
    produtos: Partial<Produtos>,
    @param.query.object('where', getWhereSchemaFor(Produtos)) where?: Where<Produtos>,
  ): Promise<Count> {
    return this.usuarioRepository.produtos(id).patch(produtos, where);
  }

  @del('/usuarios/{id}/produtos', {
    responses: {
      '200': {
        description: 'Usuario.Produtos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Produtos)) where?: Where<Produtos>,
  ): Promise<Count> {
    return this.usuarioRepository.produtos(id).delete(where);
  }
}
