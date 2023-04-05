import {
    BadRequestException,
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
    ) {
      const agentPort = process.env.AGENT_PORT
        ? parseInt(process.env.AGENT_PORT)
        : 4444;
      const newSession = new BaseAgent({
        port: agentPort,
        label: 'agent1111111',
        walletConfig: {
          id: walletId,
          key: walletKey,
        },
        ledgerConfig,
      });
  
      if (this.session) {
        await this.session.exit();
      }
      this.session = newSession;
      await this.session.initAgent();
      const handleWebSocket = new HandeWebSocket();
      handleWebSocket.listenEvents(this.session);
      console.log("sessionLogin",this.session);
      
      return {
        status: HttpStatus.OK,
        role: 'Holder',
      };
    }
  
    public async createConnection() {
      if (!this.session) throw new BadRequestException('Please login first');
      const outOfBandRecord = await this.session.agent.oob.createInvitation();
      const domain = `http://localhost:${this.session.port}`;
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
  