import { IRouteRule } from "@jimengio/ruled-router";

export const routerRules: IRouteRule[] = [
  { path: "home" },
  { path: "content" },
  {
    path: "grouped-timeline",
  },
  {
    path: "with-overflow",
  },
  { path: "else" },
  { path: "", name: "home" },
];
