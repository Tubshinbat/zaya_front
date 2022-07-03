import base from "lib/base";
import useSWR from "swr";

export const useGroups = (query, groups) => {
  const { data, error } = useSWR(`${base.apiUrl}/onlineGroups?${query}`, {
    initialData: groups,
  });

  let resGroup = [];

  if (data) {
    resGroup = data.data;
  }

  return {
    groups: resGroup,
    isLoading: !error && !data,
    error,
  };
};
