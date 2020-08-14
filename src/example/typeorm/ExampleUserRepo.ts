import { ConfigurableRepository } from 'lyxe/lib/persistence-typeorm/ConfigurableRepository'
import { SearchConfig } from 'lyxe/lib/persistence/SearchConfig'
import { Repository } from 'lyxe/lib/persistence/annotations/Repository'
import { ExampleUser } from '../domain/model/ExampleUser'
import { IExampleUserRepo } from '../domain/IExampleUserRepo'
import { ExampleUserRepoTkn } from '../domain/example-tokens'

@Repository(ExampleUserRepoTkn)
export class ExampleUserRepo extends ConfigurableRepository<ExampleUser, number> implements IExampleUserRepo {
  protected get entityClass() {
    return ExampleUser
  }

  public findByNameQuery(query: string, conf?: SearchConfig): Promise<ExampleUser[]> {
    const q = this.queryBuilder().where('name LIKE :pattern', { pattern: query + '%' })
    return this.queryEntities(q, conf)
  }
}
