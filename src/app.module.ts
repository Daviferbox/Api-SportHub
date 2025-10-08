import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.modulles';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
