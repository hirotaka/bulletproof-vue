import type { BaseEntity } from "@/types";

export type Team = {
  name: string;
  description: string;
} & BaseEntity;
