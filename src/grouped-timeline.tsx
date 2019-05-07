import React, { SFC, ReactNode } from "react";
import { css, cx } from "emotion";
import { row } from "@jimengio/shared-utils";

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
    <div className={cx(row, styleContainer)}>
      <div className={styleTrack} />
      <div>
        {props.groups.map((group, idx) => {
          return (
            <div key={idx} className={styleGroup}>
              <div className={styleGroupIcon} />
              <div className={styleGroupTitle}>{group.title}</div>
              <div className={styleChildren}>
                {group.children.map((item, itemIdx) => {
                  return (
                    <div key={itemIdx} className={styleChildItem}>
                      <div className={styleItemIcon} />
                      <div>{item.title}</div>
                      <div>{item.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupedTimeline;

let styleContainer = css``;

let styleTrack = css`
  margin: 0 12px;
  width: 1px;
  background-color: hsla(209, 90%, 55%, 1);
`;

let styleGroup = css`
  position: relative;
  font-size: 12px;
  line-height: 24px;
`;

let styleGroupIcon = css`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid hsla(209, 90%, 55%, 1);

  position: absolute;
  left: -18px;
  top: 6px;
`;

let styleGroupTitle = css`
  font-weight: bold;
`;

let styleChildren = css`
  margin-left: 12px;
`;

let styleChildItem = css`
  position: relative;
`;

let styleItemIcon = css`
  position: absolute;

  left: -28px;
  top: 8px;

  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: hsla(209, 90%, 55%, 1);
`;
