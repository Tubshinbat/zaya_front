import base from "lib/base";
import useSWR from "swr";

export const useProducts = (query) => {
  const { data, error } = useSWR(`${base.apiUrl}/products?${query}`);

  let products = [];
  if (data) {
    products = data.data;
  }

  return {
    products,
    isLoading: !error && !data,
    error,
  };
};
