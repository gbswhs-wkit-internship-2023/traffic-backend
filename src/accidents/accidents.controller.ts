import { Controller, Get, Post, Body, Sse } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PResData } from '../common/ResponseData'
import { AccidentsService } from './accidents.service'
import { AccidentsEventData, AccidentsEventService } from './accidentsEvent.service'
import { CreateAccidentDto } from './dto/create-accident.dto'
import { Accident } from './entities/accident.entity'
import { Statistic } from './entities/statistic.entity'

@Controller('accidents')
export class AccidentsController {
  constructor (
    private readonly accidentsService: AccidentsService,
    private readonly accidentsEventService: AccidentsEventService
  ) {}

  @Post()
  public async create (@Body() createAccidentDto: CreateAccidentDto): PResData {
    await this.accidentsService.create(createAccidentDto)

    this.accidentsEventService.emitEvent({
      data: { requireRefresh: true }
    })

    return {
      success: true
    }
  }

  @Get()
  public async findAll (): PResData<{ accidents: Accident[], statics: Record<string, number>, history: Statistic[] }> {
    const accidents = await this.accidentsService.findAll()
    const statics = await this.accidentsService.getStatics()
    const history = await this.accidentsService.getStaticsHistory()

    return {
      data: {
        accidents,
        statics,
        history
      },
      success: true
    }
  }

  @Sse('@event')
  public attachAccidentEvent (): Observable<AccidentsEventData> {
    return this.accidentsEventService.createObserver()
  }
}
