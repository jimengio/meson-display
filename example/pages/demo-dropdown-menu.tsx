import React, { FC, useState } from "react";
import { css } from "emotion";
import MenuList, { IMenuListItem } from "../../src/menu-list";
import DropdownMenu from "../../src/dropdown-menu";

let DemoDropdownMenu: FC<{}> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  /** Methods */
  /** Effects */
  /** Renderers */

  let items: IMenuListItem[] = [
    {
      value: "a",
      title: "A",
    },
    {
      value: "b",
      title: "使用 optionLabelProp 指定回填到选择框的 Option 属性。uses B",
    },
    {
      value: "c",
      title: "多选，从已有条目中选择。",
    },
    {
      value: "d",
      title: "弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。",
    },
  ];

  return (
    <div className={styleContainer}>
      <div className={styleBlock}>
        <div className={styleMenuArea}>
          <MenuList value={selected} items={items} onSelect={(value) => setSelected(value as string)} />
        </div>
      </div>
      <div className={styleBlock}>
        <DropdownMenu
          allowClear
          className={styleShortInput}
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          placeholder={"请选择"}
        />
      </div>
      <div className={styleBlock}>
        <DropdownMenu disabled value={selected} items={items} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} />
      </div>
      <div className={styleBlock}>
        <DropdownMenu value={selected} items={[]} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} emptyLocale={"没有数据"} />
      </div>
    </div>
  );
};

export default DemoDropdownMenu;

let styleContainer = null;

let styleBlock = css`
  padding: 20px;
`;

let styleMenuArea = css`
  width: 200px;
`;

let styleShortInput = css`
  width: 160px;
`;
