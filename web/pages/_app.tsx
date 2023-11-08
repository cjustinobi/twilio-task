import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppHeader from '@/components/layout/Header'
import AppFooter from '@/components/layout/Footer'

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
<QueryClientProvider client={queryClient}>
    <AppHeader />
    <Component {...pageProps} />
    <AppFooter />
  </QueryClientProvider>
  )
}
