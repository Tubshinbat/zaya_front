import base from "lib/base";
import useSWR from "swr";

export const useService = (query) => {
  const { data, error } = useSWR(`${base.apiUrl}/services?${query}`);
  let services = [];
  if (data) {
    services = data.data;
  }

  return {
    services,
    isLoading: !error && !data,
    error,
  };
};
