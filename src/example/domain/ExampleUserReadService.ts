import { DomainInvalidArgumentError } from 'lyxe/lib/core/domain-errors/DomainInvalidArgumentError'
import { InjectRepository } from 'lyxe/lib/persistence/annotations/InjectRepository'
import { ExampleUserRepoTkn } from './example-tokens'
import { IExampleUserRepo } from './IExampleUserRepo'
import { BaseReadService } from 'lyxe/lib/core/context/BaseReadService'
import { TransientService } from 'lyxe/lib/core/di/annotations/TransientService'
import { SearchConfig } from 'lyxe/lib/persistence/SearchConfig'
import { PageConfig } from 'lyxe/lib/persistence/PageConfig'

@TransientService()
export class ExampleUserReadService extends BaseReadService {
  @InjectRepository(ExampleUserRepoTkn)
  private userRepo: IExampleUserRepo

  public async listByNameQuery(nameQuery: string) {
    if (!nameQuery) {
      throw new DomainInvalidArgumentError('Name query should be non-empty string')
    }

    const conf = new SearchConfig(PageConfig.ofDefaultSize())
    return this.userRepo.findByNameQuery(nameQuery, conf)
  }
}
