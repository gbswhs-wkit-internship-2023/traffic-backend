import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccidentsModule } from './accidents/accidents.module'

@Module({
  imports: [
    AccidentsModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      port: 3306,
      host: 'localhost',
      username: 'traffic',
      database: 'traffic',
      synchronize: true,
      autoLoadEntities: true,
      logging: true
    })
  ]
})
export class AppModule {}
