import { SchemaTemplate } from '@aries-framework/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseAgent } from 'src/common/base-agent';
import { CredentialInput } from './dtos/credential.dto';

@Injectable()
export class CompententersService {
  public async compententCredential(
    compententer: BaseAgent,
    payload: CredentialInput,
    credDefId?: string,
  ) {
    console.log(compententer.data.connectionId);
    console.log(compententer.data.credDefId, credDefId);
    return await compententer.agent.credentials.offerCredential({
      protocolVersion: 'v1',
      connectionId: compententer.data.connectionId,
      credentialFormats: {
        indy: {
          credentialDefinitionId: credDefId || compententer.data.credDefId,
          attributes: [
            { name: 'name', value: payload.name },
            { name: 'issue_date', value: payload.name },
            { name: 'expiry_date', value: payload.name },
            { name: 'vehicle_category_code', value: payload.name },
            { name: 'sex', value: payload.sex },
            { name: 'birth_year', value: payload.birth_year },
          ],
        },
      },
    });
  }

  public async acceptOffer(compententer: BaseAgent, credentialId?: string) {
    return await compententer.agent.credentials.acceptOffer({
      credentialRecordId: credentialId || compententer.data.credentialId,
    });
  }

  public async createCredentialSchema(compententer: BaseAgent): Promise<any> {
    const schemaTemplate: SchemaTemplate = {
      name: 'Driver Licence',
      version: '1.0',
      attributes: [
        'name',
        'issue_date',
        'expiry_date',
        'vehicle_category_code',
        'sex',
        'birth_year',
      ],
    };

    if (!compententer) {
      throw new BadRequestException('Please login first');
    }

    const schema = await compententer.agent.ledger.registerSchema(
      schemaTemplate,
    );
    console.log('schema', schema);

    const schemaDef =
      await compententer.agent.ledger.registerCredentialDefinition({
        schema: schema,
        tag: 'CI1',
        supportRevocation: false,
      });

    compententer.data.credDefId = schemaDef.id;
    console.log('Storing cred defs: ', schema.id, schemaDef.id);
    return {
      schema,
      schemaDef,
    };
  }

  public async createProofRequest(compententer: BaseAgent, credDefId: string) {
    const proofRecord = await compententer.agent.proofs.requestProof({
      protocolVersion: 'v1',
      connectionId: compententer.data.connectionId,
      proofFormats: {
        indy: {
          requestedAttributes: {
            attr1_referent: {
              name: 'name',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
            attr2_referent: {
              name: 'issue_date',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
            attr3_referent: {
              name: 'expiry_date',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
            attr4_referent: {
              name: 'vehicle_category_code',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
            attr5_referent: {
              name: 'birth_year',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
            attr6_referent: {
              name: 'sex',
              restrictions: [{ credentialDefinitionId: credDefId }],
            },
          },
        },
      },
    });

    compententer.data.proofId = proofRecord.id;
    return proofRecord;
  }

  public async verifyProof(compententer: BaseAgent, proofId: string) {
    const proofRecord = await compententer.agent.proofs.findById(
      proofId || compententer.data.proofId,
    );
    const presentation =
      await compententer.agent.proofs.findPresentationMessage(
        proofId || compententer.data.proofId,
      );

    return { proofRecord, presentation };
  }
}
