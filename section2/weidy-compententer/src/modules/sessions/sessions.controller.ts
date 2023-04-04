import { Body, Controller, Post, Query } from '@nestjs/common';
import { LoginDto } from 'src/common/dtos/login.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.sessionsService.createSession(
      loginDto.walletId,
      loginDto.walletKey,
      loginDto.seed,
    );
  }

  @Post('/logout')
  public async exit() {
    return await this.sessionsService.exit()
  }

  @Post('/create-connections')
  public async createConnection() {
    return await this.sessionsService.createConnection();
  }

  @Post('/connections/accept')
  public async accepInvitation(@Query('invitation-url') invitationUrl: string) {
    return await this.sessionsService.acceptConnection(invitationUrl);
  }
}
