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
import {Chats} from '../models';
import {ChatsRepository} from '../repositories';

export class ChatController {
  constructor(
    @repository(ChatsRepository)
    public chatsRepository : ChatsRepository,
  ) {}

  @post('/chats')
  @response(200, {
    description: 'Chats model instance',
    content: {'application/json': {schema: getModelSchemaRef(Chats)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {
            title: 'NewChats',
            exclude: ['id'],
          }),
        },
      },
    })
    chats: Omit<Chats, 'id'>,
  ): Promise<Chats> {
    return this.chatsRepository.create(chats);
  }

  @get('/chats/count')
  @response(200, {
    description: 'Chats model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Chats) where?: Where<Chats>,
  ): Promise<Count> {
    return this.chatsRepository.count(where);
  }

  @get('/chats')
  @response(200, {
    description: 'Array of Chats model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Chats, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Chats) filter?: Filter<Chats>,
  ): Promise<Chats[]> {
    return this.chatsRepository.find(filter);
  }

  @patch('/chats')
  @response(200, {
    description: 'Chats PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {partial: true}),
        },
      },
    })
    chats: Chats,
    @param.where(Chats) where?: Where<Chats>,
  ): Promise<Count> {
    return this.chatsRepository.updateAll(chats, where);
  }

  @get('/chats/{id}')
  @response(200, {
    description: 'Chats model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Chats, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Chats, {exclude: 'where'}) filter?: FilterExcludingWhere<Chats>
  ): Promise<Chats> {
    return this.chatsRepository.findById(id, filter);
  }

  @patch('/chats/{id}')
  @response(204, {
    description: 'Chats PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {partial: true}),
        },
      },
    })
    chats: Chats,
  ): Promise<void> {
    await this.chatsRepository.updateById(id, chats);
  }

  @put('/chats/{id}')
  @response(204, {
    description: 'Chats PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() chats: Chats,
  ): Promise<void> {
    await this.chatsRepository.replaceById(id, chats);
  }

  @del('/chats/{id}')
  @response(204, {
    description: 'Chats DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.chatsRepository.deleteById(id);
  }
}
