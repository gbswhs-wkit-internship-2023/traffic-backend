import { CacheModule, Module } from '@nestjs/common'
import { SettingsService } from './settings.service'
import { SettingsController } from './settings.controller'

@Module({
  imports: [CacheModule.register()],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
