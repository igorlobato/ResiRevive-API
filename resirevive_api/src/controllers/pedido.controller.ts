import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pedidos} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidoController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository : PedidosRepository,
  ) {}

  @post('/pedidos')
  @response(200, {
    description: 'Pedidos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidos',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.pedidosRepository.create(pedidos);
  }

  @get('/pedidos/count')
  @response(200, {
    description: 'Pedidos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pedidos) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.pedidosRepository.count(where);
  }

  @get('/pedidos')
  @response(200, {
    description: 'Array of Pedidos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pedidos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pedidos) filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.pedidosRepository.find(filter);
  }

  @patch('/pedidos')
  @response(200, {
    description: 'Pedidos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Pedidos,
    @param.where(Pedidos) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.pedidosRepository.updateAll(pedidos, where);
  }

  @get('/pedidos/{id}')
  @response(200, {
    description: 'Pedidos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedidos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pedidos, {exclude: 'where'}) filter?: FilterExcludingWhere<Pedidos>
  ): Promise<Pedidos> {
    return this.pedidosRepository.findById(id, filter);
  }

  @patch('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Pedidos,
  ): Promise<void> {
    await this.pedidosRepository.updateById(id, pedidos);
  }

  @put('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pedidos: Pedidos,
  ): Promise<void> {
    await this.pedidosRepository.replaceById(id, pedidos);
  }

  @del('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidosRepository.deleteById(id);
  }
}
