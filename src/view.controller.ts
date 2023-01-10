import { Controller, Get, Render } from '@nestjs/common'
import * as moment from 'moment'
import { AccidentsService } from './accidents/accidents.service'

@Controller()
export class ViewController {
  constructor (
    private readonly accidentsService: AccidentsService
  ) {}

  @Get()
  @Render('index')
  public async renderRootView (): Promise<object> {
    const accidents = await this.accidentsService.findAll()
    const statics = await this.accidentsService.getStatics()

    return {
      accidents: accidents.map((v) => ({
        type: ['신호위반', '꼬리물기'][v.type],
        createdAt: moment(v.createdAt).format('YYYY-MM-DD HH:mm')
      })),
      statics
    }
  }
}
