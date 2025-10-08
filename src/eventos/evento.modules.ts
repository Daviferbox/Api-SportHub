import { Module } from "@nestjs/common";
import { EventosController } from "./evento.controller";
import { EventosArmazenados } from "./evento.dm";
import { DiaValidator } from "src/validator/dia.validator";

@Module({
  controllers: [EventosController],
  providers: [EventosArmazenados,DiaValidator],
})
export class EventoModule {}