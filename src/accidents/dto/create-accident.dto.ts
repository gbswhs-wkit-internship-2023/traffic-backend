import { IsInt, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator'

export class CreateAccidentDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  public readonly vehicleId: number

  @IsString()
  @MaxLength(10)
  public readonly accidentTypeLabel: string
}
