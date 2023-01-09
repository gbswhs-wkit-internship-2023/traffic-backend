import { SettingDto } from './dto/setting.dto'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class SettingsService {
  constructor (
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  public async getSetting (): Promise<SettingDto> {
    const maxSpeed = await this.cacheManager.get<number>('maxSpeed') ?? 130
    const minSpeed = await this.cacheManager.get<number>('minSpeed') ?? 40
    const saveTTL = await this.cacheManager.get<number>('saveTTL') ?? 10

    return {
      maxSpeed,
      minSpeed,
      saveTTL
    }
  }

  public async updateSetting ({ maxSpeed, minSpeed, saveTTL }: SettingDto): Promise<void> {
    await this.cacheManager.set('maxSpeed', maxSpeed)
    await this.cacheManager.set('minSpeed', minSpeed)
    await this.cacheManager.set('saveTTL', saveTTL)
  }
}
