import {Entity, model, property} from '@loopback/repository';

@model()
export class Chats extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'date',
    required: true,
  })
  creation: string;


  constructor(data?: Partial<Chats>) {
    super(data);
  }
}

export interface ChatsRelations {
  // describe navigational properties here
}

export type ChatsWithRelations = Chats & ChatsRelations;
