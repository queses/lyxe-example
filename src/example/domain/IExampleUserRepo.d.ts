import { IConfigurableRepository } from 'lyxe/lib/persistence/IConfigurableRepository'
import { ExampleUser } from './model/ExampleUser'
import { SearchConfig } from 'lyxe/lib/persistence/SearchConfig'

export interface IExampleUserRepo extends IConfigurableRepository<ExampleUser, number> {
  findByNameQuery(query: string, conf?: SearchConfig): Promise<ExampleUser[]>
}
