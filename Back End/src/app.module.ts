import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [ClientsModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
