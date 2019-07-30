import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { calculatePopoverPosition } from "./util";

const canvasElement = document.createElement("canvas");
const ctx = canvasElement.getContext("2d");

let globalFontFamily =
  "Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif";

export function measureTextWidth(text: string, fontSize: number, fontFamily?: string): number {
  ctx.font = `${fontSize}px ${fontFamily || globalFontFamily}`;
  return ctx.measureText(text).width;
}

interface IProps {
  text: string;
  fontSize: number;
  fontFamily?: string;
  className?: string;
}

interface IState {
  showFullText: boolean;
  position: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

let portalClass = "portal-with-overflow";
let globalOverflowPortalElement: HTMLElement = document.querySelector(`.${portalClass}`);

// init portal container in first render
if (globalOverflowPortalElement == null) {
  globalOverflowPortalElement = document.createElement("div");
  globalOverflowPortalElement.className = portalClass;
  document.body.appendChild(globalOverflowPortalElement);
}

export default class WithOverflow extends React.Component<IProps, IState> {
  _rootElement: HTMLElement;

  static defaultProps: Partial<IProps> = {
    fontFamily: globalFontFamily,
  };

  constructor(props) {
    super(props);

    this.state = {
      showFullText: false,
      position: {},
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    return (
      <span
        className={cx(styleContainer, this.props.className)}
        style={{ fontSize: this.props.fontSize, fontFamily: this.props.fontFamily }}
        ref={(x) => {
          this._rootElement = x;
        }}
      >
        {this.props.text}
        <span className={styleTrigger} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
        {this.state.showFullText ? this.renderDisplayText() : null}
      </span>
    );
  }

  renderDisplayText() {
    return ReactDOM.createPortal(
      <div className={styleDisplay} style={_.merge({ fontSize: this.props.fontSize, fontFamily: this.props.fontFamily }, this.state.position)}>
        {this.props.text}
      </div>,
      globalOverflowPortalElement
    );
  }

  onMouseEnter = (event) => {
    let actualWidth = this._rootElement.clientWidth;
    let predictedWidth = measureTextWidth(this.props.text, this.props.fontSize, this.props.fontFamily);

    if (predictedWidth > actualWidth + 4) {
      // best guess of size of the div popped
      let approximateHeight = 40;
      let approximateWidth = predictedWidth + 18;
      let rect = this._rootElement.getBoundingClientRect();
      let position = calculatePopoverPosition(approximateWidth, approximateHeight, rect);

      this.mergeState({ showFullText: true, position });
    }
  };

  onMouseLeave = (event) => {
    if (this.state.showFullText) {
      this.mergeState({ showFullText: false });
    }
  };
}

const styleContainer = css`
  position: relative;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleTrigger = css`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 16px;
  height: 100%;
`;

const styleDisplay = css`
  padding: 8px;
  background-color: white;
  position: absolute;
  border: 1px solid #e5e5e5;
`;
