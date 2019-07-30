import { IRouteRule } from "@jimengio/ruled-router";

export const routerRules: IRouteRule[] = [
  { path: "home" },
  { path: "content" },
  {
    path: "grouped-timeline",
  },
  {
    path: "image-viewer",
  },
  {
    path: "dropdown-area",
  },
  {
    path: "with-overflow",
  },
  { path: "else" },
  { path: "", name: "home" },
];
