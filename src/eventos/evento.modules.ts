import { Module } from '@nestjs/common';
import { EventosController } from './evento.controller';
import { EventoService } from './evento.service';
import { eventoProviders } from './evento.provider';
import { DatabaseModule }  from 'src/database/dataBase.module';


@Module({
  imports: [DatabaseModule],
  controllers: [EventosController],
  providers: [...eventoProviders, EventoService],
})
export class EventoModule {}
