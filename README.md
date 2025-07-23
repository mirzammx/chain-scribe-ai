# 🧠 OnChain Agent — AI-Powered Blockchain Transaction Summarizer

A modern, AI-integrated, on-chain analytics platform that connects to your wallet, fetches real blockchain transaction data, and summarizes it using a powerful LLM. Designed with a clean fintech aesthetic, responsive UI, and real Web3 functionality.

---

## 🚀 Features

### ✅ Core Functionality
- **🔗 Wallet Connection** — Connect MetaMask using `wagmi` and `viem`
- **📦 Real Transaction Fetching** — Fetch actual transactions using Etherscan API
- **🧠 LLM-Powered Summarization** — Summarize transaction history using AI
- **📈 Dual Modes**:
  - **Wallet Analysis**: Summarize the latest transactions from your connected wallet
  - **Single Tx Analysis**: Paste any transaction hash for a one-time AI summary
- **🌐 Blockchain Utilities** — Extract function names, ETH values, timestamps, and more
- **💻 Responsive UI** — Built with TailwindCSS, featuring glowing gradients, smooth animations, and dark mode by default

---

## 🛠️ Tech Stack

| Layer           | Technology                                      |
|----------------|--------------------------------------------------|
| **Frontend**    | React, TypeScript                               |
| **Styling**     | TailwindCSS (custom config: dark mode, gradients, animations) |
| **Wallets**     | `wagmi`, `viem`, MetaMask                      |
| **Blockchain**  | Etherscan API                                   |
| **AI/LLM**      | OpenAI / any LLM API key (can be plugged in)    |
| **State Mgmt**  | React Hooks                                     |

---

## ✨ UI/UX Highlights

- Deep blue/purple gradient theme
- Subtle glowing animations and hover effects
- Card-based layout for transaction details
- Modern blockchain/fintech aesthetic
- Fully responsive layout (mobile + desktop)

---

## 📦 Project Structure

