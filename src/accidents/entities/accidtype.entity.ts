import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'accidtypes'
})
export class AccidentType {
  @PrimaryGeneratedColumn('increment', {
    name: 'accidtypes_id',
    type: 'int',
    unsigned: true
  })
  public readonly id: number

  @Column({
    name: 'accidtypes_label',
    type: 'varchar',
    length: 10,
    nullable: false,
    charset: 'utf8mb4'
  })
  public readonly label: string
}
