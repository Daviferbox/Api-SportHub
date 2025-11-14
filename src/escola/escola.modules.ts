import { Module } from '@nestjs/common';
import { DatabaseModule }  from 'src/database/dataBase.module';
import { escolaProviders } from './escola.provider';
import { escolaService } from './escola.service';
import { EscolaController } from './escola.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EscolaController],
  providers: [...escolaProviders, escolaService],
  exports: [...escolaProviders],
})
export class escolaModule {}
