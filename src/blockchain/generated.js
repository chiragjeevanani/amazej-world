import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMZGlobalRoyalty
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const amzGlobalRoyaltyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_amzToken', internalType: 'address', type: 'address' },
      { name: '_vipModule', internalType: 'address', type: 'address' },
      { name: '_usdt', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'vipLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'position',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AddedToWaitlist',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DailyDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'vipLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'membersCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LevelDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'vipLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'fromWaitlist',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'MemberAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'vipLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'reason',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'MemberRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldMember',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newMember',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'vipLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'MemberReplaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RoyaltyDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'member',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'fromLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      { name: 'toLevel', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'VIPUpgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CLAIM_DAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_MEMBERS_PER_LEVEL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_VIP_LEVEL',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MISSED_DAYS_THRESHOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8', type: 'uint8' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'activeMembers',
    outputs: [
      { name: 'memberAddress', internalType: 'address', type: 'address' },
      { name: 'joinedAt', internalType: 'uint64', type: 'uint64' },
      { name: 'lastClaimDate', internalType: 'uint64', type: 'uint64' },
      { name: 'claimDaysUsed', internalType: 'uint256', type: 'uint256' },
      { name: 'totalClaimed', internalType: 'uint256', type: 'uint256' },
      { name: 'isPermanent', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'amzToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'dailyRoyaltyPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'distributeDailyRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'getActiveMembers',
    outputs: [
      { name: 'addresses', internalType: 'address[]', type: 'address[]' },
      { name: 'claimDaysUsed', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalClaimed', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lastClaimDates', internalType: 'uint64[]', type: 'uint64[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'getExpectedDailyEarning',
    outputs: [{ name: 'perMember', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'getLevelStats',
    outputs: [
      { name: 'activeMembersCount', internalType: 'uint256', type: 'uint256' },
      { name: 'waitlistCount', internalType: 'uint256', type: 'uint256' },
      { name: 'availableSpots', internalType: 'uint256', type: 'uint256' },
      {
        name: 'totalDistributedToday',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'member', internalType: 'address', type: 'address' }],
    name: 'getMemberDetails',
    outputs: [
      { name: 'isActive', internalType: 'bool', type: 'bool' },
      { name: 'activeLevel', internalType: 'uint8', type: 'uint8' },
      { name: 'claimDaysUsed', internalType: 'uint256', type: 'uint256' },
      { name: 'claimDaysRemaining', internalType: 'uint256', type: 'uint256' },
      { name: 'totalClaimed', internalType: 'uint256', type: 'uint256' },
      { name: 'lastClaimDate', internalType: 'uint64', type: 'uint64' },
      { name: 'isPermanent', internalType: 'bool', type: 'bool' },
      { name: 'waitlistPosition', internalType: 'uint256', type: 'uint256' },
      { name: 'activeMembersCount', internalType: 'uint256', type: 'uint256' },
      { name: 'canClaim', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRoyaltyPoolStatus',
    outputs: [
      { name: 'totalPool', internalType: 'uint256', type: 'uint256' },
      { name: 'dailyPool', internalType: 'uint256', type: 'uint256' },
      { name: 'lastDistribution', internalType: 'uint256', type: 'uint256' },
      { name: 'canDistribute', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'getWaitlist',
    outputs: [
      { name: 'addresses', internalType: 'address[]', type: 'address[]' },
      { name: 'requestedAt', internalType: 'uint64[]', type: 'uint64[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8', type: 'uint8' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'inWaitlist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastDistributionDate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastDistributionTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'manualCleanup',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'memberActiveLevel',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'member', internalType: 'address', type: 'address' },
      { name: 'vipLevel', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'registerVIPMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'royaltyPool',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vipModule',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'vipPercentages',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8', type: 'uint8' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'waitlist',
    outputs: [
      { name: 'memberAddress', internalType: 'address', type: 'address' },
      { name: 'requestedAt', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMZToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const amzTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'usdtToken_', internalType: 'address', type: 'address' },
      { name: 'treasury_', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'phase', internalType: 'uint8', type: 'uint8', indexed: true },
      { name: 'periods', internalType: 'uint8', type: 'uint8', indexed: false },
      {
        name: 'grossTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'feeTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'phase', internalType: 'uint8', type: 'uint8', indexed: true },
      {
        name: 'depositUSDCents',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'usdtAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'baseUSDCentsAfter',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'firstDepositReferralPaid',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'DepositMade',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ReferrerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'usdtReceived',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Sold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'TeamLinked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'VIPAchieved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'grossTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'feeTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VIPClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'upline',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VIPUpgrade1Counted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'grossTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'feeTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'netTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawClaimed',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEEP_REF_WINDOW',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EARLY_DEPOSIT_WINDOW',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CYCLES_PER_PHASE',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_PAYOUTS',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOTAL_CLAIMS',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_UPLINE_DEPTH',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'referrer', internalType: 'address', type: 'address' },
      { name: 'child', internalType: 'address', type: 'address' },
    ],
    name: 'addDirectVip1',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'level', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addRoyaltyHistory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimAll',
    outputs: [{ name: 'totalNet', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimFeeBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'claimHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimReferral',
    outputs: [{ name: 'netOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'phase', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'claimsBlocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'cents', internalType: 'uint256', type: 'uint256' },
      { name: 'periods', internalType: 'uint8', type: 'uint8' },
      { name: 'oneTime', internalType: 'bool', type: 'bool' },
    ],
    name: 'creditVipCents',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'depositUSDCents', internalType: 'uint256', type: 'uint256' },
      { name: 'ref', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'depositHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'directRefPercent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getClaimBlockers',
    outputs: [
      { name: 'blocked', internalType: 'bool', type: 'bool' },
      { name: 'blockingPhase', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getClaimHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.ClaimHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'claimAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'netTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'feeTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'periods', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'claimedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getDeepReferralStatus',
    outputs: [
      { name: 'unlocked', internalType: 'bool', type: 'bool' },
      { name: 'directsInWindow', internalType: 'uint16', type: 'uint16' },
      { name: 'windowStart', internalType: 'uint64', type: 'uint64' },
      { name: 'windowEnd', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getDepositHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.DepositHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'depositAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'depositedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getReferralClaimHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.ReferralClaimHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'claimAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'claimedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'level', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getReferralInfo',
    outputs: [
      {
        name: 'availableReferralTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'availableReferralUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'lastReferralClaimAt', internalType: 'uint64', type: 'uint64' },
      { name: 'directReferrals', internalType: 'uint16', type: 'uint16' },
      { name: 'teamMembers', internalType: 'uint32', type: 'uint32' },
      { name: 'teamDepositsCents', internalType: 'uint256', type: 'uint256' },
      {
        name: 'teamReferralUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoyaltyClaimHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.RoyaltyClaimHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'claimAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'claimedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'level', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getSellHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.SellHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'sellAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'netTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'feeTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'soldAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUser',
    outputs: [
      { name: 'hasPlan', internalType: 'bool', type: 'bool' },
      { name: 'baseUSDCents', internalType: 'uint256', type: 'uint256' },
      { name: 'nextPhase', internalType: 'uint8', type: 'uint8' },
      {
        name: 'baseTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'halfTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'quarterTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'totalDepositedUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'totalRewardsUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'referrer', internalType: 'address', type: 'address' },
      { name: 'nextClaimAt', internalType: 'uint256', type: 'uint256' },
      { name: 'lastDepositAt', internalType: 'uint256', type: 'uint256' },
      { name: 'depositAllowedAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getVIPClaimHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.VIPClaimHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'claimAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'period', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'claimedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'oneTime', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getVipEligibility',
    outputs: [
      { name: 'baseUSDCents', internalType: 'uint256', type: 'uint256' },
      { name: 'directs', internalType: 'uint16', type: 'uint16' },
      { name: 'directsVip1', internalType: 'uint16', type: 'uint16' },
      { name: 'teamTotal', internalType: 'uint32', type: 'uint32' },
      { name: 'lastDepositAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'fromTs', internalType: 'uint64', type: 'uint64' },
      { name: 'toTs', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getVipEligibilityRede',
    outputs: [
      { name: 'directs', internalType: 'uint16', type: 'uint16' },
      { name: 'dirVip1', internalType: 'uint16', type: 'uint16' },
      { name: 'team', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getWithdrawHistory',
    outputs: [
      {
        name: 'out',
        internalType: 'struct AMZToken.WithdrawHistory[]',
        type: 'tuple[]',
        components: [
          { name: 'claimAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'netTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'feeTokens', internalType: 'uint256', type: 'uint256' },
          { name: 'tokenPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'claimedAt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getWithdrawInfo',
    outputs: [
      { name: 'availableWithdraw', internalType: 'uint256', type: 'uint256' },
      {
        name: 'availableWithdrawTokens',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'totalWithdrawn', internalType: 'uint256', type: 'uint256' },
      {
        name: 'totalTokensWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'lastReferralClaimAt', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'cents', internalType: 'uint256', type: 'uint256' }],
    name: 'isAllowedPlan',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'l2RefPercent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'l3RefPercent',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxPayout',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'phase', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'nextClaimAtOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'pendingAllRewardsTokens',
    outputs: [
      { name: 'total', internalType: 'uint256', type: 'uint256' },
      { name: 'p0', internalType: 'uint256', type: 'uint256' },
      { name: 'p1', internalType: 'uint256', type: 'uint256' },
      { name: 'p2', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'phase', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'pendingPhaseRewardTokens',
    outputs: [{ name: 'tokensDue', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceInCentsPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'refClaimFeeBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'referralClaimHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'referrerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'royaltyClaimHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'royaltyModule',
    outputs: [
      { name: '', internalType: 'contract AMZGlobalRoyalty', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'sell',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sellAdminFeeBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sellFeeBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'sellHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'setRoyaltyModule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'mod', internalType: 'address', type: 'address' }],
    name: 'setVipModule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'vipClaimHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vipModule',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'withdrawHistoryLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAMZCore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iamzCoreAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'parent', internalType: 'address', type: 'address' },
      { name: 'child', internalType: 'address', type: 'address' },
    ],
    name: 'addDirectVip1',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'level', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addRoyaltyHistory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'phase', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'claimsBlocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'cents', internalType: 'uint256', type: 'uint256' },
      { name: 'periods', internalType: 'uint8', type: 'uint8' },
      { name: 'oneTime', internalType: 'bool', type: 'bool' },
    ],
    name: 'creditVipCents',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUser',
    outputs: [
      { name: 'hasPlan', internalType: 'bool', type: 'bool' },
      { name: 'baseUSDCents', internalType: 'uint256', type: 'uint256' },
      { name: 'nextPhase', internalType: 'uint8', type: 'uint8' },
      {
        name: 'baseTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'halfTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'quarterTranche',
        internalType: 'struct IAMZCore.TrancheView',
        type: 'tuple',
        components: [
          { name: 'amountUSDCents', internalType: 'uint256', type: 'uint256' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'needsReactivate', internalType: 'bool', type: 'bool' },
          { name: 'wasActiveBeforeGate', internalType: 'bool', type: 'bool' },
          { name: 'payoutsMade', internalType: 'uint8', type: 'uint8' },
          { name: 'claimCounts', internalType: 'uint8', type: 'uint8' },
          { name: 'availableCycles', internalType: 'uint8', type: 'uint8' },
          { name: 'currentCycle', internalType: 'uint64', type: 'uint64' },
          { name: 'nextClaimAt', internalType: 'uint64', type: 'uint64' },
        ],
      },
      {
        name: 'totalDepositedUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'totalRewardsUSDCents',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'referrer', internalType: 'address', type: 'address' },
      { name: 'nextClaimAt', internalType: 'uint256', type: 'uint256' },
      { name: 'lastDepositAt', internalType: 'uint256', type: 'uint256' },
      { name: 'depositAllowedAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxPayout',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'referrerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1363
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1363Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferFromAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFromAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_unlockTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'when',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableAbi = [
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCast
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCastAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'int256', type: 'int256' },
    ],
    name: 'SafeCastOverflowedIntDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'int256', type: 'int256' }],
    name: 'SafeCastOverflowedIntToUint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'SafeCastOverflowedUintToInt',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeErc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'currentAllowance', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedDecrease', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeERC20FailedDecreaseAllowance',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Treasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const treasuryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'BeneficiaryNotFound' },
  { type: 'error', inputs: [], name: 'InvalidPercentage' },
  { type: 'error', inputs: [], name: 'NoBalance' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'TotalPercentageExceeds100' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'percentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BeneficiaryAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeneficiaryRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'wallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BeneficiaryUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokensDistributed',
  },
  {
    type: 'function',
    inputs: [
      { name: 'wallet', internalType: 'address', type: 'address' },
      { name: 'percentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addBeneficiary',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'beneficiaries',
    outputs: [
      { name: 'wallet', internalType: 'address', type: 'address' },
      { name: 'percentage', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'distributeNative',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBeneficiaries',
    outputs: [
      {
        name: '',
        internalType: 'struct Treasury.Beneficiary[]',
        type: 'tuple[]',
        components: [
          { name: 'wallet', internalType: 'address', type: 'address' },
          { name: 'percentage', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBeneficiaryCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'wallet', internalType: 'address', type: 'address' }],
    name: 'removeBeneficiary',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDTMock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdtMockAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'n', internalType: 'string', type: 'string' },
      { name: 's', internalType: 'string', type: 'string' },
      { name: 'decs', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VIPModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vipModuleAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'core_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'isRede', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'isOneTime', internalType: 'bool', type: 'bool', indexed: false },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
      {
        name: 'slotNumber',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'cents',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ClaimCredit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CloseRedeWindow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CloseVipWindow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'newLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'LevelUp',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
      {
        name: 'startAt',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'OpenRedeWindow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
      {
        name: 'startAt',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'OpenVipWindow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'upline',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'redepositor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'isDirect', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RedeCounted',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_UPLINE_DEPTH',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'core',
    outputs: [{ name: '', internalType: 'contract IAMZCore', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'currentTrack',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllLevelTables',
    outputs: [
      { name: 'selfCents', internalType: 'uint256[8]', type: 'uint256[8]' },
      { name: 'directsMin', internalType: 'uint16[8]', type: 'uint16[8]' },
      { name: 'directsVip1Min', internalType: 'uint16[8]', type: 'uint16[8]' },
      { name: 'teamMin', internalType: 'uint32[8]', type: 'uint32[8]' },
      { name: 'perClaimCents', internalType: 'uint256[8]', type: 'uint256[8]' },
      { name: 'oneTimeCents', internalType: 'uint256[8]', type: 'uint256[8]' },
      { name: 'redeAllowed', internalType: 'uint256[7]', type: 'uint256[7]' },
      { name: 'periodSeconds', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getClaimableCents',
    outputs: [
      { name: 'vipCents', internalType: 'uint256', type: 'uint256' },
      { name: 'redeCents', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'getLevelConfig',
    outputs: [
      { name: 'selfCents', internalType: 'uint256', type: 'uint256' },
      { name: 'directsMin', internalType: 'uint16', type: 'uint16' },
      { name: 'directsVip1Min', internalType: 'uint16', type: 'uint16' },
      { name: 'teamMin', internalType: 'uint32', type: 'uint32' },
      { name: 'perClaimCents', internalType: 'uint256', type: 'uint256' },
      { name: 'oneTimeCents', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getRedeProgress',
    outputs: [
      { name: 'level', internalType: 'uint8', type: 'uint8' },
      { name: 'claimsMade', internalType: 'uint8', type: 'uint8' },
      { name: 'nextAt', internalType: 'uint64', type: 'uint64' },
      { name: 'open', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserStateView',
    outputs: [
      {
        name: '',
        internalType: 'struct VIPModule.UserStateView',
        type: 'tuple',
        components: [
          { name: 'currentLevel', internalType: 'uint8', type: 'uint8' },
          { name: 'selfBaseCents', internalType: 'uint256', type: 'uint256' },
          { name: 'directsFirst', internalType: 'uint16', type: 'uint16' },
          { name: 'directsVip1', internalType: 'uint16', type: 'uint16' },
          { name: 'teamFirst', internalType: 'uint32', type: 'uint32' },
          { name: 'lastDepositAt', internalType: 'uint64', type: 'uint64' },
          {
            name: 'levelReachedAt',
            internalType: 'uint64[7]',
            type: 'uint64[7]',
          },
          { name: 'oneTimeClaimed', internalType: 'bool[7]', type: 'bool[7]' },
          {
            name: 'vip',
            internalType: 'struct VIPModule.WindowView',
            type: 'tuple',
            components: [
              { name: 'open', internalType: 'bool', type: 'bool' },
              { name: 'level', internalType: 'uint8', type: 'uint8' },
              { name: 'claimsMade', internalType: 'uint8', type: 'uint8' },
              { name: 'startAt', internalType: 'uint64', type: 'uint64' },
              { name: 'nextAt', internalType: 'uint64', type: 'uint64' },
              {
                name: 'redeDirectCount',
                internalType: 'uint16',
                type: 'uint16',
              },
              { name: 'redeTeamCount', internalType: 'uint32', type: 'uint32' },
            ],
          },
          {
            name: 'rede',
            internalType: 'struct VIPModule.WindowView',
            type: 'tuple',
            components: [
              { name: 'open', internalType: 'bool', type: 'bool' },
              { name: 'level', internalType: 'uint8', type: 'uint8' },
              { name: 'claimsMade', internalType: 'uint8', type: 'uint8' },
              { name: 'startAt', internalType: 'uint64', type: 'uint64' },
              { name: 'nextAt', internalType: 'uint64', type: 'uint64' },
              {
                name: 'redeDirectCount',
                internalType: 'uint16',
                type: 'uint16',
              },
              { name: 'redeTeamCount', internalType: 'uint32', type: 'uint32' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getVipEligibility',
    outputs: [
      { name: 'baseCents', internalType: 'uint256', type: 'uint256' },
      { name: 'directs', internalType: 'uint16', type: 'uint16' },
      { name: 'dirVip1', internalType: 'uint16', type: 'uint16' },
      { name: 'team', internalType: 'uint32', type: 'uint32' },
      { name: 'lastDepositAt', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint64', type: 'uint64' },
      { name: '', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getVipEligibilityRede',
    outputs: [
      { name: 'directs', internalType: 'uint16', type: 'uint16' },
      { name: 'dirVip1Zero', internalType: 'uint16', type: 'uint16' },
      { name: 'team', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getVipProgress',
    outputs: [
      { name: 'level', internalType: 'uint8', type: 'uint8' },
      { name: 'claimsMade', internalType: 'uint8', type: 'uint8' },
      { name: 'nextAt', internalType: 'uint64', type: 'uint64' },
      { name: 'open', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'planCents', internalType: 'uint256', type: 'uint256' },
      { name: 'phase', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'onFirstDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'redepositor', internalType: 'address', type: 'address' },
      { name: 'planCents', internalType: 'uint256', type: 'uint256' },
      { name: 'phase', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'onRedeDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'previewRedeLevel',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'recomputeLevel',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'royalty',
    outputs: [
      { name: '', internalType: 'contract AMZGlobalRoyalty', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'setRoyaltyModule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__
 */
export const useReadAmzGlobalRoyalty = /*#__PURE__*/ createUseReadContract({
  abi: amzGlobalRoyaltyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadAmzGlobalRoyaltyDay = /*#__PURE__*/ createUseReadContract({
  abi: amzGlobalRoyaltyAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"MAX_CLAIM_DAYS"`
 */
export const useReadAmzGlobalRoyaltyMaxClaimDays =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'MAX_CLAIM_DAYS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"MAX_MEMBERS_PER_LEVEL"`
 */
export const useReadAmzGlobalRoyaltyMaxMembersPerLevel =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'MAX_MEMBERS_PER_LEVEL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"MAX_VIP_LEVEL"`
 */
export const useReadAmzGlobalRoyaltyMaxVipLevel =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'MAX_VIP_LEVEL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"MISSED_DAYS_THRESHOLD"`
 */
export const useReadAmzGlobalRoyaltyMissedDaysThreshold =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'MISSED_DAYS_THRESHOLD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"activeMembers"`
 */
export const useReadAmzGlobalRoyaltyActiveMembers =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'activeMembers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"amzToken"`
 */
export const useReadAmzGlobalRoyaltyAmzToken =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'amzToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"dailyRoyaltyPool"`
 */
export const useReadAmzGlobalRoyaltyDailyRoyaltyPool =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'dailyRoyaltyPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getActiveMembers"`
 */
export const useReadAmzGlobalRoyaltyGetActiveMembers =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getActiveMembers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getExpectedDailyEarning"`
 */
export const useReadAmzGlobalRoyaltyGetExpectedDailyEarning =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getExpectedDailyEarning',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getLevelStats"`
 */
export const useReadAmzGlobalRoyaltyGetLevelStats =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getLevelStats',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getMemberDetails"`
 */
export const useReadAmzGlobalRoyaltyGetMemberDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getMemberDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getRoyaltyPoolStatus"`
 */
export const useReadAmzGlobalRoyaltyGetRoyaltyPoolStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getRoyaltyPoolStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"getWaitlist"`
 */
export const useReadAmzGlobalRoyaltyGetWaitlist =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'getWaitlist',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"inWaitlist"`
 */
export const useReadAmzGlobalRoyaltyInWaitlist =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'inWaitlist',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"lastDistributionDate"`
 */
export const useReadAmzGlobalRoyaltyLastDistributionDate =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'lastDistributionDate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"lastDistributionTime"`
 */
export const useReadAmzGlobalRoyaltyLastDistributionTime =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'lastDistributionTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"memberActiveLevel"`
 */
export const useReadAmzGlobalRoyaltyMemberActiveLevel =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'memberActiveLevel',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAmzGlobalRoyaltyOwner = /*#__PURE__*/ createUseReadContract(
  { abi: amzGlobalRoyaltyAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"royaltyPool"`
 */
export const useReadAmzGlobalRoyaltyRoyaltyPool =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'royaltyPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"usdt"`
 */
export const useReadAmzGlobalRoyaltyUsdt = /*#__PURE__*/ createUseReadContract({
  abi: amzGlobalRoyaltyAbi,
  functionName: 'usdt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"vipModule"`
 */
export const useReadAmzGlobalRoyaltyVipModule =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'vipModule',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"vipPercentages"`
 */
export const useReadAmzGlobalRoyaltyVipPercentages =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'vipPercentages',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"waitlist"`
 */
export const useReadAmzGlobalRoyaltyWaitlist =
  /*#__PURE__*/ createUseReadContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'waitlist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__
 */
export const useWriteAmzGlobalRoyalty = /*#__PURE__*/ createUseWriteContract({
  abi: amzGlobalRoyaltyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"depositRoyalty"`
 */
export const useWriteAmzGlobalRoyaltyDepositRoyalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'depositRoyalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"distributeDailyRoyalty"`
 */
export const useWriteAmzGlobalRoyaltyDistributeDailyRoyalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'distributeDailyRoyalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"manualCleanup"`
 */
export const useWriteAmzGlobalRoyaltyManualCleanup =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'manualCleanup',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"registerVIPMember"`
 */
export const useWriteAmzGlobalRoyaltyRegisterVipMember =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'registerVIPMember',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__
 */
export const useSimulateAmzGlobalRoyalty =
  /*#__PURE__*/ createUseSimulateContract({ abi: amzGlobalRoyaltyAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"depositRoyalty"`
 */
export const useSimulateAmzGlobalRoyaltyDepositRoyalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'depositRoyalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"distributeDailyRoyalty"`
 */
export const useSimulateAmzGlobalRoyaltyDistributeDailyRoyalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'distributeDailyRoyalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"manualCleanup"`
 */
export const useSimulateAmzGlobalRoyaltyManualCleanup =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'manualCleanup',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `functionName` set to `"registerVIPMember"`
 */
export const useSimulateAmzGlobalRoyaltyRegisterVipMember =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzGlobalRoyaltyAbi,
    functionName: 'registerVIPMember',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__
 */
export const useWatchAmzGlobalRoyaltyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: amzGlobalRoyaltyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"AddedToWaitlist"`
 */
export const useWatchAmzGlobalRoyaltyAddedToWaitlistEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'AddedToWaitlist',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"DailyDistributed"`
 */
export const useWatchAmzGlobalRoyaltyDailyDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'DailyDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"LevelDistributed"`
 */
export const useWatchAmzGlobalRoyaltyLevelDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'LevelDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"MemberAdded"`
 */
export const useWatchAmzGlobalRoyaltyMemberAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'MemberAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"MemberRemoved"`
 */
export const useWatchAmzGlobalRoyaltyMemberRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'MemberRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"MemberReplaced"`
 */
export const useWatchAmzGlobalRoyaltyMemberReplacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'MemberReplaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"RoyaltyDeposited"`
 */
export const useWatchAmzGlobalRoyaltyRoyaltyDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'RoyaltyDeposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzGlobalRoyaltyAbi}__ and `eventName` set to `"VIPUpgraded"`
 */
export const useWatchAmzGlobalRoyaltyVipUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzGlobalRoyaltyAbi,
    eventName: 'VIPUpgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__
 */
export const useReadAmzToken = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadAmzTokenDay = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"DEEP_REF_WINDOW"`
 */
export const useReadAmzTokenDeepRefWindow = /*#__PURE__*/ createUseReadContract(
  { abi: amzTokenAbi, functionName: 'DEEP_REF_WINDOW' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"EARLY_DEPOSIT_WINDOW"`
 */
export const useReadAmzTokenEarlyDepositWindow =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'EARLY_DEPOSIT_WINDOW',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"MAX_CYCLES_PER_PHASE"`
 */
export const useReadAmzTokenMaxCyclesPerPhase =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'MAX_CYCLES_PER_PHASE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"MAX_PAYOUTS"`
 */
export const useReadAmzTokenMaxPayouts = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'MAX_PAYOUTS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"MAX_TOTAL_CLAIMS"`
 */
export const useReadAmzTokenMaxTotalClaims =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'MAX_TOTAL_CLAIMS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"MAX_UPLINE_DEPTH"`
 */
export const useReadAmzTokenMaxUplineDepth =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'MAX_UPLINE_DEPTH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadAmzTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAmzTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimFeeBps"`
 */
export const useReadAmzTokenClaimFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'claimFeeBps',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimHistoryLength"`
 */
export const useReadAmzTokenClaimHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'claimHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimsBlocked"`
 */
export const useReadAmzTokenClaimsBlocked = /*#__PURE__*/ createUseReadContract(
  { abi: amzTokenAbi, functionName: 'claimsBlocked' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadAmzTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"depositHistoryLength"`
 */
export const useReadAmzTokenDepositHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'depositHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"directRefPercent"`
 */
export const useReadAmzTokenDirectRefPercent =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'directRefPercent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getClaimBlockers"`
 */
export const useReadAmzTokenGetClaimBlockers =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getClaimBlockers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getClaimHistory"`
 */
export const useReadAmzTokenGetClaimHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getClaimHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getDeepReferralStatus"`
 */
export const useReadAmzTokenGetDeepReferralStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getDeepReferralStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getDepositHistory"`
 */
export const useReadAmzTokenGetDepositHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getDepositHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getReferralClaimHistory"`
 */
export const useReadAmzTokenGetReferralClaimHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getReferralClaimHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getReferralInfo"`
 */
export const useReadAmzTokenGetReferralInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getReferralInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getRoyaltyClaimHistory"`
 */
export const useReadAmzTokenGetRoyaltyClaimHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getRoyaltyClaimHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getSellHistory"`
 */
export const useReadAmzTokenGetSellHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getSellHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getUser"`
 */
export const useReadAmzTokenGetUser = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'getUser',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getVIPClaimHistory"`
 */
export const useReadAmzTokenGetVipClaimHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getVIPClaimHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getVipEligibility"`
 */
export const useReadAmzTokenGetVipEligibility =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getVipEligibility',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getVipEligibilityRede"`
 */
export const useReadAmzTokenGetVipEligibilityRede =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getVipEligibilityRede',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getWithdrawHistory"`
 */
export const useReadAmzTokenGetWithdrawHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getWithdrawHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"getWithdrawInfo"`
 */
export const useReadAmzTokenGetWithdrawInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'getWithdrawInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"isAllowedPlan"`
 */
export const useReadAmzTokenIsAllowedPlan = /*#__PURE__*/ createUseReadContract(
  { abi: amzTokenAbi, functionName: 'isAllowedPlan' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"l2RefPercent"`
 */
export const useReadAmzTokenL2RefPercent = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'l2RefPercent',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"l3RefPercent"`
 */
export const useReadAmzTokenL3RefPercent = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'l3RefPercent',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"maxPayout"`
 */
export const useReadAmzTokenMaxPayout = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'maxPayout',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadAmzTokenName = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"nextClaimAtOf"`
 */
export const useReadAmzTokenNextClaimAtOf = /*#__PURE__*/ createUseReadContract(
  { abi: amzTokenAbi, functionName: 'nextClaimAtOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"pendingAllRewardsTokens"`
 */
export const useReadAmzTokenPendingAllRewardsTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'pendingAllRewardsTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"pendingPhaseRewardTokens"`
 */
export const useReadAmzTokenPendingPhaseRewardTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'pendingPhaseRewardTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"priceInCentsPerToken"`
 */
export const useReadAmzTokenPriceInCentsPerToken =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'priceInCentsPerToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"refClaimFeeBps"`
 */
export const useReadAmzTokenRefClaimFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'refClaimFeeBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"referralClaimHistoryLength"`
 */
export const useReadAmzTokenReferralClaimHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'referralClaimHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"referrerOf"`
 */
export const useReadAmzTokenReferrerOf = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'referrerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"rewardPeriod"`
 */
export const useReadAmzTokenRewardPeriod = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'rewardPeriod',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"royaltyClaimHistoryLength"`
 */
export const useReadAmzTokenRoyaltyClaimHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'royaltyClaimHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"royaltyModule"`
 */
export const useReadAmzTokenRoyaltyModule = /*#__PURE__*/ createUseReadContract(
  { abi: amzTokenAbi, functionName: 'royaltyModule' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"sellAdminFeeBps"`
 */
export const useReadAmzTokenSellAdminFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'sellAdminFeeBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"sellFeeBps"`
 */
export const useReadAmzTokenSellFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'sellFeeBps',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"sellHistoryLength"`
 */
export const useReadAmzTokenSellHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'sellHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAmzTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAmzTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"treasury"`
 */
export const useReadAmzTokenTreasury = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"usdt"`
 */
export const useReadAmzTokenUsdt = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'usdt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"usdtDecimals"`
 */
export const useReadAmzTokenUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'usdtDecimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"vipClaimHistoryLength"`
 */
export const useReadAmzTokenVipClaimHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'vipClaimHistoryLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"vipModule"`
 */
export const useReadAmzTokenVipModule = /*#__PURE__*/ createUseReadContract({
  abi: amzTokenAbi,
  functionName: 'vipModule',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"withdrawHistoryLength"`
 */
export const useReadAmzTokenWithdrawHistoryLength =
  /*#__PURE__*/ createUseReadContract({
    abi: amzTokenAbi,
    functionName: 'withdrawHistoryLength',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__
 */
export const useWriteAmzToken = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"addDirectVip1"`
 */
export const useWriteAmzTokenAddDirectVip1 =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'addDirectVip1',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"addRoyaltyHistory"`
 */
export const useWriteAmzTokenAddRoyaltyHistory =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'addRoyaltyHistory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAmzTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimAll"`
 */
export const useWriteAmzTokenClaimAll = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimReferral"`
 */
export const useWriteAmzTokenClaimReferral =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'claimReferral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"creditVipCents"`
 */
export const useWriteAmzTokenCreditVipCents =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'creditVipCents',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteAmzTokenDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"sell"`
 */
export const useWriteAmzTokenSell = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
  functionName: 'sell',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"setRoyaltyModule"`
 */
export const useWriteAmzTokenSetRoyaltyModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'setRoyaltyModule',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"setVipModule"`
 */
export const useWriteAmzTokenSetVipModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'setVipModule',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteAmzTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: amzTokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAmzTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: amzTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__
 */
export const useSimulateAmzToken = /*#__PURE__*/ createUseSimulateContract({
  abi: amzTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"addDirectVip1"`
 */
export const useSimulateAmzTokenAddDirectVip1 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'addDirectVip1',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"addRoyaltyHistory"`
 */
export const useSimulateAmzTokenAddRoyaltyHistory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'addRoyaltyHistory',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAmzTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimAll"`
 */
export const useSimulateAmzTokenClaimAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'claimAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"claimReferral"`
 */
export const useSimulateAmzTokenClaimReferral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'claimReferral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"creditVipCents"`
 */
export const useSimulateAmzTokenCreditVipCents =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'creditVipCents',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateAmzTokenDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"sell"`
 */
export const useSimulateAmzTokenSell = /*#__PURE__*/ createUseSimulateContract({
  abi: amzTokenAbi,
  functionName: 'sell',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"setRoyaltyModule"`
 */
export const useSimulateAmzTokenSetRoyaltyModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'setRoyaltyModule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"setVipModule"`
 */
export const useSimulateAmzTokenSetVipModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'setVipModule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateAmzTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link amzTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAmzTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: amzTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__
 */
export const useWatchAmzTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: amzTokenAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAmzTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchAmzTokenClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'Claim',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"DepositMade"`
 */
export const useWatchAmzTokenDepositMadeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'DepositMade',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"ReferrerSet"`
 */
export const useWatchAmzTokenReferrerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'ReferrerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"Sold"`
 */
export const useWatchAmzTokenSoldEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'Sold',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"TeamLinked"`
 */
export const useWatchAmzTokenTeamLinkedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'TeamLinked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAmzTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"VIPAchieved"`
 */
export const useWatchAmzTokenVipAchievedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'VIPAchieved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"VIPClaimed"`
 */
export const useWatchAmzTokenVipClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'VIPClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"VIPUpgrade1Counted"`
 */
export const useWatchAmzTokenVipUpgrade1CountedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'VIPUpgrade1Counted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link amzTokenAbi}__ and `eventName` set to `"WithdrawClaimed"`
 */
export const useWatchAmzTokenWithdrawClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: amzTokenAbi,
    eventName: 'WithdrawClaimed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__
 */
export const useReadIamzCore = /*#__PURE__*/ createUseReadContract({
  abi: iamzCoreAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"claimsBlocked"`
 */
export const useReadIamzCoreClaimsBlocked = /*#__PURE__*/ createUseReadContract(
  { abi: iamzCoreAbi, functionName: 'claimsBlocked' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"getUser"`
 */
export const useReadIamzCoreGetUser = /*#__PURE__*/ createUseReadContract({
  abi: iamzCoreAbi,
  functionName: 'getUser',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"maxPayout"`
 */
export const useReadIamzCoreMaxPayout = /*#__PURE__*/ createUseReadContract({
  abi: iamzCoreAbi,
  functionName: 'maxPayout',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"referrerOf"`
 */
export const useReadIamzCoreReferrerOf = /*#__PURE__*/ createUseReadContract({
  abi: iamzCoreAbi,
  functionName: 'referrerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"rewardPeriod"`
 */
export const useReadIamzCoreRewardPeriod = /*#__PURE__*/ createUseReadContract({
  abi: iamzCoreAbi,
  functionName: 'rewardPeriod',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iamzCoreAbi}__
 */
export const useWriteIamzCore = /*#__PURE__*/ createUseWriteContract({
  abi: iamzCoreAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"addDirectVip1"`
 */
export const useWriteIamzCoreAddDirectVip1 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iamzCoreAbi,
    functionName: 'addDirectVip1',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"addRoyaltyHistory"`
 */
export const useWriteIamzCoreAddRoyaltyHistory =
  /*#__PURE__*/ createUseWriteContract({
    abi: iamzCoreAbi,
    functionName: 'addRoyaltyHistory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"creditVipCents"`
 */
export const useWriteIamzCoreCreditVipCents =
  /*#__PURE__*/ createUseWriteContract({
    abi: iamzCoreAbi,
    functionName: 'creditVipCents',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iamzCoreAbi}__
 */
export const useSimulateIamzCore = /*#__PURE__*/ createUseSimulateContract({
  abi: iamzCoreAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"addDirectVip1"`
 */
export const useSimulateIamzCoreAddDirectVip1 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iamzCoreAbi,
    functionName: 'addDirectVip1',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"addRoyaltyHistory"`
 */
export const useSimulateIamzCoreAddRoyaltyHistory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iamzCoreAbi,
    functionName: 'addRoyaltyHistory',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iamzCoreAbi}__ and `functionName` set to `"creditVipCents"`
 */
export const useSimulateIamzCoreCreditVipCents =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iamzCoreAbi,
    functionName: 'creditVipCents',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useReadIerc1363 = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc1363Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc1363BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc1363SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1363Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc1363TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useWriteIerc1363 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc1363Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approveAndCall"`
 */
export const useWriteIerc1363ApproveAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc1363Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferAndCall"`
 */
export const useWriteIerc1363TransferAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc1363TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useWriteIerc1363TransferFromAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useSimulateIerc1363 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc1363Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approveAndCall"`
 */
export const useSimulateIerc1363ApproveAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc1363Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferAndCall"`
 */
export const useSimulateIerc1363TransferAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc1363TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useSimulateIerc1363TransferFromAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useWatchIerc1363Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc1363ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1363Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc1363TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1363Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const useReadIerc165 = /*#__PURE__*/ createUseReadContract({
  abi: ierc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useReadIerc20 = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWriteIerc20 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useSimulateIerc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: ierc20Abi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__
 */
export const useWatchIerc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useReadLock = /*#__PURE__*/ createUseReadContract({ abi: lockAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLockOwner = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"unlockTime"`
 */
export const useReadLockUnlockTime = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'unlockTime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useWriteLock = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLockWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useSimulateLock = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLockWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__
 */
export const useWatchLockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchLockWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lockAbi,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__
 */
export const useReadPausable = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPausablePaused = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__
 */
export const useWatchPausableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPausablePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPausableUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__
 */
export const useReadTreasury = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"beneficiaries"`
 */
export const useReadTreasuryBeneficiaries = /*#__PURE__*/ createUseReadContract(
  { abi: treasuryAbi, functionName: 'beneficiaries' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getBeneficiaries"`
 */
export const useReadTreasuryGetBeneficiaries =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    functionName: 'getBeneficiaries',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"getBeneficiaryCount"`
 */
export const useReadTreasuryGetBeneficiaryCount =
  /*#__PURE__*/ createUseReadContract({
    abi: treasuryAbi,
    functionName: 'getBeneficiaryCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTreasuryOwner = /*#__PURE__*/ createUseReadContract({
  abi: treasuryAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__
 */
export const useWriteTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"addBeneficiary"`
 */
export const useWriteTreasuryAddBeneficiary =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    functionName: 'addBeneficiary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"distribute"`
 */
export const useWriteTreasuryDistribute = /*#__PURE__*/ createUseWriteContract({
  abi: treasuryAbi,
  functionName: 'distribute',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"distributeNative"`
 */
export const useWriteTreasuryDistributeNative =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    functionName: 'distributeNative',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"removeBeneficiary"`
 */
export const useWriteTreasuryRemoveBeneficiary =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    functionName: 'removeBeneficiary',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTreasuryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: treasuryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__
 */
export const useSimulateTreasury = /*#__PURE__*/ createUseSimulateContract({
  abi: treasuryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"addBeneficiary"`
 */
export const useSimulateTreasuryAddBeneficiary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'addBeneficiary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"distribute"`
 */
export const useSimulateTreasuryDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"distributeNative"`
 */
export const useSimulateTreasuryDistributeNative =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'distributeNative',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"removeBeneficiary"`
 */
export const useSimulateTreasuryRemoveBeneficiary =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'removeBeneficiary',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTreasuryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link treasuryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTreasuryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: treasuryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__
 */
export const useWatchTreasuryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: treasuryAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"BeneficiaryAdded"`
 */
export const useWatchTreasuryBeneficiaryAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    eventName: 'BeneficiaryAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"BeneficiaryRemoved"`
 */
export const useWatchTreasuryBeneficiaryRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    eventName: 'BeneficiaryRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"BeneficiaryUpdated"`
 */
export const useWatchTreasuryBeneficiaryUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    eventName: 'BeneficiaryUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTreasuryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link treasuryAbi}__ and `eventName` set to `"TokensDistributed"`
 */
export const useWatchTreasuryTokensDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: treasuryAbi,
    eventName: 'TokensDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__
 */
export const useReadUsdtMock = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadUsdtMockAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadUsdtMockBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadUsdtMockDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"name"`
 */
export const useReadUsdtMockName = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadUsdtMockSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadUsdtMockTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtMockAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtMockAbi}__
 */
export const useWriteUsdtMock = /*#__PURE__*/ createUseWriteContract({
  abi: usdtMockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteUsdtMockApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtMockAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteUsdtMockMint = /*#__PURE__*/ createUseWriteContract({
  abi: usdtMockAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteUsdtMockTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtMockAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteUsdtMockTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtMockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtMockAbi}__
 */
export const useSimulateUsdtMock = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtMockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateUsdtMockApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtMockAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateUsdtMockMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtMockAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateUsdtMockTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtMockAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtMockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateUsdtMockTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtMockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtMockAbi}__
 */
export const useWatchUsdtMockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtMockAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtMockAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchUsdtMockApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtMockAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtMockAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchUsdtMockTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtMockAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__
 */
export const useReadVipModule = /*#__PURE__*/ createUseReadContract({
  abi: vipModuleAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"MAX_UPLINE_DEPTH"`
 */
export const useReadVipModuleMaxUplineDepth =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'MAX_UPLINE_DEPTH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"core"`
 */
export const useReadVipModuleCore = /*#__PURE__*/ createUseReadContract({
  abi: vipModuleAbi,
  functionName: 'core',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"currentTrack"`
 */
export const useReadVipModuleCurrentTrack = /*#__PURE__*/ createUseReadContract(
  { abi: vipModuleAbi, functionName: 'currentTrack' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getAllLevelTables"`
 */
export const useReadVipModuleGetAllLevelTables =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getAllLevelTables',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getClaimableCents"`
 */
export const useReadVipModuleGetClaimableCents =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getClaimableCents',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getLevelConfig"`
 */
export const useReadVipModuleGetLevelConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getLevelConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getRedeProgress"`
 */
export const useReadVipModuleGetRedeProgress =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getRedeProgress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getUserStateView"`
 */
export const useReadVipModuleGetUserStateView =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getUserStateView',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getVipEligibility"`
 */
export const useReadVipModuleGetVipEligibility =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getVipEligibility',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getVipEligibilityRede"`
 */
export const useReadVipModuleGetVipEligibilityRede =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getVipEligibilityRede',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"getVipProgress"`
 */
export const useReadVipModuleGetVipProgress =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'getVipProgress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"previewRedeLevel"`
 */
export const useReadVipModulePreviewRedeLevel =
  /*#__PURE__*/ createUseReadContract({
    abi: vipModuleAbi,
    functionName: 'previewRedeLevel',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"royalty"`
 */
export const useReadVipModuleRoyalty = /*#__PURE__*/ createUseReadContract({
  abi: vipModuleAbi,
  functionName: 'royalty',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__
 */
export const useWriteVipModule = /*#__PURE__*/ createUseWriteContract({
  abi: vipModuleAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteVipModuleClaim = /*#__PURE__*/ createUseWriteContract({
  abi: vipModuleAbi,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"onFirstDeposit"`
 */
export const useWriteVipModuleOnFirstDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: vipModuleAbi,
    functionName: 'onFirstDeposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"onRedeDeposit"`
 */
export const useWriteVipModuleOnRedeDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: vipModuleAbi,
    functionName: 'onRedeDeposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"recomputeLevel"`
 */
export const useWriteVipModuleRecomputeLevel =
  /*#__PURE__*/ createUseWriteContract({
    abi: vipModuleAbi,
    functionName: 'recomputeLevel',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"setRoyaltyModule"`
 */
export const useWriteVipModuleSetRoyaltyModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: vipModuleAbi,
    functionName: 'setRoyaltyModule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__
 */
export const useSimulateVipModule = /*#__PURE__*/ createUseSimulateContract({
  abi: vipModuleAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateVipModuleClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vipModuleAbi,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"onFirstDeposit"`
 */
export const useSimulateVipModuleOnFirstDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vipModuleAbi,
    functionName: 'onFirstDeposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"onRedeDeposit"`
 */
export const useSimulateVipModuleOnRedeDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vipModuleAbi,
    functionName: 'onRedeDeposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"recomputeLevel"`
 */
export const useSimulateVipModuleRecomputeLevel =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vipModuleAbi,
    functionName: 'recomputeLevel',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vipModuleAbi}__ and `functionName` set to `"setRoyaltyModule"`
 */
export const useSimulateVipModuleSetRoyaltyModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vipModuleAbi,
    functionName: 'setRoyaltyModule',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__
 */
export const useWatchVipModuleEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: vipModuleAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"ClaimCredit"`
 */
export const useWatchVipModuleClaimCreditEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'ClaimCredit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"CloseRedeWindow"`
 */
export const useWatchVipModuleCloseRedeWindowEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'CloseRedeWindow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"CloseVipWindow"`
 */
export const useWatchVipModuleCloseVipWindowEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'CloseVipWindow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"LevelUp"`
 */
export const useWatchVipModuleLevelUpEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'LevelUp',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"OpenRedeWindow"`
 */
export const useWatchVipModuleOpenRedeWindowEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'OpenRedeWindow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"OpenVipWindow"`
 */
export const useWatchVipModuleOpenVipWindowEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'OpenVipWindow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link vipModuleAbi}__ and `eventName` set to `"RedeCounted"`
 */
export const useWatchVipModuleRedeCountedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: vipModuleAbi,
    eventName: 'RedeCounted',
  })
