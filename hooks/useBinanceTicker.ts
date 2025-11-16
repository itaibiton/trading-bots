/**
 * Binance Real-Time Ticker Hook
 *
 * Connects to Binance WebSocket API for real-time cryptocurrency price updates
 * Displays top 10 cryptocurrencies by market cap with live prices, 24h changes, and sparklines
 */

'use client';

import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export interface TickerData {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  volume: string;
  quoteVolume: string;
  sparkline: number[];
}

const SYMBOLS = [
  'BTCUSDT',   // Bitcoin
  'ETHUSDT',   // Ethereum
  'BNBUSDT',   // Binance Coin
  'SOLUSDT',   // Solana
  'XRPUSDT',   // Ripple
  'ADAUSDT',   // Cardano
  'DOGEUSDT',  // Dogecoin
  'AVAXUSDT',  // Avalanche
  'DOTUSDT',   // Polkadot
  'MATICUSDT', // Polygon
];

export function useBinanceTicker() {
  const [tickers, setTickers] = useState<Map<string, TickerData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build combined stream URL for all symbols
  const streams = SYMBOLS.map(s => `${s.toLowerCase()}@ticker`).join('/');
  const socketUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

  // WebSocket connection with automatic reconnection
  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true, // Always reconnect
    reconnectAttempts: 20,
    reconnectInterval: (attemptNumber) =>
      Math.min(1000 * 2 ** attemptNumber, 10000), // Exponential backoff, max 10s
    retryOnError: true,
    onOpen: () => {
      console.log('Binance WebSocket connected');
      setLoading(false);
      setError(null);
    },
    onClose: () => {
      console.log('Binance WebSocket closed');
    },
    onError: (event) => {
      console.error('Binance WebSocket error:', event);
      setError('WebSocket connection failed');
    },
  });

  // Fetch initial sparkline data from REST API (24h hourly candles)
  useEffect(() => {
    const fetchSparklines = async () => {
      try {
        const sparklinePromises = SYMBOLS.map(async (symbol) => {
          const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch sparkline for ${symbol}`);
          }

          const data = await response.json();
          return {
            symbol,
            // Extract closing prices from kline data
            sparkline: data.map((candle: any[]) => parseFloat(candle[4]))
          };
        });

        const results = await Promise.all(sparklinePromises);

        setTickers(prev => {
          const updated = new Map(prev);
          results.forEach(({ symbol, sparkline }) => {
            const existing = updated.get(symbol) || {
              symbol,
              price: '0',
              priceChange: '0',
              priceChangePercent: '0',
              volume: '0',
              quoteVolume: '0',
              sparkline: []
            };
            updated.set(symbol, { ...existing, sparkline });
          });
          return updated;
        });
      } catch (err) {
        console.error('Error fetching sparkline data:', err);
        setError('Failed to load historical price data');
      }
    };

    fetchSparklines();
  }, []);

  // Process WebSocket messages for real-time updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.data);
        const ticker = message.data;

        if (ticker && ticker.e === '24hrTicker') {
          setTickers(prev => {
            const updated = new Map(prev);
            const existing = updated.get(ticker.s) || {
              symbol: ticker.s,
              price: '0',
              priceChange: '0',
              priceChangePercent: '0',
              volume: '0',
              quoteVolume: '0',
              sparkline: []
            };

            // Update sparkline with new price (keep last 24 points)
            const newSparkline = [...existing.sparkline, parseFloat(ticker.c)].slice(-24);

            updated.set(ticker.s, {
              symbol: ticker.s,
              price: ticker.c,               // Last price
              priceChange: ticker.p,         // Price change
              priceChangePercent: ticker.P,  // Price change percent
              volume: ticker.v,              // Base volume
              quoteVolume: ticker.q,         // Quote volume (USD)
              sparkline: newSparkline
            });

            return updated;
          });
        }
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    }
  }, [lastMessage]);

  // Connection status
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Disconnected',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    tickers: Array.from(tickers.values()).sort((a, b) => {
      // Sort by original SYMBOLS order
      return SYMBOLS.indexOf(a.symbol) - SYMBOLS.indexOf(b.symbol);
    }),
    loading,
    error,
    connectionStatus,
    isConnected: readyState === ReadyState.OPEN,
  };
}
