import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  tokenUrl = 'https://zubarevapolinav.amocrm.ru/oauth2/access_token';

  constructor(
    private jwtService: JwtService,
    private http: HttpService
  ) {}

  async decodeToken(token: string) {
    return this.jwtService.decode(token, { json: true });
  }

  async refreshToken(resfreshToken: string) {
    const refreshData = await firstValueFrom(
      this.http.post(this.tokenUrl, {
        client_id: process.env.AMO_ID,
        client_secret: process.env.AMO_SECRET_KEY,
        grant_type: 'refresh_token',
        refresh_token: resfreshToken,
        redirect_uri: process.env.AMO_REDIRECT_URI,
      })
    );

    return refreshData?.data;
  }
}
