import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'vehicles'
})
export class Vehicle {
  @PrimaryColumn({
    name: 'vehicles_id',
    type: 'int',
    unsigned: true
  })
  public readonly id: number

  @Column({
    name: 'vehicles_createdat',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public readonly createdAt: Date
}
