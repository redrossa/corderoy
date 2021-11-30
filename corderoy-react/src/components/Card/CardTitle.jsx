import React from 'react';
import classNames from 'classnames';

export default class CardTitle extends React.Component {
  render() {
    return (
        <div className={classNames('CardTitle', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}