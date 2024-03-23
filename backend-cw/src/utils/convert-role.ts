import * as process from "process";

export const roleTitleToIdRole = new Map<string, number>([
  [<string>process.env.ADMIN, +process.env.ID_ADMIN_ROLE],
  [<string>process.env.USER, +process.env.ID_USER_ROLE]
])