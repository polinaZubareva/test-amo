import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from 'src/client/client.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ClientModule, HttpModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
