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

      <DropdownArea className={cx(styleTrigger, styleWider)} renderContent={(onClose) => "Some content"} hideClose>
        <div>Width inherited</div>
      </DropdownArea>

      <DropdownArea
        className={styleTrigger}
        title="A title"
        renderContent={(onClose) => "Some content"}
        renderTrigger={(openMenu, closeMenu) => {
          return (
            <input
              className={styleInput}
              placeholder={"Custom trigger"}
              onChange={(event) => {
                if (event.target.value === "") {
                  closeMenu();
                } else {
                  openMenu();
                }
              }}
            />
          );
        }}
      ></DropdownArea>

      <DropdownArea
        className={cx(styleTrigger)}
        renderContent={(onClose) => (
          <div>
            Some content
            <button onClick={onClose}>Close</button>
          </div>
        )}
        hideClose
      >
        <div>A close button</div>
      </DropdownArea>

      <div style={{ height: 400 }}></div>

      <DropdownArea guessHeight={80} className={cx(styleTrigger)} width={400} renderContent={(onClose) => "Some content"} hideClose>
        <div>detect edge</div>
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

let styleWider = css`
  width: 300px;
`;

let styleInput = css`
  line-height: 24px;
  font-size: 14px;
  padding: 0 8px;
  outline: none;
`;
