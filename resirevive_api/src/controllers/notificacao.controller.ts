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
import {Notificacoes} from '../models';
import {NotificacoesRepository} from '../repositories';

export class NotificacaoController {
  constructor(
    @repository(NotificacoesRepository)
    public notificacoesRepository : NotificacoesRepository,
  ) {}

  @post('/notificacoes')
  @response(200, {
    description: 'Notificacoes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Notificacoes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacoes, {
            title: 'NewNotificacoes',
            exclude: ['id'],
          }),
        },
      },
    })
    notificacoes: Omit<Notificacoes, 'id'>,
  ): Promise<Notificacoes> {
    return this.notificacoesRepository.create(notificacoes);
  }

  @get('/notificacoes/count')
  @response(200, {
    description: 'Notificacoes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Notificacoes) where?: Where<Notificacoes>,
  ): Promise<Count> {
    return this.notificacoesRepository.count(where);
  }

  @get('/notificacoes')
  @response(200, {
    description: 'Array of Notificacoes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notificacoes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Notificacoes) filter?: Filter<Notificacoes>,
  ): Promise<Notificacoes[]> {
    return this.notificacoesRepository.find(filter);
  }

  @patch('/notificacoes')
  @response(200, {
    description: 'Notificacoes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacoes, {partial: true}),
        },
      },
    })
    notificacoes: Notificacoes,
    @param.where(Notificacoes) where?: Where<Notificacoes>,
  ): Promise<Count> {
    return this.notificacoesRepository.updateAll(notificacoes, where);
  }

  @get('/notificacoes/{id}')
  @response(200, {
    description: 'Notificacoes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Notificacoes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Notificacoes, {exclude: 'where'}) filter?: FilterExcludingWhere<Notificacoes>
  ): Promise<Notificacoes> {
    return this.notificacoesRepository.findById(id, filter);
  }

  @patch('/notificacoes/{id}')
  @response(204, {
    description: 'Notificacoes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacoes, {partial: true}),
        },
      },
    })
    notificacoes: Notificacoes,
  ): Promise<void> {
    await this.notificacoesRepository.updateById(id, notificacoes);
  }

  @put('/notificacoes/{id}')
  @response(204, {
    description: 'Notificacoes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() notificacoes: Notificacoes,
  ): Promise<void> {
    await this.notificacoesRepository.replaceById(id, notificacoes);
  }

  @del('/notificacoes/{id}')
  @response(204, {
    description: 'Notificacoes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notificacoesRepository.deleteById(id);
  }
}
