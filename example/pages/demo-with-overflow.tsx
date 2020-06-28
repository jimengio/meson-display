import React from "react";
import { css, cx } from "emotion";
import WithOverflow from "../../src/with-overflow";

interface IProps {}

interface IState {}

export default class DemoWithOverflow extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styleCard} style={{ width: 160, overflow: "hidden" }}>
        <WithOverflow text="an example of text" fontSize={14} fontFamily="Arial" className={styleText} />
        <WithOverflow text="an example of text longer" fontSize={14} fontFamily="Arial" className={styleText} />
        <div style={{ position: "absolute", right: 0, maxWidth: 80 }}>
          <WithOverflow text="an example of text longer" fontSize={14} fontFamily="Arial" className={styleText} />
        </div>
        <div style={{ position: "absolute", bottom: 0, maxWidth: 80 }}>
          <WithOverflow text="an example of text longer" fontSize={14} fontFamily="Arial" className={styleText} />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0, maxWidth: 80 }}>
          <WithOverflow text="an example of text longer" fontSize={14} fontFamily="Arial" className={styleText} />
        </div>
      </div>
    );
  }
}

const styleCard = css`
  padding: 16px;
`;

const styleText = css`
  max-width: 100%;
`;
