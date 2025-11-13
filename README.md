# AcademiChain 🎓⛓️

A full-stack blockchain credential management system for academic institutions. Issue, verify, and manage academic credentials using Ethereum blockchain and IPFS storage.

## Features

✨ **Blockchain Security**: Credentials stored immutably on Ethereum  
📁 **IPFS Storage**: Documents stored on distributed IPFS network via Pinata  
🔍 **Instant Verification**: Verify credentials in seconds  
📊 **Timeline View**: Track all issued credentials  
🎨 **Modern UI**: Beautiful, responsive interface built with React + TailwindCSS  
🔐 **MetaMask Integration**: Seamless wallet connection

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- ethers.js
- shadcn/ui components

### Backend
- Node.js + Express
- ethers.js (blockchain interaction)
- Pinata SDK (IPFS)
- CORS enabled

## Project Structure

```
academichain/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   └── App.tsx            # Main app with wallet integration
├── backend/               # Node.js backend
│   ├── index.js          # Express server
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment template
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MetaMask browser extension
- Pinata account (free tier works)
- Deployed CredentialRegistry smart contract

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure backend URL:**
Create `.env` in root:
```env
VITE_BACKEND_URL=http://localhost:3001
```

3. **Run development server:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:8080`

### Backend Setup

1. **Navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc-mumbai.maticvigil.com
CONTRACT_ADDRESS=your_deployed_contract_address
PINATA_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret
PORT=3001
```

4. **Run backend:**
```bash
npm start
```

Backend API will be available at `http://localhost:3001`

## Getting Your Credentials

### Pinata (IPFS)
1. Sign up at [pinata.cloud](https://pinata.cloud)
2. Navigate to API Keys
3. Create new key with `pinFileToIPFS` permission
4. Copy API Key and Secret to `.env`

### Ethereum Wallet
1. Install MetaMask
2. Create/import wallet
3. Get test tokens from Mumbai faucet
4. Export private key (Settings → Security → Show Private Key)
5. Add to backend `.env`

⚠️ **NEVER share or commit your private key!**

## Smart Contract

The system expects a deployed `CredentialRegistry` contract with:

```solidity
function issueCredential(address student, string memory cid) 
    external returns (uint256);

function getCredential(uint256 id) 
    external view returns (
        address studentAddress,
        string memory cid,
        uint256 issuedAt,
        bool revoked
    );
```

**Note:** Smart contract code is NOT included. Deploy your own contract and update `CONTRACT_ADDRESS` in `.env`.

## API Endpoints

### POST /upload
Upload file to IPFS
```bash
curl -X POST http://localhost:3001/upload \
  -F "file=@certificate.pdf"
```

### POST /issue
Issue credential on blockchain
```bash
curl -X POST http://localhost:3001/issue \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0x...",
    "cid": "QmXxx..."
  }'
```

### GET /credential/:id
Get credential by ID
```bash
curl http://localhost:3001/credential/1
```

## Testing with Postman

Import `backend/postman_collection.json` for ready-to-use API tests.

## Usage Flow

1. **Connect Wallet**: Click "Connect Wallet" in navbar
2. **Issue Credential**:
   - Navigate to "Issue Credential"
   - Enter student wallet address
   - Upload credential document
   - Submit and wait for blockchain confirmation
3. **Verify Credential**:
   - Navigate to "Verify"
   - Enter credential ID
   - View credential details and IPFS document
4. **View Timeline**:
   - Navigate to "Timeline"
   - See all issued credentials chronologically

## Development

### Frontend Development
```bash
npm run dev
```

### Backend Development (with auto-reload)
```bash
cd backend
npm run dev
```

### Build for Production
```bash
npm run build
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` files
- Keep private keys secure
- Use environment variables for all secrets
- In production, add rate limiting and authentication
- Validate all user inputs
- Use HTTPS in production

## Troubleshooting

**"MetaMask Not Found"**
- Install MetaMask browser extension
- Refresh the page

**Backend connection fails**
- Verify backend is running on port 3001
- Check CORS is enabled
- Verify `VITE_BACKEND_URL` is correct

**Transaction fails**
- Ensure wallet has sufficient funds for gas
- Verify contract address is correct
- Check network connectivity

**IPFS upload fails**
- Verify Pinata credentials
- Check file size (max 10MB recommended)
- Ensure Pinata account is active

## License

MIT

## Team

Built by the AcademiChain Team

---

**Need Help?** Check the backend README for detailed API documentation.
