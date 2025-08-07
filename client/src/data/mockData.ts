import { Insight, Lesson, StatsData } from '@/types';

export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Circle NYSE Debut',
    content: 'Stablecoin giant Circle\'s shares surge in blowout NYSE debut',
    category: 'Market',
    timestamp: '',
    tags: ['Stablecoins', 'NYSE', 'IPO'],
    hyperlinks: [
      {
        text: 'Stablecoin',
        conceptId: 'stablecoin',
        position: { start: 0, end: 10 },
        type: 'complex'
      },
      {
        text: 'Circle',
        conceptId: 'circle',
        position: { start: 17, end: 23 },
        type: 'simple'
      }
    ]
  },
  {
    id: '2',
    title: 'Oya Protocol Launch',
    content: 'The first version of the Oya protocol testnet was deployed in June 2024, and the public testnet is coming later this year.',
    category: 'Technology',
    timestamp: '',
    tags: ['Protocol', 'Testnet'],
    hyperlinks: [
      {
        text: 'Oya protocol',
        conceptId: 'oya-protocol',
        position: { start: 27, end: 39 },
        type: 'simple'
      },
      {
        text: 'testnet',
        conceptId: 'testnet',
        position: { start: 40, end: 47 },
        type: 'simple'
      }
    ]
  },
  {
    id: '3',
    title: 'Dogecoin Market Cap',
    content: 'At about $0.21 per coin, Dogecoin\'s $31 billion market cap in early 2025 was larger than many Fortune 500 companies despite having no supply cap.',
    category: 'Market',
    timestamp: '',
    tags: ['DOGE', 'Market Cap'],
    hyperlinks: [
      {
        text: 'Dogecoin',
        conceptId: 'dogecoin',
        position: { start: 25, end: 33 },
        type: 'simple'
      },
      {
        text: 'supply cap',
        conceptId: 'supply-cap',
        position: { start: 134, end: 144 },
        type: 'simple'
      }
    ]
  },
  {
    id: '4',
    title: 'Polygon Hardfork',
    content: 'The Bhilai hardfork on 1 July 2025 raised Polygon\'s block gas limit from 30 million to 45 million, unlocking around 1,000 transactions per second capacity.',
    category: 'Technology',
    timestamp: '',
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
        position: { start: 60, end: 69 },
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
    title: 'Stablecoins',
    description: 'Learn about stablecoins, the crypto assets designed to maintain stable value. Understand different types, mechanisms, and their role in the digital economy.',
    duration: '35 min',
    level: 'Beginner',
    progress: 85,
    status: 'Completed',
    icon: 'DollarSign',
    tags: ['Stablecoins', 'USDC', 'Tether'],
    sections: [
      {
        id: '1-1',
        title: 'What are Stablecoins?',
        duration: '8 min',
        completed: true,
        content: 'Introduction to price-stable cryptocurrencies'
      },
      {
        id: '1-2',
        title: 'Types of Stablecoins',
        duration: '12 min',
        completed: true,
        content: 'Fiat-collateralized, crypto-collateralized, and algorithmic'
      },
      {
        id: '1-3',
        title: 'Major Stablecoin Projects',
        duration: '10 min',
        completed: true,
        content: 'USDC, USDT, DAI and their mechanisms'
      },
      {
        id: '1-4',
        title: 'Use Cases and Risks',
        duration: '5 min',
        completed: false,
        content: 'DeFi, payments, and regulatory considerations'
      }
    ]
  },
  {
    id: '2',
    title: 'Tokenomics',
    description: 'Master the economics of crypto tokens. Learn about supply mechanisms, distribution models, utility design, and how tokenomics affects project success.',
    duration: '50 min',
    level: 'Intermediate',
    progress: 60,
    status: 'In Progress',
    icon: 'TrendingUp',
    tags: ['Supply Cap', 'Token Distribution', 'Utility'],
    sections: [
      {
        id: '2-1',
        title: 'Token Supply Mechanics',
        duration: '12 min',
        completed: true,
        content: 'Fixed vs inflationary supply models'
      },
      {
        id: '2-2',
        title: 'Distribution Strategies',
        duration: '15 min',
        completed: true,
        content: 'ICOs, airdrops, mining, and staking rewards'
      },
      {
        id: '2-3',
        title: 'Token Utility Design',
        duration: '18 min',
        completed: false,
        content: 'Governance, payments, and protocol access'
      },
      {
        id: '2-4',
        title: 'Valuation Models',
        duration: '5 min',
        completed: false,
        content: 'How to assess token value propositions'
      }
    ]
  },
  {
    id: '3',
    title: 'Crypto Wallet Security 101',
    description: 'Essential security practices for protecting your crypto assets. Learn about private keys, seed phrases, hardware wallets, and how to avoid common security pitfalls.',
    duration: '40 min',
    level: 'Beginner',
    progress: 30,
    status: 'In Progress',
    icon: 'Shield',
    tags: ['Private Keys', 'Hardware Wallets', 'Security'],
    sections: [
      {
        id: '3-1',
        title: 'Understanding Private Keys',
        duration: '10 min',
        completed: true,
        content: 'The foundation of crypto ownership'
      },
      {
        id: '3-2',
        title: 'Seed Phrase Security',
        duration: '12 min',
        completed: false,
        content: 'Backup and recovery best practices'
      },
      {
        id: '3-3',
        title: 'Hardware vs Software Wallets',
        duration: '15 min',
        completed: false,
        content: 'Choosing the right wallet type'
      },
      {
        id: '3-4',
        title: 'Common Security Mistakes',
        duration: '3 min',
        completed: false,
        content: 'How to avoid losing your crypto'
      }
    ]
  },
  {
    id: '4',
    title: 'Ethereum Scaling and L2s',
    description: 'Explore Ethereum scaling solutions including Layer 2 networks, rollups, and sidechains. Learn about Polygon, Optimism, Arbitrum, and the future of blockchain scalability.',
    duration: '55 min',
    level: 'Intermediate',
    progress: 0,
    status: 'Available',
    icon: 'Network',
    tags: ['Layer 2', 'Scaling', 'Gas Fees'],
    sections: [
      {
        id: '4-1',
        title: 'Scaling Problem Overview',
        duration: '12 min',
        completed: false,
        content: 'Why Ethereum needs scaling solutions'
      },
      {
        id: '4-2',
        title: 'Layer 2 Technologies',
        duration: '18 min',
        completed: false,
        content: 'Rollups, sidechains, and state channels'
      },
      {
        id: '4-3',
        title: 'Major L2 Networks',
        duration: '20 min',
        completed: false,
        content: 'Polygon, Optimism, Arbitrum deep dive'
      },
      {
        id: '4-4',
        title: 'Using L2 Networks',
        duration: '5 min',
        completed: false,
        content: 'Bridging assets and interacting with L2s'
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
