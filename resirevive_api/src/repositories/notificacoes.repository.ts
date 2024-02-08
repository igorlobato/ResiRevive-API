import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Notificacoes, NotificacoesRelations} from '../models';

export class NotificacoesRepository extends DefaultCrudRepository<
  Notificacoes,
  typeof Notificacoes.prototype.id,
  NotificacoesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Notificacoes, dataSource);
  }
}
