import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAccidentDto } from './dto/create-accident.dto'
import { Accident, AccidentType } from './entities/accident.entity'

@Injectable()
export class AccidentsService {
  constructor (
    @InjectRepository(Accident)
    private readonly accidents: Repository<Accident>
  ) {}

  public async create (createAccidentDto: CreateAccidentDto): Promise<void> {
    let type = AccidentType.TRAFFIC_VIOLATION

    if (createAccidentDto.type === 'TAIL_TRACKING') {
      type = AccidentType.TAIL_TRACKING
    }

    await this.accidents.insert({
      carNumber: createAccidentDto.carnum,
      type
    })
  }

  public async findAll (): Promise<Accident[]> {
    return await this.accidents.find({
      order: {
        createdAt: 'DESC'
      },
      take: 30
    })
  }
}
