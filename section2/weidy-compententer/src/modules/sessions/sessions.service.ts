import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BaseAgent } from 'src/common/base-agent';
import { HandeWebSocket } from 'src/common/web-socket';
import { ledgerConfig } from 'src/config/config';

@Injectable()
export class SessionsService {
  public session: BaseAgent;

  public async createSession(
    walletId: string,
    walletKey: string,
    seed: string,
  ) {
    const agentPort = process.env.AGENT_PORT
      ? parseInt(process.env.AGENT_PORT)
      : 2222;
    const newSession = new BaseAgent({
      port: agentPort,
      label: 'agent',
      walletConfig: {
        id: walletId,
        key: walletKey,
      },
      ledgerConfig,
      didSeed: seed,
    });

    if (this.session) {
      await this.session.exit();
    }
    this.session = newSession;
    await this.session.initAgent();
    const handleWebSocket = new HandeWebSocket();
    handleWebSocket.listenEvents(this.session);
    return {
      status: HttpStatus.OK,
      role: 'Compententer',
    };
  }

  public async createConnection() {
    if (!this.session) throw new BadRequestException('Please login first');
    const outOfBandRecord = await this.session.agent.oob.createInvitation();
    const domain = `https://localhost:${this.session.port}`;
    return {
      invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
        domain,
      }),
      outOfBandRecord,
    };
  }

  public async acceptConnection(invitationUrl: string) {
    if (!this.session) throw new BadRequestException('Please login first');
    const { outOfBandRecord } =
      await this.session.agent.oob.receiveInvitationFromUrl(invitationUrl);
    return outOfBandRecord;
  }

  public async exit() {
    this.session.exit();
  }
}
