import Layout from "@/app/components/Layout";
import "../app/globals.css";
import OrderProvider from "@/app/features/order/OrderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { Roboto } from "next/font/google";
import { AppProps } from "next/app";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <OrderProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </OrderProvider>
      </QueryClientProvider>
    </main>
  );
}
