import { Module } from '@nestjs/common';
import { DatabaseModule }  from 'src/database/dataBase.module';
import { filesProviders } from './files.provider';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [...filesProviders,
    FilesService,
  ],
  
})
export class FilesModule {}
