import { useQuery } from "@tanstack/vue-query";

import { axios } from "@/lib/axios";
import type { ExtractFnReturnType, QueryConfig } from "@/lib/vue-query";

import type { Discussion } from "../types";

type QueryFnType = typeof getDiscussions;

export const getDiscussions = (): Promise<Discussion[]> => {
  return axios.get("/discussions");
};

type UseDiscussionsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDiscussions = ({ config }: UseDiscussionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["discussions"],
    queryFn: () => getDiscussions(),
  });
};
