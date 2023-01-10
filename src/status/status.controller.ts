import { Controller, Get, Body, Patch } from '@nestjs/common'
import { PResData } from '../common/ResponseData'
import { StatusDto } from './dto/status.dto'
import { StatusService } from './status.service'

@Controller('status')
export class StatusController {
  constructor (private readonly statusService: StatusService) {}

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
    await this.statusService.updateStatus(newStatusDto)

    return {
      success: true
    }
  }
}
