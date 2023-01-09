import { Controller, Get, Body, Patch } from '@nestjs/common'
import { PResData } from '../common/ResponseData'
import { SettingDto } from './dto/setting.dto'
import { SettingsService } from './settings.service'

@Controller('settings')
export class SettingsController {
  constructor (
    private readonly settingsService: SettingsService
  ) {}

  @Get()
  public async get (): PResData<SettingDto> {
    const settings = await this.settingsService.getSetting()

    return {
      data: settings,
      success: true
    }
  }

  @Patch()
  public async update (@Body() updateSettingDto: SettingDto): PResData {
    await this.settingsService.updateSetting(updateSettingDto)

    return {
      success: true
    }
  }
}
