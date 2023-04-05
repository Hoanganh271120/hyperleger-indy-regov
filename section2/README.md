# hyperleger-indy-regov
The Basic Driver's License Recognition solution is intended to demonstrate the Verifiable Credentials workflow and the basic-level Bcovrin network manipulation workflow.

  
  

## Scenario

Government **(Compententer)** want to issue **Driver's License** to people **(Holder)**.

Later on, Government **(Compententer)** can verify people via their **Driver's License***

  

## Solution Overview

  

People can download an application called Agent & run it on their local machine.

Agent application runs locally without server connection, only connects to the ledger (Node pool) & other agent apps (Peer to peer).

For simplicity & production standard adaptability, Agent application holds only 1 session at a time. For demo purpose, we will run multiple Agent applications to simulate Issuer, Holder, Verifier.

  

The solution applies Permissioned Public Blockchain & Decentralized Identity mechanism using Hyperledger Indy's toolkits & frameworks:

1. **Node Pool/ Ledger**: Indy Ledger, in this case, **BCovrin Test Indy Ledger** is used (http://test.bcovrin.vonx.io/)

2. **Agent**: Hyperledger Aries + Typescript (NestJS)

  

## Installation

  1. Move to the weidy-compententer and weidy-holder directory and run npm i
  
  2. Flow https://aries.js.org/guides/getting-started/installation/nodejs/linux to install aries framework
  3. Run: npm run start:dev to start project
  4. To check out whether Agent apps running properly, call to the corresponding hosts 
-	***Compententer***: `localhost:1111`, `
-	***Holder***: `localhost:3333`
  
## Workflow

#### Issuing Identity
##### 1. Both Compententer, Holder login to their own applications
##### 1.1. If credential schema & definittion are not created, Compententer must create new schema & credential definition
##### 2. Compententer invite Holder for connection 
##### 3. Holder accept connecting invitation
##### 4. Compententer create credential offer & send it to Holder via the connection
##### 5. Holder accept & store the credential

  

#### Verifying Identity
##### 1. Compententer invite Holder for connection 
##### 2. Holder accept connecting invitation
##### 3. Compententer create proof request & send it to Holder via the connection
##### 4. Holder build proof from credentials & send the proof to Verifier via the connection
##### 5. Compententer can views & verify the proof

