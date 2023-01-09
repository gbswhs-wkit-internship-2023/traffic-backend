import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, Repository } from 'typeorm'
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
      take: 10
    })
  }

  public async getStatics (): Promise<{ traffic: number, tail: number, total: number }> {
    const oneHourAgo = new Date()
    oneHourAgo.setHours(oneHourAgo.getHours() - 1)

    const traffic = await this.accidents.count({
      where: {
        type: AccidentType.TRAFFIC_VIOLATION,
        createdAt: MoreThan(oneHourAgo)
      }
    })

    const tail = await this.accidents.count({
      where: {
        type: AccidentType.TAIL_TRACKING,
        createdAt: MoreThan(oneHourAgo)
      }
    })

    return {
      traffic,
      tail,
      total: traffic + tail
    }
  }
}
