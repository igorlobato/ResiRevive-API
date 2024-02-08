import {Entity, model, property, hasOne} from '@loopback/repository';
import {Pedidos} from './pedidos.model';

@model()
export class Produtos extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    default: 'Sem descrição',
  })
  descricao?: string;

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
  condicao: string;

  @property({
    type: 'string',
    default: 'Não foi especificado a cor',
  })
  cor?: string;

  @property({
    type: 'number',
    required: true,
  })
  preco: number;

  @property({
    type: 'string',
    required: true,
  })
  local: string;

  @property({
    type: 'number',
  })
  id_dono?: number;

  @hasOne(() => Pedidos)
  pedidos: Pedidos;

  constructor(data?: Partial<Produtos>) {
    super(data);
  }
}

export interface ProdutosRelations {
  // describe navigational properties here
}

export type ProdutosWithRelations = Produtos & ProdutosRelations;
