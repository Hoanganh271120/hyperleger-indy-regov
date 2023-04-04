import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';
import { CompententersService } from './compententers.service';
import { CredentialInput } from './dtos/credential.dto';

@Controller('compententers')
export class CompententersController {
  constructor(
    private readonly compententersService: CompententersService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Post('/credentials/schemas')
  public async createSchemaAndDef() {
    return await this.compententersService.createCredentialSchema(
      this.sessionsService.session,
    );
  }

  @Post('/credentials/accept')
  public async acceptCredential(
    @Query('credential-id') credentialId: string,
  ) {
    return await this.compententersService.acceptOffer(this.sessionsService.session, credentialId);
  }

  @Post('/credentials/offer')
  public async offerCredential(
    @Body() input: CredentialInput,
    @Query('cred-def-id') credDefId?: string,
  ) {
    return await this.compententersService.compententCredential(
      this.sessionsService.session,
      input,
      credDefId,
    );
  }

  @Get('/proofs/request')
  public async requestProof(@Query('cred-def-id') credDefId: string) {
    return await this.compententersService.createProofRequest(this.sessionsService.session, credDefId);
  }

  @Get('/proofs/check')
  public async verifyProof(@Query('proof-id') proofId?: string) {
    return await this.compententersService.verifyProof(
      this.sessionsService.session,
      proofId,
    );
  }
}
