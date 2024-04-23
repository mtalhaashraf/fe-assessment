
import { ProductsGrid } from "@/components/ProductsGrid";
import { fetchProducts } from "@/hooks";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ProductsGrid />
    </main>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
