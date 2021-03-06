import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

export let genRouter = {
  home: {
    name: "home",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  content: {
    name: "content",
    raw: "content",
    path: () => `/content`,
    go: () => switchPath(`/content`),
  },
  groupedTimeline: {
    name: "grouped-timeline",
    raw: "grouped-timeline",
    path: () => `/grouped-timeline`,
    go: () => switchPath(`/grouped-timeline`),
  },
  withOverflow: {
    name: "with-overflow",
    raw: "with-overflow",
    path: () => `/with-overflow`,
    go: () => switchPath(`/with-overflow`),
  },
  else: {
    name: "else",
    raw: "else",
    path: () => `/else`,
    go: () => switchPath(`/else`),
  },
  _: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};
