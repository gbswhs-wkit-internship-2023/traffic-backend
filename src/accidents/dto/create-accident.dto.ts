import { IsIn, IsString } from 'class-validator'
import { AccidentType } from '../entities/accident.entity'

export class CreateAccidentDto {
  @IsString()
  @IsIn(['TRAFFIC_VIOLATION', 'TAIL_TRACKING'])
  public readonly type: keyof typeof AccidentType
}
