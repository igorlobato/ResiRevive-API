import {Entity, model, property} from '@loopback/repository';

@model()
export class Conversas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default: 'n',
  })
  naolido?: string;

  @property({
    type: 'date',
    required: true,
  })
  modification: string;

  @property({
    type: 'date',
    required: true,
  })
  creation: string;


  constructor(data?: Partial<Conversas>) {
    super(data);
  }
}

export interface ConversasRelations {
  // describe navigational properties here
}

export type ConversasWithRelations = Conversas & ConversasRelations;
