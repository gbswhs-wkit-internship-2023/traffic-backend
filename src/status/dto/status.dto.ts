import { IsIn, IsInt, IsNumber, IsString, Min } from 'class-validator'

export class StatusDto {
  @IsNumber()
  @IsInt()
  @Min(0)
  public readonly vehicleCount: number

  @IsString()
  @IsIn(['RED', 'GREEN'])
  public readonly trafficLight: 'RED' | 'GREEN'
}
