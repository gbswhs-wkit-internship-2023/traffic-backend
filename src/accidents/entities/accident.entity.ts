import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AccidentType } from './accidtype.entity'
import { Statistic } from './statistic.entity'

@Entity({
  name: 'accidents'
})
export class Accident {
  @PrimaryGeneratedColumn('increment', {
    name: 'accidents_id',
    unsigned: true,
    type: 'int'
  })
  public readonly id: number

  @Column({
    name: 'vehicles_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  public readonly vehicleId: number

  @Column({
    name: 'accidtypes_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  public readonly typeId: number

  @ManyToOne(() => AccidentType, { eager: true })
  @JoinColumn({
    name: 'accidtypes_id',
    referencedColumnName: 'id'
  })
  public readonly type: AccidentType

  @Column({
    name: 'statics_createdat',
    type: 'char',
    length: 10
  })
  public readonly staticsAt: Date

  @ManyToOne(() => Statistic, { eager: true })
  @JoinColumn({
    name: 'statics_createdat',
    referencedColumnName: 'createdAt'
  })
  public readonly statics: Statistic

  @Column({
    name: 'accidents_createdat',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public readonly createdAt: Date
}
