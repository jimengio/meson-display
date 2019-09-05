import { css, cx } from "emotion";
import { CSSTransition } from "react-transition-group";
import EventEmitter from "eventemitter3";

let transitionDuration = 160;
let relativeOffset = 4; /** 菜单相对弹出位置有一个上下偏差, 以免形成遮挡 */
let containOffset = 2; /** 菜单相对弹出位置有一个左右偏差, 以便看起来不要过于死板 */
let containerName = "meson-display-container";

import React, { FC, useEffect, useState, ReactNode, CSSProperties, useRef } from "react";
import ReactDOM from "react-dom";
import { rowParted, column } from "@jimengio/shared-utils/lib/layout";

type FuncVoid = () => void;

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
  renderContent: (closeMenu: FuncVoid) => ReactNode;
  hideClose?: boolean;

  /** optional, by default, the area responds to click event,
   * there are cases we want to control how the menu is created
   */
  renderTrigger?: (openMenu: FuncVoid, closeMenu: FuncVoid) => ReactNode;
}

interface IPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

let DropdownArea: FC<IProps> = (props) => {
  let [visible, setVisible] = useState(false);
  let [position, setPosition] = useState({} as IPosition);
  let [inheritedWidth, setInheritedWidth] = useState(null as number);

  let el = useRef<HTMLDivElement>(null);
  let triggerEl = useRef<HTMLDivElement>(null);
  let sessionToken = useRef<number>(null);

  /** Methods */

  let onTriggerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (visible) {
      setVisible(false);
      return;
    }

    event.stopPropagation();

    openMenu();
  };

  let openMenu = () => {
    if (visible) {
      return;
    }

    let rect = triggerEl.current.getBoundingClientRect();

    // 如果计算宽度超出显示区域, 往左弹出
    let almostOut = false;
    let reachingBottom = false;
    if (props.width != null) {
      almostOut = rect.left + props.width > window.innerWidth;
    }
    if (props.guessHeight != null) {
      reachingBottom = rect.bottom + props.guessHeight > window.innerHeight;
    }

    if (props.alignToRight || almostOut) {
      setVisible(true);
      setInheritedWidth(rect.width);
      setPosition({
        top: reachingBottom ? null : rect.bottom + relativeOffset,
        right: Math.max(window.innerWidth - rect.right - containOffset, relativeOffset),
        bottom: reachingBottom ? 8 : null,
      });
    } else {
      setVisible(true);
      setInheritedWidth(rect.width);
      setPosition({
        top: reachingBottom ? null : rect.bottom + relativeOffset,
        left: Math.max(rect.left - containOffset, relativeOffset),
        bottom: reachingBottom ? 8 : null,
      });
    }

    // 广播机制, 通知其他的菜单在接受到消息的时候关闭
    let newToken = Math.random();
    sessionToken.current = newToken;
    bus.emit(menuEvent, newToken);
  };

  let onClose = () => {
    setVisible(false);
  };

  /** 判断是否是自身发起的广播, 如果是自己的, 不需要关闭 */
  let detectOnClose = (token: any) => {
    if (token !== sessionToken.current) {
      onClose();
    }
  };

  let onContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  /** Effects */

  if (el.current == null) {
    el.current = document.createElement("div");
  }

  useEffect(() => {
    let root = document.querySelector(`.${containerName}`);

    if (root == null) {
      console.error(`Required a container element in body: <div class="${containerName}" />`);
      return;
    }

    root.appendChild(el.current);

    bus.on(menuEvent, detectOnClose);
    window.addEventListener("click", onClose);

    return () => {
      let root = document.querySelector(`.${containerName}`);

      if (root == null) {
        console.error(`Required a container element in body: <div class="${containerName}" />`);
        return;
      }

      root.removeChild(el.current);

      bus.removeListener(menuEvent, detectOnClose);
      window.removeEventListener("click", onClose);
    };
  }, []);

  /** Renderers */

  let renderDropdown = () => {
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
      <div onClick={onContainerClick} className={styleAnimations}>
        <CSSTransition in={visible} unmountOnExit={true} classNames="dropdown" timeout={transitionDuration}>
          <div
            className={cx(column, stylePopPage, "modal-card", props.cardClassName)}
            style={{
              maxHeight: window.innerHeight - 80,
              width: props.width || inheritedWidth,
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right,
            }}
            onClick={onContainerClick}
          >
            {props.title ? (
              <div className={cx(rowParted, styleHeader)}>
                <span>{props.title}</span>
              </div>
            ) : null}
            {props.hideClose ? null : (
              <span className={styleCloseIcon} onClick={onClose}>
                {getSvg("#aaa", 14, 14)}
              </span>
            )}
            {props.renderContent(onClose)}
          </div>
        </CSSTransition>
      </div>,
      el.current
    );
  };

  if (props.renderTrigger != null) {
    return (
      <>
        <div className={cx(styleTrigger, props.className)} style={props.style} ref={triggerEl}>
          {props.renderTrigger(openMenu, onClose)}
        </div>
        {renderDropdown()}
      </>
    );
  }

  return (
    <>
      <div className={cx(styleTrigger, props.className)} style={props.style} onClick={onTriggerClick} ref={triggerEl}>
        {props.children}
      </div>
      {renderDropdown()}
    </>
  );
};

export default DropdownArea;

let styleAnimations = css`
  .dropdown-enter {
    opacity: 0;

    &.modal-card {
      transform: translate(0, -12px) scale(0.9);
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
      transform: translate(0px, -12px) scale(0.9);
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
