import { Module } from '@nestjs/common'
import { AccidentsService } from './accidents.service'
import { AccidentsController } from './accidents.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Accident } from './entities/accident.entity'
import { AccidentsEventService } from './accidentsEvent.service'
import { AccidentType } from './entities/accidtype.entity'
import { Vehicle } from './entities/vehicle.entity'
import { Statistic } from './entities/statistic.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accident,
      AccidentType,
      Vehicle,
      Statistic
    ])
  ],
  controllers: [AccidentsController],
  providers: [
    AccidentsEventService,
    AccidentsService
  ],
  exports: [AccidentsService]
})
export class AccidentsModule {}
