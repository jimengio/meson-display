import React, { FC, ReactNode } from "react";
import { css, cx } from "emotion";

export type MenuValue = string | number;

export interface IMenuListItem {
  key?: string;
  value: MenuValue;
  title: ReactNode;
}

let MenuList: FC<{
  value: MenuValue;
  items: IMenuListItem[];
  className?: string;
  itemClassName?: string;
  onSelect: (value: MenuValue, item?: IMenuListItem) => void;
}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, props.className)}>
      {props.items.map((item) => {
        return (
          <div
            key={item.key || item.value}
            className={cx(styleItem, item.value === props.value ? styleSelected : null, props.itemClassName)}
            onClick={() => props.onSelect(item.value, item)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;

let styleContainer = null;

let styleItem = css`
  padding: 8px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: hsla(0, 0%, 30%);
  user-select: none;

  &:hover {
    background-color: hsl(199, 100%, 95%);
  }
`;

let styleSelected = css`
  background-color: hsl(0, 0%, 98%);
  color: black;

  &:hover {
    background-color: hsl(199, 100%, 95%);
  }
`;
