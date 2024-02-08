import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Chats, ChatsRelations} from '../models';

export class ChatsRepository extends DefaultCrudRepository<
  Chats,
  typeof Chats.prototype.id,
  ChatsRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Chats, dataSource);
  }
}
