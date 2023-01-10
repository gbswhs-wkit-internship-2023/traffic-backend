import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AccidentType } from './accidtype.entity'

@Entity()
export class Statistic {
  @PrimaryColumn({
    name: 'statics_createdat',
    type: 'char',
    length: 10
  })
  public readonly createdAt: string

  @PrimaryColumn({
    name: 'accidtypes_id',
    type: 'int',
    unsigned: true
  })
  public readonly typeId: number

  @ManyToOne(() => AccidentType, { eager: true })
  @JoinColumn({
    name: 'accidtypes_id',
    referencedColumnName: 'id'
  })
  public readonly type: AccidentType

  @Column({
    name: 'statics_count',
    type: 'int',
    unsigned: true,
    default: 0
  })
  public readonly count: number
}
