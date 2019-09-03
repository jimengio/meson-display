import { css, cx } from "emotion";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EventEmitter from "eventemitter3";

let transitionDuration = 160;
let relativeOffset = 4; /** 菜单相对弹出位置有一个上下偏差, 以免形成遮挡 */
let containOffset = 2; /** 菜单相对弹出位置有一个左右偏差, 以便看起来不要过于死板 */
let containerName = "meson-display-container";

import React, { FC, useEffect, useState, ReactNode, RefObject, CSSProperties } from "react";
import ReactDOM from "react-dom";
import { rowParted, column, immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";

let bus = new EventEmitter();
let menuEvent = "menu-event";

interface IProps {
  title?: string;
  /** trigger 区域的样式 */
  className?: string;
  style?: CSSProperties;
  /** 弹出的卡片的样式 */
  cardClassName?: string;
  /** 菜单对准右侧, 从右往左弹出 */
  alignToRight?: boolean;
  width?: number;
  /** 不一定精确, 根据区域检测如果超出屏幕, 菜单将上移放在屏幕边缘 */
  guessHeight?: number;
  renderContent: (onClose: () => void) => ReactNode;
  hideClose?: boolean;
}

interface IState {
  visible: boolean;
  inheritedWidth: number;
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export default class DropdownArea extends React.Component<IProps, IState> {
  el: HTMLDivElement;
  triggerEl: RefObject<HTMLDivElement>;

  sessionToken: number;

  constructor(props: IProps) {
    super(props);

    this.el = document.createElement("div");

    this.state = {
      visible: false,
      inheritedWidth: undefined,
      position: {},
    };

    this.triggerEl = React.createRef();
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  componentDidMount() {
    let root = document.querySelector(`.${containerName}`);

    if (root == null) {
      console.error(`Required a container element in body: <div class="${containerName}" />`);
      return;
    }

    root.appendChild(this.el);

    window.addEventListener("click", this.onClose);
    bus.on(menuEvent, this.detectOnClose);
  }

  componentWillUnmount() {
    let root = document.querySelector(`.${containerName}`);

    if (root == null) {
      console.error(`Required a container element in body: <div class="${containerName}" />`);
      return;
    }

    root.removeChild(this.el);
    window.removeEventListener("click", this.onClose);
    bus.removeListener(menuEvent, this.detectOnClose);
  }

  render() {
    return (
      <>
        <div className={cx(styleTrigger, this.props.className)} style={this.props.style} onClick={this.onTriggerClick} ref={this.triggerEl}>
          {this.props.children}
        </div>
        {this.renderDropdown()}
      </>
    );
  }

  renderDropdown() {
    let { position } = this.state;

    let getSvg = (color: string, width: number, height: number) => (
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
        <path
          d="M22 20.586L41.799.786a1 1 0 1 1 1.414 1.415L23.414 22l19.8 19.799a1 1 0 1 1-1.415 1.414L22 23.414l-19.799 19.8a1 1 0 0 1-1.414-1.415L20.586 22 .786 2.201A1 1 0 0 1 2.202.787L22 20.586z"
          fill={color}
          fillRule="nonzero"
        />
      </svg>
    );

    return ReactDOM.createPortal(
      <div onClick={this.onContainerClick} className={styleAnimations}>
        <CSSTransition in={this.state.visible} unmountOnExit={true} classNames="dropdown" timeout={transitionDuration}>
          <div
            className={cx(column, stylePopPage, "modal-card", this.props.cardClassName)}
            style={{
              maxHeight: window.innerHeight - 80,
              width: this.props.width || this.state.inheritedWidth,
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right,
            }}
            onClick={this.onContainerClick}
          >
            {this.props.title ? (
              <div className={cx(rowParted, styleHeader)}>
                <span>{this.props.title}</span>
              </div>
            ) : null}
            {this.props.hideClose ? null : (
              <span className={styleCloseIcon} onClick={this.onClose}>
                {getSvg("#aaa", 14, 14)}
              </span>
            )}
            {this.props.renderContent(this.onClose)}
          </div>
        </CSSTransition>
      </div>,
      this.el
    );
  }

  onTriggerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.state.visible) {
      this.mergeState({ visible: false });
      return;
    }

    let rect = this.triggerEl.current.getBoundingClientRect();

    // 如果计算宽度超出显示区域, 往左弹出
    let almostOut = false;
    let reachingBottom = false;
    if (this.props.width != null) {
      almostOut = rect.left + this.props.width > window.innerWidth;
    }
    if (this.props.guessHeight != null) {
      reachingBottom = rect.bottom + this.props.guessHeight > window.innerHeight;
    }

    if (this.props.alignToRight || almostOut) {
      this.mergeState({
        visible: true,
        inheritedWidth: rect.width,
        position: {
          top: reachingBottom ? null : rect.bottom + relativeOffset,
          right: Math.max(window.innerWidth - rect.right - containOffset, relativeOffset),
          bottom: reachingBottom ? 8 : null,
        },
      });
    } else {
      this.mergeState({
        visible: true,
        inheritedWidth: rect.width,
        position: {
          top: reachingBottom ? null : rect.bottom + relativeOffset,
          left: Math.max(rect.left - containOffset, relativeOffset),
          bottom: reachingBottom ? 8 : null,
        },
      });
    }

    event.stopPropagation();

    // 广播机制, 通知其他的菜单在接受到消息的时候关闭
    let newToken = Math.random();
    this.sessionToken = newToken;
    bus.emit(menuEvent, newToken);
  };

  onClose = () => {
    this.mergeState({ visible: false });
  };

  /** 判断是否是自身发起的广播, 如果是自己的, 不需要关闭 */
  detectOnClose = (token: any) => {
    if (token !== this.sessionToken) {
      this.onClose();
    }
  };

  onContainerClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
  }
}

let styleAnimations = css`
  .dropdown-enter {
    opacity: 0;

    &.modal-card {
      transform: translate(0, -20px);
    }
  }
  .dropdown-enter.dropdown-enter-active {
    opacity: 1;
    transition-duration: ${transitionDuration}ms;
    &.modal-card {
      transform: translate(0px, 0px);
      transition-duration: ${transitionDuration}ms;
    }
  }
  .dropdown-exit {
    opacity: 1;

    &.modal-card {
      transform: translate(0px, 0px);
    }
  }
  .dropdown-exit.dropdown-exit-active {
    opacity: 0;
    transition-duration: ${transitionDuration}ms;

    &.modal-card {
      transform: translate(0px, -20px);
      transition: ${transitionDuration}ms;
    }
  }
`;

let stylePopPage = css`
  margin: auto;
  z-index: 1000; /* same as antd popups */

  position: absolute;

  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.16);

  min-width: 160px;
  min-height: 80px;

  transform-origin: 50% -50%;

  transition-timing-function: linear;
`;

let styleHeader = css`
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid hsl(0, 0%, 91%);
`;

let styleCloseIcon = css`
  color: #aaa;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  top: 14px;
  right: 16px;
`;

let styleTrigger = css`
  cursor: pointer;
  display: inline-block;
`;
