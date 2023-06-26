import Layout from "@/app/components/Layout";
import "../app/globals.css";
import OrderProvider from "@/app/features/order/OrderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </OrderProvider>
    </QueryClientProvider>
  );
}
