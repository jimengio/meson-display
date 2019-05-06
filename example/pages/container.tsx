import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { row } from "@jimengio/shared-utils";

import Home from "./home";
import Content from "./content";
import { HashRedirect } from "@jimengio/ruled-router/lib/dom";
import { genRouter } from "controller/generated-router";
import DemoGroupedTimeline from "./demo-grouped-timeline";

const renderChildPage = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case genRouter.home.name:
        return <Home />;
      case genRouter.content.name:
        return <Content />;
      case genRouter.groupedTimeline.name:
        return <DemoGroupedTimeline />;
      default:
        return <HashRedirect to={genRouter.home.name} delay={2} placeholder={"2s to redirect"} />;
    }
  }
  return <div>NOTHING</div>;
};

let pages = [
  {
    title: "Home",
    go: genRouter.home.go,
  },

  {
    title: "grouped-timeline",
    go: genRouter.groupedTimeline.go,
  },
];

let renderSidebar = (router: IRouteParseResult) => {
  return (
    <div>
      {pages.map((info, idx) => {
        return (
          <div
            key={idx}
            className={styleEntry}
            onClick={() => {
              info.go();
            }}
          >
            {info.title}
          </div>
        );
      })}
    </div>
  );
};

export default (props: { router: IRouteParseResult }) => {
  return (
    <div className={cx(row, styleContainer)}>
      {renderSidebar(props.router)}
      <div style={{ width: 20 }} />
      {renderChildPage(props.router)}
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

const styleTitle = css`
  margin-bottom: 16px;
`;

let styleEntry = css`
  line-height: 40px;
`;
