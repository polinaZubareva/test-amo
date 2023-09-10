import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [NestjsFormDataModule, HttpModule.register({})],
  controllers: [ClientController],
  providers: [ClientService, JwtService, AuthService],
})
export class ClientModule {}
