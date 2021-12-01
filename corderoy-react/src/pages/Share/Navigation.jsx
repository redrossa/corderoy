import React from 'react';
import classNames from 'classnames';

export default class Navigation extends React.Component {
  render() {
    return (
        <div className={classNames('Navigation', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}