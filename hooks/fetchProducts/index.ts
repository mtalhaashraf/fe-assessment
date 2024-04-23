import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({ pageParam }: { pageParam: number }) => {
  const pageLimit = 20;
  const skip = (pageParam - 1) * pageLimit;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${pageLimit}&skip=${skip}`
  );

  return response.json();
};

const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.skip + 20 >= lastPage.total) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};

export { fetchProducts, useProducts };
