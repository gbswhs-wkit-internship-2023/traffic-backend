import { Controller, Get, Body, Patch, Sse } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PResData } from '../common/ResponseData'
import { StatusDto } from './dto/status.dto'
import { StatusService } from './status.service'
import { StatusEventData, StatusEventService } from './statusEvent.service'

@Controller('status')
export class StatusController {
  constructor (
    private readonly statusService: StatusService,
    private readonly statusEventService: StatusEventService
  ) {}

  @Get()
  public async getStatus (): PResData<{ status: StatusDto }> {
    const status = await this.statusService.getStatus()

    return {
      success: true,
      data: {
        status
      }
    }
  }

  @Patch()
  public async update (@Body() newStatusDto: StatusDto): PResData {
    const isChanged = await this.statusService.updateStatus(newStatusDto)
    if (isChanged) {
      this.statusEventService.emitEvent({ data: { requireRefresh: true } })
    }

    return {
      success: true
    }
  }

  @Sse('@event')
  public attachAccidentEvent (): Observable<StatusEventData> {
    return this.statusEventService.createObserver()
  }
}
