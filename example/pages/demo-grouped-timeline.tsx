import React, { SFC } from "react";
import { css } from "emotion";
import GroupedTimeline, { ITimelineGroup } from "../../src/grouped-timeline";

let DemoGroupedTimeline: SFC<{}> = (props) => {
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
  return (
    <div className={styleContainer}>
      <GroupedTimeline groups={timeEvents} />
    </div>
  );
};

export default DemoGroupedTimeline;

let styleContainer = css``;
