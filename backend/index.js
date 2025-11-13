import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { ethers } from 'ethers';
import pinataSDK from '@pinata/sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Initialize Pinata
const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

// Initialize Ethereum provider and wallet
let provider, wallet, contract;

try {
  provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  // ABI for the CredentialRegistry contract
  const contractABI = [
    "function issueCredential(address student, string memory cid) external returns (uint256)",
    "function getCredential(uint256 id) external view returns (address studentAddress, string memory cid, uint256 issuedAt, bool revoked)"
  ];
  
  contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contractABI,
    wallet
  );
} catch (error) {
  console.error('Blockchain initialization error:', error.message);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AcademiChain API is running',
    timestamp: new Date().toISOString()
  });
});

// POST /upload - Upload file to IPFS
app.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please provide a file to upload'
      });
    }

    const file = req.files.file;
    
    // Upload to Pinata IPFS
    const result = await pinata.pinFileToIPFS(file.data, {
      pinataMetadata: {
        name: file.name,
      },
    });

    const cid = result.IpfsHash;
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    res.status(200).json({
      cid,
      url,
      message: 'File uploaded successfully to IPFS'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error.message
    });
  }
});

// POST /issue - Issue credential on blockchain
app.post('/issue', async (req, res) => {
  try {
    const { studentAddress, cid } = req.body;

    if (!studentAddress || !cid) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Please provide studentAddress and cid'
      });
    }

    // Validate Ethereum address
    if (!ethers.isAddress(studentAddress)) {
      return res.status(400).json({
        error: 'Invalid address',
        message: 'Please provide a valid Ethereum address'
      });
    }

    if (!contract) {
      return res.status(500).json({
        error: 'Contract not initialized',
        message: 'Smart contract connection not available'
      });
    }

    // Call smart contract
    const tx = await contract.issueCredential(studentAddress, cid);
    await tx.wait(); // Wait for transaction confirmation

    res.status(200).json({
      txHash: tx.hash,
      message: 'Credential issued successfully',
      studentAddress,
      cid
    });
  } catch (error) {
    console.error('Issue error:', error);
    res.status(500).json({
      error: 'Issue failed',
      message: error.message
    });
  }
});

// GET /credential/:id - Get credential by ID
app.get('/credential/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!contract) {
      return res.status(500).json({
        error: 'Contract not initialized',
        message: 'Smart contract connection not available'
      });
    }

    // Call smart contract to get credential
    const credential = await contract.getCredential(id);

    res.status(200).json({
      id,
      studentAddress: credential.studentAddress,
      cid: credential.cid,
      issuedAt: new Date(Number(credential.issuedAt) * 1000).toISOString(),
      revoked: credential.revoked
    });
  } catch (error) {
    console.error('Fetch error:', error);
    
    // Check if credential doesn't exist
    if (error.message.includes('call revert')) {
      return res.status(404).json({
        error: 'Credential not found',
        message: `No credential found with ID ${req.params.id}`
      });
    }

    res.status(500).json({
      error: 'Fetch failed',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AcademiChain API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Contract: ${process.env.CONTRACT_ADDRESS}`);
  console.log(`🌐 RPC: ${process.env.RPC_URL}`);
});
