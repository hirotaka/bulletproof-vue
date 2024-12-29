import type { Comment } from "@/features/comments";
import type { User } from "@/features/users";

import { useAuth } from "./useAuth";

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  "comment:delete": (user: User, comment: Comment) => {
    if (user.role === "ADMIN") {
      return true;
    }

    if (user.role === "USER" && comment.authorId === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user.value) {
    throw Error("User does not exist!");
  }

  const checkAccess = ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
    if (allowedRoles && allowedRoles.length > 0) {
      return allowedRoles?.includes(user.value.role);
    }

    return true;
  };

  return { checkAccess, role: user.value.role };
};
