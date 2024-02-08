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
import {Conversas} from '../models';
import {ConversasRepository} from '../repositories';

export class ConversaController {
  constructor(
    @repository(ConversasRepository)
    public conversasRepository : ConversasRepository,
  ) {}

  @post('/conversas')
  @response(200, {
    description: 'Conversas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conversas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversas, {
            title: 'NewConversas',
            exclude: ['id'],
          }),
        },
      },
    })
    conversas: Omit<Conversas, 'id'>,
  ): Promise<Conversas> {
    return this.conversasRepository.create(conversas);
  }

  @get('/conversas/count')
  @response(200, {
    description: 'Conversas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conversas) where?: Where<Conversas>,
  ): Promise<Count> {
    return this.conversasRepository.count(where);
  }

  @get('/conversas')
  @response(200, {
    description: 'Array of Conversas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conversas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conversas) filter?: Filter<Conversas>,
  ): Promise<Conversas[]> {
    return this.conversasRepository.find(filter);
  }

  @patch('/conversas')
  @response(200, {
    description: 'Conversas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversas, {partial: true}),
        },
      },
    })
    conversas: Conversas,
    @param.where(Conversas) where?: Where<Conversas>,
  ): Promise<Count> {
    return this.conversasRepository.updateAll(conversas, where);
  }

  @get('/conversas/{id}')
  @response(200, {
    description: 'Conversas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conversas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Conversas, {exclude: 'where'}) filter?: FilterExcludingWhere<Conversas>
  ): Promise<Conversas> {
    return this.conversasRepository.findById(id, filter);
  }

  @patch('/conversas/{id}')
  @response(204, {
    description: 'Conversas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversas, {partial: true}),
        },
      },
    })
    conversas: Conversas,
  ): Promise<void> {
    await this.conversasRepository.updateById(id, conversas);
  }

  @put('/conversas/{id}')
  @response(204, {
    description: 'Conversas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conversas: Conversas,
  ): Promise<void> {
    await this.conversasRepository.replaceById(id, conversas);
  }

  @del('/conversas/{id}')
  @response(204, {
    description: 'Conversas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conversasRepository.deleteById(id);
  }
}
