import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { rowCenter } from "@jimengio/shared-utils";
import FaIcon, { IconName } from "@jimengio/fa-icons";
import Space from "./space";

interface IProps {
  icon?: IconName;
  text: string;
  className?: string;
  onClick: () => void;
}

interface IState {}

export default class JimoButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  render() {
    let hasIcon = this.props.icon != null;

    return (
      <div className={cx(rowCenter, styleButton, this.props.className)} onClick={this.props.onClick}>
        {hasIcon ? (
          <>
            <FaIcon name={this.props.icon} />
            <Space width={8} />
          </>
        ) : null}
        {this.props.text}
      </div>
    );
  }
}

const styleButton = css`
  display: inline-flex;
  height: 32px;
  padding: 0 16px;
  color: #2c85dd;
  border: 1px solid #2c85dd;
  border-radius: 4px;
  cursor: pointer;

  &:active {
    transform: scale(1.04);
  }
`;
