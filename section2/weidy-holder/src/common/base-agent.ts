import {
  Agent,
  HttpOutboundTransport,
  IndyPoolConfig,
  InitConfig,
  WsOutboundTransport,
  AutoAcceptCredential,
} from '@aries-framework/core';
import {
  agentDependencies,
  HttpInboundTransport,
  WsInboundTransport,
} from '@aries-framework/node';

export class BaseAgent {
  public config: InitConfig;
  public port: number;
  public label: string;
  public agent: Agent;
  public data: {
    credDefId?: string;
    connectionId?: string;
    credentialId?: string;
    proofId?: string;
  };

  public constructor({
    port,
    label,
    walletConfig,
    ledgerConfig,
  }: {
    port: number;
    label: string;
    walletConfig?: {
      id: string;
      key: string;
    };
    ledgerConfig: IndyPoolConfig;
  }) {
    this.port = port;
    this.label = label;

    const agentConfig = {
      label: label,
      walletConfig,
      indyLedgers: [ledgerConfig],
      endpoints: [`http://localhost:${this.port}`],
      autoAcceptConnections: true,
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    } satisfies InitConfig;

    this.config = agentConfig;
    this.agent = new Agent({
      config: agentConfig,
      dependencies: agentDependencies,
    });
    this.data = {};
    this.agent.registerInboundTransport(new HttpInboundTransport({ port }));
    this.agent.registerOutboundTransport(new HttpOutboundTransport());
    this.agent.registerOutboundTransport(new WsOutboundTransport());
  }

  public async initAgent() {
    await this.agent.initialize();
    console.log(`Agent is running on ${this.port}`);
  }

  public async exit() {
    await this.agent.shutdown();
    console.log(`Agent is down.`);
  }
}
