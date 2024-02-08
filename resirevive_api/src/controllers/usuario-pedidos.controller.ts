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
  Pedidos,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPedidosController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuario has one Pedidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pedidos),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos> {
    return this.usuarioRepository.pedidos(id).get(filter);
  }

  @post('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.usuarioRepository.pedidos(id).create(pedidos);
  }

  @patch('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuario.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.usuarioRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/usuarios/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Usuario.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.usuarioRepository.pedidos(id).delete(where);
  }
}
