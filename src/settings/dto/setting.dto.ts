import { IsNumber, IsPositive } from 'class-validator'

export class SettingDto {
  @IsNumber()
  @IsPositive()
  public readonly maxSpeed: number

  @IsNumber()
  @IsPositive()
  public readonly minSpeed: number

  @IsNumber()
  @IsPositive()
  public readonly saveTTL: number
}
