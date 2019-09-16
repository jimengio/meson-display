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

* Image Viewer(See https://github.com/jimengio/image-viewer)

* Dropdown area(See https://github.com/jimengio/dropdown)

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
