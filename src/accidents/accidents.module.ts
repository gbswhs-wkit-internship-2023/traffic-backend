import { Module } from '@nestjs/common'
import { AccidentsService } from './accidents.service'
import { AccidentsController } from './accidents.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Accident } from './entities/accident.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Accident])],
  controllers: [AccidentsController],
  providers: [AccidentsService]
})
export class AccidentsModule {}
