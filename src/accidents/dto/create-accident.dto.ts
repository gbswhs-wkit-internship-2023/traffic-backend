import { IsIn, IsString } from 'class-validator'
import { AccidentType } from '../entities/accident.entity'

export class CreateAccidentDto {
  @IsString()
  public readonly carnum: string

  @IsString()
  @IsIn(['TRAFFIC_VIOLATION', 'TAIL_TRAKING'])
  public readonly type: keyof typeof AccidentType
}
