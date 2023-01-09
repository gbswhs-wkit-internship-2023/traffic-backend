import { Controller, Get, Post, Body } from '@nestjs/common'
import { PResData } from '../common/ResponseData'
import { AccidentsService } from './accidents.service'
import { CreateAccidentDto } from './dto/create-accident.dto'
import { Accident } from './entities/accident.entity'

@Controller('accidents')
export class AccidentsController {
  constructor (
    private readonly accidentsService: AccidentsService
  ) {}

  @Post()
  public async create (@Body() createAccidentDto: CreateAccidentDto): PResData {
    await this.accidentsService.create(createAccidentDto)

    return {
      success: true
    }
  }

  @Get()
  public async findAll (): PResData<{ accidents: Accident[] }> {
    const accidents = await this.accidentsService.findAll()

    return {
      data: {
        accidents
      },
      success: true
    }
  }
}
