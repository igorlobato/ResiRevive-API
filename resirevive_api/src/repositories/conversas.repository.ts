import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Conversas, ConversasRelations} from '../models';

export class ConversasRepository extends DefaultCrudRepository<
  Conversas,
  typeof Conversas.prototype.id,
  ConversasRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Conversas, dataSource);
  }
}
