import { } from '@nestjs/typeorm'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export const enum AccidentType {
  TRAFFIC_VIOLATION = 0,
  TAIL_TRACKING = 1
}

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
    name: 'accidents_type',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  public readonly type: AccidentType

  @Column({
    name: 'accidents_createdat',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  public readonly createdAt: Date
}
