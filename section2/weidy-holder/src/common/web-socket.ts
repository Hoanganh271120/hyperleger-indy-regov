import {
  ConnectionEventTypes,
  ConnectionStateChangedEvent,
  CredentialEventTypes,
  CredentialState,
  CredentialStateChangedEvent,
  DidExchangeState,
  ProofEventTypes,
  ProofState,
  ProofStateChangedEvent,
} from '@aries-framework/core';
import { BaseAgent } from './base-agent';

export class HandeWebSocket {
  public listenEvents(session: BaseAgent) {
    session.agent.events.on<ConnectionStateChangedEvent>(
      ConnectionEventTypes.ConnectionStateChanged,
      async ({ payload }) => {
        if (payload.connectionRecord.state === DidExchangeState.Completed) {
          console.log(`Connection successfully `, payload);
          session.data.connectionId = payload.connectionRecord.id;
        }
      },
    );
    session.agent.events.on<CredentialStateChangedEvent>(
      CredentialEventTypes.CredentialStateChanged,
      async ({ payload }) => {
        if (payload.credentialRecord.state === CredentialState.OfferReceived) {
          console.log(`Credential received:`, payload);
          session.data.credentialId = payload.credentialRecord.id;
        }
      },
    );

    session.agent.events.on<ProofStateChangedEvent>(
      ProofEventTypes.ProofStateChanged,
      async ({ payload }) => {
        if (payload.proofRecord.state === ProofState.RequestReceived) {
          console.log(`Proof Request received:`, payload);
          session.data.proofId = payload.proofRecord.id;
        }
      },
    );
  }
}
