# 🚀 AcademiChain Setup Guide

Complete setup instructions to get your AcademiChain MVP running.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ MetaMask browser extension ([Install](https://metamask.io/))
- ✅ Pinata account (free tier) ([Sign up](https://pinata.cloud/))
- ✅ Deployed CredentialRegistry smart contract
- ✅ Test ETH on Mumbai testnet

---

## 🎯 Quick Start (3 Steps)

### Step 1: Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and set:
# VITE_BACKEND_URL=http://localhost:3001

# Run development server
npm run dev
```

✅ Frontend now running at **http://localhost:8080**

---

### Step 2: Backend Setup

```bash
# Open new terminal, navigate to backend
cd backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env

# Edit backend/.env with your credentials (see below)

# Run backend server
npm start
```

✅ Backend API now running at **http://localhost:3001**

---

### Step 3: Configure Backend Environment

Edit `backend/.env` with your credentials:

```env
# 1. Your wallet's private key (from MetaMask)
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

# 2. Mumbai testnet RPC (or your preferred network)
RPC_URL=https://rpc-mumbai.maticvigil.com

# 3. Your deployed contract address
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE

# 4. Pinata IPFS credentials
PINATA_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret_key

# 5. Server port (default is fine)
PORT=3001
```

---

## 🔑 Getting Your Credentials

### 1️⃣ Pinata API Keys (IPFS Storage)

1. Go to [pinata.cloud](https://pinata.cloud) and sign up
2. Navigate to **API Keys** in dashboard
3. Click **New Key**
4. Enable `pinFileToIPFS` permission
5. Name it "AcademiChain"
6. Copy **API Key** → `PINATA_KEY`
7. Copy **API Secret** → `PINATA_SECRET`

### 2️⃣ MetaMask Private Key

⚠️ **WARNING: Keep this secret! Never share or commit to git!**

1. Open MetaMask
2. Click account icon → **Settings**
3. **Security & Privacy** → **Show Private Key**
4. Enter your password
5. Copy the key → `PRIVATE_KEY` (include the 0x prefix)

### 3️⃣ Mumbai Testnet Setup

1. In MetaMask, click network dropdown
2. **Show test networks** (in settings if not visible)
3. Select **Mumbai Testnet**
4. Get free test MATIC from [Mumbai Faucet](https://faucet.polygon.technology/)

### 4️⃣ Smart Contract Address

You need to deploy the `CredentialRegistry` smart contract first:

**Required Contract Interface:**
```solidity
contract CredentialRegistry {
    function issueCredential(address student, string memory cid) 
        external returns (uint256);
    
    function getCredential(uint256 id) external view returns (
        address studentAddress,
        string memory cid,
        uint256 issuedAt,
        bool revoked
    );
}
```

Deploy using Remix, Hardhat, or Foundry, then copy the address to `CONTRACT_ADDRESS`.

---

## ✅ Verify Setup

### Test Backend Health

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "AcademiChain API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Frontend

1. Open http://localhost:8080
2. Click **Connect Wallet**
3. Approve MetaMask connection
4. You should see your address in the navbar

---

## 🧪 Testing the Full Flow

### Using the UI:

1. **Connect Wallet** (top right)
2. Go to **Issue Credential**
3. Enter a student wallet address
4. Upload a test PDF file
5. Click **Issue Credential**
6. Approve MetaMask transaction
7. Wait for confirmation
8. Copy the credential ID from the result
9. Go to **Verify** page
10. Enter the credential ID
11. View the verified credential

### Using Postman:

1. Import `backend/postman_collection.json`
2. Run **Health Check** to verify backend
3. Run **Upload File to IPFS** with a test file
4. Copy the returned `cid`
5. Run **Issue Credential** with student address and `cid`
6. Run **Get Credential by ID** to verify

---

## 🐛 Troubleshooting

### "MetaMask Not Found"
- Install MetaMask extension
- Refresh your browser
- Make sure you're not in incognito mode

### Backend Connection Failed
- Check if backend is running: `curl http://localhost:3001/health`
- Verify `VITE_BACKEND_URL` in frontend `.env`
- Check for CORS errors in browser console

### "Insufficient Funds" Error
- Get test tokens from Mumbai faucet
- Switch to correct network in MetaMask
- Check your wallet balance

### Transaction Fails
- Verify `CONTRACT_ADDRESS` is correct
- Ensure contract is deployed on the right network
- Check `RPC_URL` is accessible
- Verify wallet has enough gas

### IPFS Upload Fails
- Verify Pinata API credentials
- Check Pinata account is active
- File size should be under 10MB
- Check internet connection

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

---

## 📁 Project Structure

```
academichain/
├── src/
│   ├── components/       # Navbar, UI components
│   ├── pages/           # Home, Issue, Verify, Timeline
│   ├── App.tsx          # Main app with wallet logic
│   └── types/           # TypeScript definitions
├── backend/
│   ├── index.js         # Express server
│   ├── package.json     # Backend dependencies
│   └── .env             # Backend configuration
└── README.md            # Documentation
```

---

## 🔐 Security Checklist

- ✅ `.env` files added to `.gitignore`
- ✅ Private keys never committed to git
- ✅ Using environment variables for secrets
- ✅ Validating all user inputs
- ⚠️ For production: Add rate limiting
- ⚠️ For production: Add authentication
- ⚠️ For production: Use HTTPS
- ⚠️ For production: Implement proper error logging

---

## 🎉 You're Ready!

Your AcademiChain MVP is now running! You can now:

1. ✨ Issue credentials on blockchain
2. 🔍 Verify credentials instantly
3. 📊 View credential timeline
4. 🔗 Access documents on IPFS

---

## 📚 Next Steps

- Deploy smart contract to mainnet
- Add credential revocation feature
- Implement batch issuance
- Add email notifications
- Create admin dashboard
- Implement search functionality
- Add credential templates
- Set up CI/CD pipeline

---

## 💡 Need Help?

- Check `README.md` for API documentation
- Review `backend/README.md` for backend details
- Import Postman collection for API testing
- Open an issue on GitHub

**Happy Credentialing! 🎓⛓️**
