import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Produtos, ProdutosRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class ProdutosRepository extends DefaultCrudRepository<
  Produtos,
  typeof Produtos.prototype.id,
  ProdutosRelations
> {

  public readonly pedidos: HasOneRepositoryFactory<Pedidos, typeof Produtos.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Produtos, dataSource);
    this.pedidos = this.createHasOneRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
