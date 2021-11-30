import React from 'react';
import classNames from 'classnames';

export default class CardBody extends React.Component {
  render() {
    return (
        <div className={classNames('CardBody', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}