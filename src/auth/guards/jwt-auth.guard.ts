import { TOKENS } from '../constants';
import { getTokens } from '../getTokens';
import { AuthService } from './../auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private tokens = getTokens();
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] ?? null;

    if (!token) throw new UnauthorizedException('Token is required');

    try {
      const decoded = (await this.authService.decodeToken(token)) ?? null;

      if (!decoded) throw new UnauthorizedException('Decode token error');

      if (typeof decoded === 'object' && 'exp' in decoded) {
        if (+decoded.exp * 1000 <= Date.now()) {
          console.log('Token is required to be updated');
          const refreshData = await this.authService.refreshToken(
            this.tokens.refreshToken
          );
          console.log(refreshData);
          console.log(refreshData!.access_token);

          request.headers.authorization = `Bearer ${refreshData?.access_token}`;
          TOKENS.accessToken = refreshData.access_token;
          TOKENS.refreshToken = refreshData.refresh_token;

          console.log('Tokens updated');
        }
      }
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException('Token is not valid');
    }

    return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
