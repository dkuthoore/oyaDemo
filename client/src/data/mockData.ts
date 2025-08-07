import { Insight, Lesson, StatsData } from '@/types';

export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Circle IPO Surge',
    content: 'Circle IPO is super hot, up 10x from the IPO price',
    category: 'Market',
    timestamp: '2 hours ago',
    tags: ['Stablecoins', 'RWA', 'IPO'],
    hyperlinks: [
      {
        text: 'Stablecoins',
        conceptId: 'stablecoins',
        position: { start: 52, end: 63 },
        type: 'complex'
      },
      {
        text: 'RWA',
        conceptId: 'rwa',
        position: { start: 52, end: 55 },
        type: 'simple'
      },
      {
        text: 'IPO',
        conceptId: 'ipo',
        position: { start: 41, end: 44 },
        type: 'simple'
      }
    ]
  },
  {
    id: '2',
    title: 'Oya Protocol Launch',
    content: 'The first version of the Oya protocol testnet was deployed in June 2024, and the public testnet is coming later this year.',
    category: 'Technology',
    timestamp: '5 hours ago',
    tags: ['Protocol', 'Testnet'],
    hyperlinks: [
      {
        text: 'testnet',
        conceptId: 'testnet',
        position: { start: 38, end: 45 },
        type: 'simple'
      }
    ]
  },
  {
    id: '3',
    title: 'Dogecoin Market Cap',
    content: 'At about $0.21 per coin, Dogecoin\'s $31 billion market cap in early 2025 was larger than many Fortune 500 companies despite having no supply cap.',
    category: 'Market',
    timestamp: '1 day ago',
    tags: ['DOGE', 'Market Cap'],
    hyperlinks: [
      {
        text: 'supply cap',
        conceptId: 'supply-cap',
        position: { start: 137, end: 147 },
        type: 'simple'
      }
    ]
  },
  {
    id: '4',
    title: 'Polygon Hardfork',
    content: 'The Bhilai hardfork on 1 July 2025 raised Polygon\'s block gas limit from 30 million to 45 million, unlocking around 1,000 transactions per second capacity.',
    category: 'Technology',
    timestamp: '3 hours ago',
    tags: ['Hardfork', 'Gas Limit'],
    hyperlinks: [
      {
        text: 'hardfork',
        conceptId: 'hardfork',
        position: { start: 11, end: 19 },
        type: 'simple'
      },
      {
        text: 'gas limit',
        conceptId: 'gas-limit',
        position: { start: 59, end: 68 },
        type: 'simple'
      }
    ]
  },
  {
    id: '5',
    title: 'Crypto Wallet Security',
    content: 'Understanding private keys, seed phrases, and cold storage for maximum security.',
    category: 'Security',
    timestamp: '6 hours ago',
    tags: ['Security', 'Wallets'],
    hyperlinks: [
      {
        text: 'private keys',
        conceptId: 'private-keys',
        position: { start: 14, end: 26 },
        type: 'simple'
      },
      {
        text: 'seed phrases',
        conceptId: 'seed-phrases',
        position: { start: 28, end: 40 },
        type: 'simple'
      },
      {
        text: 'cold storage',
        conceptId: 'cold-storage',
        position: { start: 46, end: 58 },
        type: 'complex'
      }
    ]
  },
  {
    id: '6',
    title: 'Ethereum Scaling Solutions',
    content: 'Layer 2 solutions like Optimism and Arbitrum reduce gas fees and improve transaction speed.',
    category: 'Layer 2',
    timestamp: '8 hours ago',
    tags: ['Scaling', 'Gas Fees'],
    hyperlinks: [
      {
        text: 'Layer 2 solutions',
        conceptId: 'layer2',
        position: { start: 0, end: 17 },
        type: 'complex'
      },
      {
        text: 'Optimism',
        conceptId: 'optimism',
        position: { start: 23, end: 31 },
        type: 'simple'
      },
      {
        text: 'Arbitrum',
        conceptId: 'arbitrum',
        position: { start: 36, end: 44 },
        type: 'simple'
      }
    ]
  }
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Blockchain Fundamentals',
    description: 'Master the core concepts of blockchain technology, from distributed ledgers to consensus mechanisms. Learn how transactions work and understand the security principles that make blockchain revolutionary.',
    duration: '45 min',
    level: 'Beginner',
    progress: 75,
    status: 'Completed',
    icon: 'Cubes',
    tags: ['Distributed Ledger', 'Consensus', 'Security'],
    sections: [
      {
        id: '1-1',
        title: 'Introduction to Blockchain',
        duration: '8 min',
        completed: true,
        content: 'What is blockchain and why it matters'
      },
      {
        id: '1-2',
        title: 'Distributed Ledger Technology',
        duration: '12 min',
        completed: true,
        content: 'Understanding distributed systems'
      },
      {
        id: '1-3',
        title: 'Consensus Mechanisms',
        duration: '15 min',
        completed: false,
        content: 'How networks agree on truth'
      },
      {
        id: '1-4',
        title: 'Cryptographic Principles',
        duration: '10 min',
        completed: false,
        content: 'Security through mathematics'
      }
    ]
  },
  {
    id: '2',
    title: 'DeFi Protocols Deep Dive',
    description: 'Explore the ecosystem of decentralized finance protocols. Understand AMMs, yield farming, lending protocols, and how to navigate the DeFi landscape safely and profitably.',
    duration: '60 min',
    level: 'Intermediate',
    progress: 45,
    status: 'In Progress',
    icon: 'ArrowLeftRight',
    tags: ['AMM', 'Yield Farming', 'Lending'],
    sections: [
      {
        id: '2-1',
        title: 'DeFi Ecosystem Overview',
        duration: '10 min',
        completed: true,
        content: 'Understanding the DeFi landscape'
      },
      {
        id: '2-2',
        title: 'Automated Market Makers',
        duration: '15 min',
        completed: true,
        content: 'How AMMs enable trading'
      },
      {
        id: '2-3',
        title: 'Yield Farming Strategies',
        duration: '20 min',
        completed: false,
        content: 'Earning rewards in DeFi'
      },
      {
        id: '2-4',
        title: 'Lending and Borrowing',
        duration: '15 min',
        completed: false,
        content: 'DeFi money markets'
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Contract Development',
    description: 'Learn to build and deploy smart contracts on Ethereum. Cover Solidity programming, security best practices, gas optimization, and testing methodologies for production-ready contracts.',
    duration: '90 min',
    level: 'Advanced',
    progress: 15,
    status: 'Locked',
    icon: 'Code',
    tags: ['Solidity', 'Security', 'Testing'],
    sections: [
      {
        id: '3-1',
        title: 'Solidity Basics',
        duration: '25 min',
        completed: false,
        content: 'Programming language for smart contracts'
      },
      {
        id: '3-2',
        title: 'Contract Architecture',
        duration: '20 min',
        completed: false,
        content: 'Designing secure contracts'
      },
      {
        id: '3-3',
        title: 'Security Best Practices',
        duration: '25 min',
        completed: false,
        content: 'Common vulnerabilities and fixes'
      },
      {
        id: '3-4',
        title: 'Testing and Deployment',
        duration: '20 min',
        completed: false,
        content: 'Ensuring contract reliability'
      }
    ]
  },
  {
    id: '4',
    title: 'Crypto Security Masterclass',
    description: 'Comprehensive security guide covering wallet security, private key management, identifying scams, and protecting your digital assets in the ever-evolving crypto landscape.',
    duration: '75 min',
    level: 'Intermediate',
    progress: 0,
    status: 'Available',
    icon: 'Shield',
    tags: ['Wallet Security', 'Private Keys', 'Scam Prevention'],
    sections: [
      {
        id: '4-1',
        title: 'Wallet Security Fundamentals',
        duration: '20 min',
        completed: false,
        content: 'Protecting your crypto assets'
      },
      {
        id: '4-2',
        title: 'Private Key Management',
        duration: '18 min',
        completed: false,
        content: 'Your keys, your crypto'
      },
      {
        id: '4-3',
        title: 'Identifying Scams',
        duration: '22 min',
        completed: false,
        content: 'Common attack vectors'
      },
      {
        id: '4-4',
        title: 'Cold Storage Solutions',
        duration: '15 min',
        completed: false,
        content: 'Ultimate security setup'
      }
    ]
  }
];

export const mockStats: StatsData = {
  activeInsights: 24,
  conceptsLearned: 156,
  progressRate: 89,
  lessonsCompleted: 12
};

export const mockChatResponses: Record<string, string> = {
  'liquidity-pools': 'Liquidity pools are smart contracts that hold funds from users (liquidity providers) to enable automated trading. They use algorithms to determine prices based on the supply and demand of assets in the pool.',
  'defi': 'DeFi (Decentralized Finance) refers to financial services built on blockchain networks, primarily Ethereum, that operate without traditional intermediaries like banks.',
  'automated-trading': 'Automated trading in DeFi uses smart contracts and algorithms to execute trades automatically based on predefined rules, without human intervention.',
  'pos': 'Proof of Stake (PoS) is a consensus mechanism where validators are chosen to create new blocks based on their stake (ownership) in the network.',
  'pow': 'Proof of Work (PoW) is a consensus mechanism that requires miners to solve complex mathematical problems to validate transactions and create new blocks.',
  'validators': 'Validators in PoS networks are responsible for verifying transactions and creating new blocks. They are selected based on their stake and must put their tokens at risk.',
  'erc721': 'ERC-721 is a standard for non-fungible tokens (NFTs) on Ethereum. Each token is unique and cannot be replicated.',
  'erc1155': 'ERC-1155 is a multi-token standard that allows for both fungible and non-fungible tokens in a single contract.',
  'nfts': 'Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of specific items or content on the blockchain.',
  'yield-farming': 'Yield farming involves lending or staking cryptocurrency to earn rewards, typically in the form of additional tokens.',
  'liquidity': 'Liquidity refers to how easily an asset can be bought or sold without affecting its price.',
  'protocols': 'DeFi protocols are applications built on blockchain that provide financial services like lending, trading, and earning yield.',
  'private-keys': 'Private keys are secret numbers that allow you to spend cryptocurrencies. Never share them with anyone.',
  'seed-phrases': 'Seed phrases are 12-24 word sequences that can restore your crypto wallet. Keep them safe and offline.',
  'cold-storage': 'Cold storage keeps your private keys offline, away from internet-connected devices for maximum security.',
  'layer2': 'Layer 2 solutions are built on top of blockchains to improve scalability and reduce transaction costs.',
  'optimism': 'Optimism is a Layer 2 scaling solution for Ethereum that uses optimistic rollups to reduce gas fees.',
  'arbitrum': 'Arbitrum is another Layer 2 solution that uses optimistic rollups to make Ethereum transactions faster and cheaper.',
  'general': 'Hello! I\'m your AI assistant. I can help explain crypto concepts, answer questions about DeFi, blockchain technology, and more. What would you like to learn about?'
};
