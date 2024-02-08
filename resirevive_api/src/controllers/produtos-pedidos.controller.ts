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
  Produtos,
  Pedidos,
} from '../models';
import {ProdutosRepository} from '../repositories';

export class ProdutosPedidosController {
  constructor(
    @repository(ProdutosRepository) protected produtosRepository: ProdutosRepository,
  ) { }

  @get('/produtos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Produtos has one Pedidos',
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
    return this.produtosRepository.pedidos(id).get(filter);
  }

  @post('/produtos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Produtos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Produtos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInProdutos',
            exclude: ['id'],
            optional: ['produtosId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.produtosRepository.pedidos(id).create(pedidos);
  }

  @patch('/produtos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Produtos.Pedidos PATCH success count',
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
    return this.produtosRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/produtos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Produtos.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.produtosRepository.pedidos(id).delete(where);
  }
}
