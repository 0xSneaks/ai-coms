import type { Asset } from '../config/pairs';
import { PAIRS } from '../config/pairs';

const PATH: Record<Asset, string> = {
  BTC: '<path fill="currentColor" d="M11.2 12.6c1.7.4 2.6 1.1 2.6 2.5 0 1.7-1.3 2.5-3.4 2.6V20h-1.7v-2.2H7.3V16h1.4v-3.2H7.4v-1.8h1.3V9h1.7v1.9c1.8.1 3.1.8 3.1 2.3 0 1-.6 1.7-1.8 1.9v.1zm-1.7-1.4v2.3c1.3 0 2.2-.3 2.2-1.2 0-.8-.7-1.1-2.2-1.1zm0 5.4c1.6.1 2.6-.3 2.6-1.4 0-.9-.8-1.3-2.6-1.3v2.7z"/>',
  ETH: '<path fill="currentColor" d="M12 3.4 7.2 12.1 12 15l4.8-2.9L12 3.4zm0 17.2-4.8-6.7L12 16.8l4.8-2.9L12 20.6z"/>',
  SOL: '<path fill="currentColor" d="M7.2 14.8c.1-.1.3-.2.5-.2h9.6c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H5.9c-.3 0-.5-.4-.3-.6l1.6-1.5zm0-7.2c.1-.1.3-.2.5-.2h9.6c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H5.9c-.3 0-.5-.4-.3-.6L7.2 7.6zM16.8 11.2c-.1-.1-.3-.2-.5-.2H6.7c-.3 0-.5.4-.3.6l1.5 1.5c.1.1.3.2.5.2h9.7c.3 0 .5-.4.3-.6l-1.6-1.5z"/>',
  ZEC: '<path fill="currentColor" d="M8 7.2h8v1.8h-2.6l-3.5 6h3.3V16.8H8v-1.8h2.6l3.5-6H10.8V7.2z"/>',
  XRP: '<path fill="currentColor" d="M7.2 8.2 9.8 12 7.2 15.8h2.2L12 12.8l2.6 3h2.2L14.2 12l2.6-3.8h-2.2L12 11.2 9.4 8.2H7.2z"/>',
  NEAR: '<path fill="currentColor" d="M8.4 6.5 15.2 17c.2.3.7.1.7-.3V6.8h1.7v10.7c0 1.2-1.4 1.9-2.4 1.2L8.4 8.4c-.2-.3-.7-.1-.7.3v9.7H6V7.7c0-1.2 1.4-1.9 2.4-1.2z"/>',
  HYPE: '<path fill="currentColor" d="M8 7a4 4 0 0 1 4-2 4 4 0 0 1 4 2c1.4 1.2 2 3 2 5.2 0 3.4-2.2 6.3-6 8.3-3.8-2-6-4.9-6-8.3C6 10 6.6 8.2 8 7zm4 1.2c-2.8 0-4.5 1.9-4.5 4.2S9.2 16.6 12 18c2.8-1.4 4.5-3.4 4.5-5.6S14.8 8.2 12 8.2z"/>',
  DOGE: '<path fill="currentColor" d="M10 6.5h2.4c3.3 0 5.4 2 5.4 5.5S15.7 17.5 12.4 17.5H10V6.5zm2.3 9.2c2.1 0 3.5-1.3 3.5-3.7 0-2.5-1.4-3.7-3.5-3.7H11.7v7.4h.6z"/>',
  BNB: '<path fill="currentColor" d="M12 5.2 8.8 8.4l-1.8-1.8L12 1.6l4.9 5 1.9-1.9L12 5.2zm-6.5 8.8L3.7 12l1.8-1.8L7.3 12l-1.8 2zm6.5 6.8-3.2-3.2-1.8 1.8L12 22.4l5-5 1.8 1.8L12 20.8zM18.7 14l-1.8-1.8L18.7 10 20.5 12 18.7 14zM12 9.1 14.9 12 12 14.9 9.1 12 12 9.1z"/>',
};

export function assetGlyph(asset: Asset, size = 28): string {
  const color = PAIRS[asset].color;
  return `<span class="glyph" style="--g:${color};width:${size}px;height:${size}px" aria-hidden="true"><svg viewBox="0 0 24 24" width="${size * 0.72}" height="${size * 0.72}">${PATH[asset]}</svg></span>`;
}
