import React, { FC, useMemo } from "react";
import { css, cx } from "emotion";
import DropdownArea from "./dropdown-area";
import MenuList, { MenuValue, IMenuListItem } from "./menu-list";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { rowParted, center, expand } from "@jimengio/shared-utils";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";

let DropdownMenu: FC<{
  value: MenuValue;
  items: IMenuListItem[];
  onSelect: (value: MenuValue) => void;
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  emptyLocale?: string;
  menuWidth?: number;
  disabled?: boolean;
  allowClear?: boolean;
}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  let selectedItem = props.items.find((item) => item.value === props.value);

  let inputElement = useMemo(
    () => (
      <div className={cx(rowParted, styleContainer, props.disabled ? styleDisabled : null, props.className)}>
        <span className={cx(styleValue)}>
          {selectedItem ? selectedItem.title : <span className={stylePlaceholder}>{props.placeholder || "Please select"}</span>}
        </span>
        <FaIcon name={EFaIcon.AngleDown} className={styleIcon} />
        {props.allowClear && selectedItem != null ? (
          <JimoIcon
            name={EJimoIcon.slimCross}
            className={styleRemoveIcon}
            onClick={(event) => {
              event.stopPropagation();
              props.onSelect(null);
            }}
          />
        ) : null}
      </div>
    ),
    [props.disabled, props.value]
  );

  if (props.disabled) {
    return inputElement;
  }

  return (
    <DropdownArea
      hideClose={true}
      width={props.menuWidth}
      cardClassName={styleMenu}
      renderContent={(onClose) => {
        if (props.items.length === 0) {
          return <div className={cx(center, styleEmptyList)}>{props.emptyLocale || "No data"}</div>;
        }
        return (
          <MenuList
            value={props.value}
            items={props.items}
            className={props.menuClassName}
            itemClassName={props.itemClassName}
            onSelect={(value) => {
              onClose();
              props.onSelect(value);
            }}
          />
        );
      }}
    >
      {inputElement}
    </DropdownArea>
  );
};

export default DropdownMenu;

let styleContainer = css`
  line-height: 32px;
  padding: 0 12px;
  border: 1px solid hsl(0, 0%, 85%);
  border-radius: 4px;
  min-width: 120px;
  display: inline-flex;
  position: relative;

  &:hover i.jimo {
    opacity: 1;
  }
`;

let stylePlaceholder = css`
  color: hsl(0, 0%, 75%);
  user-select: none;
`;

let styleIcon = css`
  color: hsla(0, 0%, 0%, 0.25);
  user-select: none;
  margin-left: 8px;
  font-size: 16px;
`;

let styleRemoveIcon = css`
  font-size: 10px;
  position: absolute;
  right: 12px;
  background-color: white;
  color: hsla(0, 0%, 0%, 0.25);
  opacity: 0;

  &:hover {
    color: hsla(0, 0%, 0%, 0.5);
  }
`;
let styleDisabled = css`
  background-color: hsl(0, 0%, 96%);
  cursor: not-allowed;
  color: hsla(0, 0%, 0%, 0.25);
`;

let styleMenu = css`
  min-height: 8px;
`;

let styleEmptyList = css`
  font-size: 12px;
  color: hsl(0, 0%, 75%);
  user-select: none;
  padding: 12px;
`;

let styleValue = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
