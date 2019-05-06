import React, { SFC, ReactNode } from "react";
import { css } from "emotion";

interface ITimelineGroupItem {
  title: string | ReactNode;
  content: string | ReactNode;
}

export interface ITimelineGroup {
  title: string | ReactNode;
  children: ITimelineGroupItem[];
}

let GroupedTimeline: SFC<{ groups: ITimelineGroup[] }> = (props) => {
  return (
    <div className={styleContainer}>
      {props.groups.map((group, idx) => {
        return (
          <div key={idx}>
            <div>{group.title}</div>
            <div>
              {group.children.map((item, itemIdx) => {
                return <div>{item.title}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupedTimeline;

let styleContainer = css`
  position: relative;
`;
