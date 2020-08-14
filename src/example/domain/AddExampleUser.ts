import { BaseUseCase } from 'lyxe/lib/core/context/BaseUseCase'
import { UseCase } from 'lyxe/lib/core/context/annotations/UseCase'
import { DomainInvalidArgumentError } from 'lyxe/lib/core/domain-errors/DomainInvalidArgumentError'
import { InjectRepository } from 'lyxe/lib/persistence/annotations/InjectRepository'
import { ExampleUserRepoTkn } from './example-tokens'
import { ExampleUser } from './model/ExampleUser'
import { TAddExampleUserDto } from './example-dtos'
import { IExampleUserRepo } from './IExampleUserRepo'

@UseCase()
export class AddExampleUser extends BaseUseCase {
  @InjectRepository(ExampleUserRepoTkn)
  private userRepo: IExampleUserRepo

  public async run(name: string) {
    if (!name) {
      throw new DomainInvalidArgumentError('Name should be non-empty string')
    }

    const user = new ExampleUser(name)
    return this.userRepo.save(user)
  }

  public runFromDto(dto: TAddExampleUserDto) {
    return this.run(dto.name)
  }
}
