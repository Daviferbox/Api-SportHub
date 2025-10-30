import { Module } from "@nestjs/common";
import { EscolaController } from "./escola.controller";
import { EscolaArmazenados } from "./escola.dm";
import { DiaValidator } from "src/validator/dia.validator";

@Module({
  controllers: [EscolaController],
  providers: [EscolaArmazenados,DiaValidator],
})
export class EscolaModule {}