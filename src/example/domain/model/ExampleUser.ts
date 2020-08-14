import { NumberIdEntity } from 'lyxe/lib/persistence-typeorm/NumberIdEntity'
import { Entity, Column } from 'typeorm'
import { argumentsIsEmpty } from 'lyxe/lib/core/lang/arguments-is-empty'

@Entity()
export class ExampleUser extends NumberIdEntity  {
  @Column()
  private readonly name: string

  constructor(name: string) {
    super()
    if (argumentsIsEmpty(arguments)) return

    this.name = name
  }

  public getName() {
    return this.name
  }
}