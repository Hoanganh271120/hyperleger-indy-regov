import { Injectable } from '@nestjs/common';
import { BaseAgent } from 'src/common/base-agent';

@Injectable()
export class HoldersService {
  public async acceptOffer(holder: BaseAgent, credentialId?: string) {
    console.log("holder", holder);
    
    return await holder.agent.credentials.acceptOffer({
      credentialRecordId: credentialId || holder.data.credentialId,
    });
  }

  public async acceptProofRequest(holder: BaseAgent, proofId?: string) {
    console.log("helllooooooo");
    
    const targetproofId = proofId || holder.data.proofId;
    console.log("targetProofId", targetproofId);
    

    const creds =
      await holder.agent.proofs.autoSelectCredentialsForProofRequest({
        proofRecordId: targetproofId,
      });

      console.log("creds", creds);
    
    await holder.agent.proofs.acceptRequest({
      proofRecordId: targetproofId,
      proofFormats: {
        indy: creds.proofFormats.indy,
      },
    });
    return creds;
  }
}
