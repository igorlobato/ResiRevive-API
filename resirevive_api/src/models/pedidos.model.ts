import {Entity, model, property} from '@loopback/repository';

@model()
export class Pedidos extends Entity {
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
  estado: string;

  @property({
    type: 'boolean',
    required: true,
  })
  pago: boolean;

  @property({
    type: 'string',
    required: true,
  })
  data: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  tipopagt: string;

  @property({
    type: 'number',
    required: true,
  })
  precofinal: number;

  @property({
    type: 'number',
  })
  produtosId?: number;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  constructor(data?: Partial<Pedidos>) {
    super(data);
  }
}

export interface PedidosRelations {
  // describe navigational properties here
}

export type PedidosWithRelations = Pedidos & PedidosRelations;
