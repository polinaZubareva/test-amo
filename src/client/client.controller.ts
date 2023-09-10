import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from 'src/dto/clientDto';
import { FormDataRequest } from 'nestjs-form-data';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getOne')
  @FormDataRequest()
  getClient(@Body() clientDto: ClientDto) {
    return this.clientService.getOne(clientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  @FormDataRequest()
  getAll() {
    return this.clientService.getAll();
  }
}
