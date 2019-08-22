## Meson Display

> A collection of components of displaying information.

Demo http://fe.jimu.io/meson-display/

### Usage

```bash
yarn add @jimengio/meson-display
```

* Grouped Timeline

```tsx
import { GroupedTimeline } from "@jimengio/meson-display"

let timeEvents: ITimelineGroup[] = [
  {
    title: "2019-04-10（今天）",
    children: [
      { title: "14:46 生产入库", content: "仓库：原材料仓库  操作人：陈大力" },
      { title: "10:20 销售出库", content: "仓库：成品仓库" },
    ],
  },
  {
    title: "2019-04-09（星期二）",
    children: [
      { title: "14:46 生产入库", content: "仓库：原材料仓库" },
    ],
  },
];

<GroupedTimeline groups={timeEvents} />
```

* Image Viewer


```tsx
import { ImageViewer } from "@jimengio/meson-display"

<ImageViewer
  visible={visible}
  imageUrl={"http://cache.house.sina.com.cn/citylifehouse/citylife/de/26/20090508_7339__.jpg"}
  onClose={() => {
    setVisible(false);
  }}
  hasLeftOne={false}
  hasRightOne={false}
/>
```

* Dropdown area

Demos http://fe.jimu.io/meson-display/#/dropdown-area

```tsx
import { DropdownArea } from "@jimengio/meson-display"

// make sure you got container element in HTML
// <div class="meson-display-container"></div>

<DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose>
  <div>No close button</div>
</DropdownArea>
```

* Space and Button

```tsx
import { Space } from "@jimengio/meson-display"

<Space width={24} />
```

```tsx
import { JimoButton } from "@jimengio/meson-display"

<JimoButton text="Toggle" onClick={() => {}} />
```

* Dropdown Menu

```tsx
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

<DropdownMenu className={styleShortInput}
              value={selected}
              allowClear={false}
              items={items}
              onSelect={(value) => setSelected(value as string)}
              disabled={false}
              placeholder={"请选择"}
              emptyLocale={"没有数据"}  />
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
