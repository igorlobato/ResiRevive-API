import {Entity, model, property} from '@loopback/repository';

@model()
export class Notificacoes extends Entity {
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
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'string',
    default: 'n',
  })
  naolido?: string;


  constructor(data?: Partial<Notificacoes>) {
    super(data);
  }
}

export interface NotificacoesRelations {
  // describe navigational properties here
}

export type NotificacoesWithRelations = Notificacoes & NotificacoesRelations;
