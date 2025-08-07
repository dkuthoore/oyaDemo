import { Insight, Lesson, StatsData } from '@/types';

export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Understanding Liquidity Pools',
    content: 'Liquidity pools are essential mechanisms in decentralized finance that enable automated trading without traditional order books.',
    category: 'DeFi',
    timestamp: '2 hours ago',
    tags: ['AMM', 'DEX'],
    hyperlinks: [
      {
        text: 'Liquidity pools',
        conceptId: 'liquidity-pools',
        position: { start: 0, end: 15 },
        type: 'complex'
      },
      {
        text: 'decentralized finance',
        conceptId: 'defi',
        position: { start: 45, end: 65 },
        type: 'complex'
      },
      {
        text: 'automated trading',
        conceptId: 'automated-trading',
        position: { start: 80, end: 96 },
        type: 'simple'
      }
    ]
  },
  {
    id: '2',
    title: 'Proof of Stake Consensus',
    content: 'Proof of Stake offers an energy-efficient alternative to Proof of Work, where validators secure the network based on their stake.',
    category: 'Blockchain',
    timestamp: '5 hours ago',
    tags: ['Consensus', 'Staking'],
    hyperlinks: [
      {
        text: 'Proof of Stake',
        conceptId: 'pos',
        position: { start: 0, end: 14 },
        type: 'complex'
      },
      {
        text: 'Proof of Work',
        conceptId: 'pow',
        position: { start: 50, end: 63 },
        type: 'complex'
      },
      {
        text: 'validators',
        conceptId: 'validators',
        position: { start: 71, end: 81 },
        type: 'simple'
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Contract Standards',
    content: 'ERC-721 and ERC-1155 standards define how non-fungible tokens function on Ethereum.',
    category: 'NFT',
    timestamp: '1 day ago',
    tags: ['Smart Contracts', 'Ethereum'],
    hyperlinks: [
      {
        text: 'ERC-721',
        conceptId: 'erc721',
        position: { start: 0, end: 7 },
        type: 'simple'
      },
      {
        text: 'ERC-1155',
        conceptId: 'erc1155',
        position: { start: 12, end: 20 },
        type: 'simple'
      },
      {
        text: 'non-fungible tokens',
        conceptId: 'nfts',
        position: { start: 40, end: 59 },
        type: 'complex'
      }
    ]
  },
  {
    id: '4',
    title: 'Yield Farming Strategies',
    content: 'Yield farming involves providing liquidity to earn rewards through various DeFi protocols.',
    category: 'Trading',
    timestamp: '3 hours ago',
    tags: ['Yield', 'Rewards'],
    hyperlinks: [
      {
        text: 'Yield farming',
        conceptId: 'yield-farming',
        position: { start: 0, end: 13 },
        type: 'complex'
      },
      {
        text: 'liquidity',
        conceptId: 'liquidity',
        position: { start: 33, end: 42 },
        type: 'simple'
      },
      {
        text: 'DeFi protocols',
        conceptId: 'protocols',
        position: { start: 73, end: 87 },
        type: 'complex'
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
