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

  @Column({
    name: 'vehicles_picture',
    type: 'longtext',
    nullable: false
  })
  public readonly picture: string

  @Column({
    name: 'vehicles_fullpicture',
    type: 'longtext',
    nullable: false
  })
  public readonly fullPicture: string
}
