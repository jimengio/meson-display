## Meson Display

> A collection of components of displaying information.

Demo http://fe.jimu.io/meson-display/#/grouped-timeline

### Usage

```bash
yarn add @jimengio/meson-display
```

```ts
import { GroupedTimeline } from "@jimengio/meson-display"

let timeEvents: ITimelineGroup[] = [
  {
    title: "2019-04-10（今天）",
    children: [
      {
        title: "14:46 生产入库",
        content: "仓库：原材料仓库  操作人：陈大力",
      },
      {
        title: "10:20 销售出库",
        content: "仓库：成品仓库",
      },
    ],
  },
  {
    title: "2019-04-09（星期二）",
    children: [
      {
        title: "14:46 生产入库",
        content: "仓库：原材料仓库",
      },
    ],
  },
];

<GroupedTimeline groups={timeEvents} />
```


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

```tsx
import { Space } from "@jimengio/meson-display"

<Space width={24} />
```

```tsx
import { JimoButton } from "@jimengio/meson-display"

<JimoButton text="Toggle" onClick={() => {}} />
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
