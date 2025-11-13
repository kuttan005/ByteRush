# AcademiChain Backend

Node.js + Express backend for AcademiChain credential management system.

## Features

- **IPFS Upload**: Upload documents to IPFS via Pinata
- **Blockchain Integration**: Issue and verify credentials on Ethereum
- **REST API**: Clean endpoints for frontend integration

## Prerequisites

- Node.js 18+ installed
- MetaMask or Ethereum wallet
- Pinata account (for IPFS)
- Deployed CredentialRegistry smart contract

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc-mumbai.maticvigil.com
CONTRACT_ADDRESS=deployed_contract_address
PINATA_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret
PORT=3001
```

### Getting Credentials

**Pinata:**
1. Sign up at [pinata.cloud](https://pinata.cloud)
2. Go to API Keys section
3. Create new key with pinFileToIPFS permission
4. Copy API Key and Secret

**Ethereum:**
1. Deploy the CredentialRegistry smart contract (see contract section)
2. Copy the deployed contract address
3. Export your wallet's private key from MetaMask
   - ⚠️ NEVER share your private key or commit it to git

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

Server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```http
GET /health
```

### Upload to IPFS
```http
POST /upload
Content-Type: multipart/form-data

file: [binary file data]
```

Response:
```json
{
  "cid": "QmXxx...",
  "url": "https://gateway.pinata.cloud/ipfs/QmXxx...",
  "message": "File uploaded successfully to IPFS"
}
```

### Issue Credential
```http
POST /issue
Content-Type: application/json

{
  "studentAddress": "0x...",
  "cid": "QmXxx..."
}
```

Response:
```json
{
  "txHash": "0x...",
  "message": "Credential issued successfully",
  "studentAddress": "0x...",
  "cid": "QmXxx..."
}
```

### Get Credential
```http
GET /credential/:id
```

Response:
```json
{
  "id": "1",
  "studentAddress": "0x...",
  "cid": "QmXxx...",
  "issuedAt": "2024-01-01T00:00:00.000Z",
  "revoked": false
}
```

## Smart Contract Interface

The backend expects a smart contract with this interface:

```solidity
// CredentialRegistry.sol
contract CredentialRegistry {
    function issueCredential(address student, string memory cid) 
        external 
        returns (uint256);
    
    function getCredential(uint256 id) 
        external 
        view 
        returns (
            address studentAddress,
            string memory cid,
            uint256 issuedAt,
            bool revoked
        );
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (missing/invalid parameters)
- `404`: Resource not found
- `500`: Server error

Error response format:
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Testing with Postman

Import the provided `postman_collection.json` for ready-to-use API tests.

## Security Notes

- ⚠️ Never commit `.env` file to version control
- ⚠️ Keep your private key secure
- ⚠️ Use environment variables for all sensitive data
- ⚠️ In production, add rate limiting and authentication
- ⚠️ Validate all inputs thoroughly

## Troubleshooting

**Contract connection fails:**
- Verify RPC_URL is correct and accessible
- Check CONTRACT_ADDRESS is valid
- Ensure PRIVATE_KEY has funds for gas

**IPFS upload fails:**
- Verify Pinata API credentials
- Check file size limits
- Ensure Pinata account is active

**Transaction fails:**
- Check wallet has sufficient funds for gas
- Verify contract is deployed and address is correct
- Check network connectivity
