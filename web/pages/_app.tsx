
import type { AppProps } from 'next/app'
import {getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "viem/chains"
import { publicProvider } from 'wagmi/providers/public'
import '@/styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css"
import AppHeader from '@/components/layout/Header'
import AppFooter from '@/components/layout/Footer'

import { QueryClient, QueryClientProvider } from 'react-query';

const projectId = process.env.NEXT_PUBLIC_PROJECTID as string // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
  
const { connectors } = getDefaultWallets({
  appName: 'EventHub',
  projectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <AppHeader />
          <Component {...pageProps} />
          <AppFooter />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
