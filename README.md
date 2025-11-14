# AcademiChain

**AcademiChain** — a hackathon-ready demo that issues tamper-proof academic credentials (W3C-style Verifiable Credentials) using DIDs, IPFS (mockable), signed JSON VCs, and an on-chain DID/anchoring contract. This repo contains a React frontend, a small Node backend (mock IPFS), and Hardhat Solidity contracts for anchoring and revocation.

---

## Features (MVP)

* University portal: generate issuer DID, issue signed VCs, optionally anchor credential hash on-chain
* Student wallet: import/persist VCs in localStorage, export/present (JSON/QR), create derived credential (selective disclosure)
* Employer verifier: verify signatures, check on-chain revocation, display human-friendly VALID/REVOKED/INVALID
* Smart contract: `DIDRegistry.sol` — register DID controller, anchor credential hash, revoke, and query
* Mock IPFS upload endpoint (swap to real web3.storage/IPFS easily)

---

## Quickstart (recommended)

> Tested with Node.js v16+ and npm. You can use `nvm` to manage Node versions.

1. **Clone**

```bash
git clone https://github.com/Abhishek14-3/AcademiChain.git
cd AcademiChain
```

2. **Install dependencies**

> Important: on Windows PowerShell make sure to type `npm install` (you previously typed `npm instal`).

```bash
# from repo root (if frontend/backend/hardhat have their own package.json, run from those folders as needed)
npm install
```

**If you hit peer dependency errors (common with older packages like `react-qr-reader`)**

Fast workaround (safe for local dev):

```bash
npm install --legacy-peer-deps
```

Safer fix: remove the incompatible package and replace with a maintained QR library:

```bash
npm uninstall react-qr-reader
npm install html5-qrcode
# or
npm install react-qr-scanner
```

If you want, I can update the code to use `html5-qrcode` and paste the replacement component.

3. **Environment**

Create a `.env` (or copy `.env.example`) in the appropriate folders with these recommended variables:

```
# .env.example
PRIVATE_KEY=0x...            # ephemeral demo key for Hardhat scripts (never commit real keys)
WEB3_STORAGE_KEY=...         # optional, if you want real IPFS/web3.storage
ALCHEMY_API_KEY=...          # optional, for testnet deploy
```

4. **Run Hardhat local network & deploy**

Open a terminal and start a local Hardhat node:

```bash
npx hardhat node
```

In another terminal, deploy contracts to the local node:

```bash
npx hardhat run scripts/deploy.js --network localhost
# or use an npm script if provided: npm run deploy-local
```

Run tests:

```bash
npx hardhat test
```

5. **Start backend (mock IPFS)**

```bash
cd backend
npm install
npm start
# server will expose POST /ipfs/upload and GET /health
```

6. **Start frontend**

```bash
cd frontend
npm install
npm run dev
# open the displayed URL (usually http://localhost:5173)
```

---

## Demo script (60–90s)

1. University: generate DID → issue a degree to student DID (fill form + upload PDF) → sign VC and show issued JSON + CID.
2. Student: import VC into wallet (click/paste) → show credential list and timeline.
3. Employer: paste VC JSON into verifier → show `VALID` (signature matches & not revoked).
4. Issuer: revoke credential → verifier now shows `REVOKED`.
5. Student: create derived credential (GPA only) → verify derived VC.

---

## File structure (high level)

```
/ (repo root)
  /backend            # Express mock IPFS server
  /frontend           # React + Tailwind demo app
  /contracts          # Solidity contracts (DIDRegistry.sol)
  /scripts            # Hardhat deploy scripts
  /hardhat.config.js  # Hardhat config
  /sample-vcs         # Sample VC JSON files
  README.md           # (this file)
```

---

## Credential hashing & verification (notes)

* Credential hash is computed deterministically (example used: `keccak256(toUtf8Bytes(JSON.stringify(canonicalVC)))`).
* Signature proof format: `{ type, created, proofPurpose, verificationMethod, signature }` where `signature` is an Ethereum ECDSA signature.
* Verification flow:

  1. Check JSON schema fields are present.
  2. Recover issuer address from signature and compare to DID controller from contract.
  3. Compute credential hash and call `isRevoked(hash)` on `DIDRegistry`.

---

## Troubleshooting

* **`ERESOLVE` / peer dep conflicts:** run `npm install --legacy-peer-deps` or replace the incompatible package (recommended).
* **Forgot to run Hardhat node:** `npx hardhat node` must be running before deploying or interacting with local contract addresses.
* **MetaMask connection issues:** ensure the local Hardhat accounts are added to MetaMask (copy private key from `npx hardhat node` output) and network RPC is `http://127.0.0.1:8545`.
* **Permission issues on Windows:** run PowerShell as admin or use WSL for smoother dev experience.

---

## Tests

* Smart contract unit tests live in `test/` (run with `npx hardhat test`).
* Manual verification checklist is in `sample-vcs/` and `demo-script.md`.

---

## How I can help next

* I can update code to replace `react-qr-reader` with `html5-qrcode` and supply the React component.
* I can create a pre-recorded demo GIF or generate a one-page PDF of this methodology for judges.
* I can prepare a `deploy-mumbai.js` script and instructions to deploy to Mumbai testnet if you want a remote demo.

---

## Contributing

PRs welcome — open issues for bugs or feature requests. Keep commits small and document any env secrets in `.env.example` only.

---
<img width="1887" height="945" alt="Screenshot 2025-11-14 072403" src="https://github.com/user-attachments/assets/3d807603-13a5-42b0-8ec2-d04c65ffb191" />


## License

This project is open for educational/demo use. Add your preferred license file (MIT recommended) if you want public distribution.

---

*Made with ❤️ — ask me to update or produce the exact replacement QR component or the Hardhat deploy script.*
