import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import DropdownArea from "../../src/dropdown-area";
import { expand } from "@jimengio/shared-utils";

let DemoDropdownArea: FC<{}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, styleContainer)}>
      <DropdownArea className={styleTrigger} title="A title" renderContent={(onClose) => "Some content"}>
        <div>Content with title</div>
      </DropdownArea>

      <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"}>
        <div>No title</div>
      </DropdownArea>

      <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose>
        <div>No close button</div>
      </DropdownArea>

      <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose alignToRight>
        <div>Align to right</div>
      </DropdownArea>
    </div>
  );
};

export default DemoDropdownArea;

let styleContainer = css`
  padding: 20px;
`;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;
