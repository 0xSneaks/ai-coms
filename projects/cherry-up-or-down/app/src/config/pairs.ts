export const ASSETS = [
  'BTC',
  'ETH',
  'SOL',
  'ZEC',
  'XRP',
  'NEAR',
  'HYPE',
  'DOGE',
  'BNB',
] as const;

export type Asset = (typeof ASSETS)[number];

export const HUB_CARD_ORDER: Asset[] = [
  'BTC',
  'ETH',
  'SOL',
  'ZEC',
  'XRP',
  'NEAR',
  'HYPE',
  'DOGE',
  'BNB',
];

/** Official Pyth USD spot feed IDs (hex, no 0x), confirmed via Hermes catalog 2026-11-19. */
export type PairConfig = {
  id: Asset;
  symbol: string;
  appName: string;
  pythId: string;
  color: string;
  colorSoft: string;
  decimals: number;
  /** Offline mock seed only — not a live quote and not Kalshi data. */
  mockSeed: number;
};

export const PAIRS: Record<Asset, PairConfig> = {
  BTC: {
    id: 'BTC',
    symbol: 'BTC',
    appName: 'BTC Up or Down',
    pythId: 'e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    color: '#F5A023',
    colorSoft: 'rgba(245,160,35,0.35)',
    decimals: 2,
    mockSeed: 61500,
  },
  ETH: {
    id: 'ETH',
    symbol: 'ETH',
    appName: 'ETH Up or Down',
    pythId: 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    color: '#8B8CFF',
    colorSoft: 'rgba(139,140,255,0.35)',
    decimals: 2,
    mockSeed: 1720,
  },
  SOL: {
    id: 'SOL',
    symbol: 'SOL',
    appName: 'SOL Up or Down',
    pythId: 'ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    color: '#C14BFF',
    colorSoft: 'rgba(193,75,255,0.35)',
    decimals: 4,
    mockSeed: 72,
  },
  ZEC: {
    id: 'ZEC',
    symbol: 'ZEC',
    appName: 'ZEC Up or Down',
    pythId: 'be9b59d178f0d6a97ab4c343bff2aa69caa1eaae3e9048a65788c529b125bb24',
    color: '#F4B728',
    colorSoft: 'rgba(244,183,40,0.35)',
    decimals: 4,
    mockSeed: 848,
  },
  XRP: {
    id: 'XRP',
    symbol: 'XRP',
    appName: 'XRP Up or Down',
    pythId: 'ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
    color: '#00C2F0',
    colorSoft: 'rgba(0,194,240,0.35)',
    decimals: 4,
    mockSeed: 0.96,
  },
  NEAR: {
    id: 'NEAR',
    symbol: 'NEAR',
    appName: 'NEAR Up or Down',
    pythId: 'c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750',
    color: '#00E0A4',
    colorSoft: 'rgba(0,224,164,0.35)',
    decimals: 4,
    mockSeed: 3.02,
  },
  HYPE: {
    id: 'HYPE',
    symbol: 'HYPE',
    appName: 'HYPE Up or Down',
    pythId: '4279e31cc369bbcc2faf022b382b080e32a8e689ff20fbc530d2a603eb6cd98b',
    color: '#2EE6A6',
    colorSoft: 'rgba(46,230,166,0.35)',
    decimals: 4,
    mockSeed: 65,
  },
  DOGE: {
    id: 'DOGE',
    symbol: 'DOGE',
    appName: 'DOGE Up or Down',
    pythId: 'dcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
    color: '#C2A633',
    colorSoft: 'rgba(194,166,51,0.35)',
    decimals: 8,
    mockSeed: 0.057,
  },
  BNB: {
    id: 'BNB',
    symbol: 'BNB',
    appName: 'BNB Up or Down',
    pythId: '2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
    color: '#F0B90B',
    colorSoft: 'rgba(240,185,11,0.35)',
    decimals: 2,
    mockSeed: 568,
  },
};

export function isAsset(value: string): value is Asset {
  return (ASSETS as readonly string[]).includes(value);
}

export function formatPrice(asset: Asset, price: number): string {
  const d = PAIRS[asset].decimals;
  return price.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

export function formatUsd(asset: Asset, price: number): string {
  return `$${formatPrice(asset, price)}`;
}
