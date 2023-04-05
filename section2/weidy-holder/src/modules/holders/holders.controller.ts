import { Controller, Post, Query } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';
import { HoldersService } from './holders.service';

@Controller('holders')
export class HoldersController {
  constructor(
    private readonly holdersService: HoldersService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Post('/credentials/accept')
  public async acceptCredential(@Query('credential-id') credentialId: string) {
    return await this.holdersService.acceptOffer(
      this.sessionsService.session,
      credentialId,
    );
  }

  @Post('/proofs/accept')
  public async accepProofRequest(@Query('proof-id') proofId: string) {
    console.log("sessionInController", this.sessionsService.session);
    
    return await this.holdersService.acceptProofRequest(
      this.sessionsService.session,
      proofId,
    );
  }
}
