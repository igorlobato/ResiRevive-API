import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Produtos, Pedidos} from '../models';
import {ProdutosRepository} from './produtos.repository';
import {PedidosRepository} from './pedidos.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly produtos: HasManyRepositoryFactory<Produtos, typeof Usuario.prototype.id>;

  public readonly pedidos: HasOneRepositoryFactory<Pedidos, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ProdutosRepository') protected produtosRepositoryGetter: Getter<ProdutosRepository>, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Usuario, dataSource);
    this.pedidos = this.createHasOneRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.produtos = this.createHasManyRepositoryFactoryFor('produtos', produtosRepositoryGetter,);
    this.registerInclusionResolver('produtos', this.produtos.inclusionResolver);
  }
}
