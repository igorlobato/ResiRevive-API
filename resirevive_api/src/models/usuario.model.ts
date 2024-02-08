import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Produtos} from './produtos.model';
import {Pedidos} from './pedidos.model';

@model()
export class Usuario extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  telefone: string;

  @property({
    type: 'string',
    required: true,
  })
  senha: string;

  @property({
    type: 'boolean',
    default: false,
  })
  adm?: boolean;

  @property({
    type: 'number',
    default: 0,
  })
  nota?: number;

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'date',
  })
  online?: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'date',
  })
  creation?: string;

  @property({
    type: 'string',
    required: true,
  })
  endereco: string;

  @hasMany(() => Produtos, {keyTo: 'id_dono'})
  produtos: Produtos[];

  @hasOne(() => Pedidos)
  pedidos: Pedidos;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
