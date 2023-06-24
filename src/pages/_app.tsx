import Layout from "@/components/Layout";
import "../app/globals.css";
import OrderProvider from "@/features/order/OrderProvider";

export default function App({ Component, pageProps }: any) {
  return (
    <OrderProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderProvider>
  );
}
