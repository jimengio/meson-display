import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { row, fullHeight, fullscreen } from "@jimengio/shared-utils";

import Home from "./home";
import Content from "./content";
import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter } from "controller/generated-router";
import DemoGroupedTimeline from "./demo-grouped-timeline";
import DemoImageViewer from "./demo-image-viewer";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import DemoDropdownArea from "./demo-dropdown-area";
import DemoWithOverflow from "./demo-with-overflow";

const renderChildPage = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case genRouter.home.name:
        return <Home />;
      case genRouter.content.name:
        return <Content />;
      case genRouter.groupedTimeline.name:
        return <DemoGroupedTimeline />;
      case genRouter.imageViewer.name:
        return <DemoImageViewer />;
      case genRouter.dropdownArea.name:
        return <DemoDropdownArea />;
      case genRouter.withOverflow.name:
        return <DemoWithOverflow />;
      default:
        return (
          <HashRedirect to={genRouter.home.name} delay={2}>
            2s to redirect
          </HashRedirect>
        );
    }
  }
  return <div>NOTHING</div>;
};

let items: ISidebarEntry[] = [
  {
    title: "Home",
    path: genRouter.home.name,
  },
  {
    title: "grouped-timeline",
    path: genRouter.groupedTimeline.name,
  },
  {
    title: "image viewer",
    path: genRouter.imageViewer.name,
  },
  {
    title: "dropdown area",
    path: genRouter.dropdownArea.name,
  },
  {
    title: "with overflow",
    path: genRouter.withOverflow.name,
  },
];

let onSwitch = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target) {
    target.go();
  } else {
    console.error("Unknown path", path);
  }
};

export default (props: { router: IRouteParseResult }) => {
  return (
    <div className={cx(row, fullscreen, styleContainer)}>
      <DocSidebar currentPath={props.router.name} items={items} onSwitch={(item) => onSwitch(item.path)} />
      <div style={{ width: 20 }} />
      {renderChildPage(props.router)}
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;
