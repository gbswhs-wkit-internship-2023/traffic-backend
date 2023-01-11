import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Repository } from 'typeorm'
import { CreateAccidentDto } from './dto/create-accident.dto'
import { Accident } from './entities/accident.entity'
import { AccidentType } from './entities/accidtype.entity'
import { Statistic } from './entities/statistic.entity'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class AccidentsService {
  constructor (
    @InjectRepository(Accident)
    private readonly accidents: Repository<Accident>,
    @InjectRepository(AccidentType)
    private readonly accidentTypes: Repository<AccidentType>,
    @InjectRepository(Vehicle)
    private readonly vehicles: Repository<Vehicle>,
    @InjectRepository(Statistic)
    private readonly statics: Repository<Statistic>
  ) {}

  public async create (createAccidentDto: CreateAccidentDto): Promise<void> {
    // 1. 차량 테이블 추가
    const isVehicleRegisted =
      await this.vehicles.countBy({
        id: createAccidentDto.vehicleId
      }) > 0

    if (!isVehicleRegisted) {
      await this.vehicles.insert({
        id: createAccidentDto.vehicleId,
        picture: 'data:image/jpeg;base64,' + createAccidentDto.vehiclePicture
      })
    }

    // 2. 위반 분류 추가
    const isTypeExists =
      await this.accidentTypes.countBy({
        label: createAccidentDto.accidentTypeLabel
      }) > 0

    if (!isTypeExists) {
      await this.accidentTypes.insert({
        label: createAccidentDto.accidentTypeLabel
      })
    }

    const type =
      await this.accidentTypes.findOneBy({
        label: createAccidentDto.accidentTypeLabel
      })

    if (type === null) {
      return
    }

    // 3. 시간당 통계 추가
    const isStaticExists = await this.statics.countBy({
      createdAt: moment().format('YYYYMMDDHH'),
      typeId: type.id
    }) > 0

    if (!isStaticExists) {
      await this.statics.insert({
        createdAt: moment().format('YYYYMMDDHH'),
        typeId: type.id
      })
    }

    const statistic = await this.statics.findOneBy({
      createdAt: moment().format('YYYYMMDDHH'),
      typeId: type.id
    })

    await this.statics.increment({
      createdAt: moment().format('YYYYMMDDHH'),
      typeId: type.id
    }, 'count', 1)

    if (statistic === null) {
      return
    }

    // 4. 위반 사항 추가
    await this.accidents.insert({
      vehicleId: createAccidentDto.vehicleId,
      typeId: type.id,
      staticsAt: statistic.createdAt
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

  public async getStatics (): Promise<Record<string, number>> {
    const statics = await this.statics.find({
      where: { createdAt: moment().format('YYYYMMDDHH') }
    })

    const resultObj: Record<string, number> = {}

    for (const statistic of statics) {
      resultObj[statistic.type.label] =
        statistic.count
    }

    resultObj['합'] =
      Object
        .values(resultObj)
        .reduce((a, b) => a + b, 0)

    return resultObj
  }
}
