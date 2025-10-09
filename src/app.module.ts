import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.modulles';
import { EventoModule } from './eventos/evento.modules';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [UsuarioModule,EventoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
