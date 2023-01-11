import { IsBase64, IsInt, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator'

export class CreateAccidentDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  public readonly vehicleId: number

  @IsString()
  @MaxLength(10)
  public readonly accidentTypeLabel: string

  @IsString()
  @IsBase64()
  public readonly vehiclePicture: string

  @IsString()
  @IsBase64()
  public readonly vehicleFullPicture: string
}
