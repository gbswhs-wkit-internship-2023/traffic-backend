import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { StatusDto } from './dto/status.dto'

@Injectable()
export class StatusService {
  constructor (
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  public async getStatus (): Promise<StatusDto> {
    const vehicleCount = await this.cacheManager.get<number>('vehicleCount') ?? 0
    const trafficLight = await this.cacheManager.get<'GREEN' | 'RED'>('trafficLight') ?? 'GREEN'

    return {
      vehicleCount,
      trafficLight
    }
  }

  public async updateStatus (newStatus: StatusDto): Promise<boolean> {
    const oldStatus = await this.getStatus()
    const isChanged =
      oldStatus.trafficLight !== newStatus.trafficLight ||
      oldStatus.vehicleCount !== newStatus.vehicleCount

    if (!isChanged) {
      return false
    }

    await this.cacheManager.set('vehicleCount', newStatus.vehicleCount)
    await this.cacheManager.set('trafficLight', newStatus.trafficLight)

    return true
  }
}
