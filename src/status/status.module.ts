import { CacheModule, Module } from '@nestjs/common'
import { StatusService } from './status.service'
import { StatusController } from './status.controller'
import { StatusEventService } from './statusEvent.service'

@Module({
  imports: [CacheModule.register()],
  controllers: [StatusController],
  providers: [
    StatusService,
    StatusEventService
  ],
  exports: [StatusService]
})
export class StatusModule {}
