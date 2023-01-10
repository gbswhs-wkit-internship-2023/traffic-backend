import { Controller, Get, Render } from '@nestjs/common'
import * as moment from 'moment'
import { AccidentsService } from './accidents/accidents.service'
import { StatusService } from './status/status.service'

@Controller()
export class ViewController {
  constructor (
    private readonly accidentsService: AccidentsService,
    private readonly statusService: StatusService
  ) {}

  @Get()
  @Render('index')
  public async renderRootView (): Promise<object> {
    const accidents = await this.accidentsService.findAll()
    const statics = await this.accidentsService.getStatics()
    const status = await this.statusService.getStatus()

    return {
      accidents: accidents.map((v) => ({
        ...v,
        createdAt: moment(v.createdAt).format('YYYY-MM-DD HH:mm')
      })),
      statics,
      status
    }
  }
}
