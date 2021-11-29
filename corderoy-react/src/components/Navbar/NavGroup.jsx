import React from 'react';
import classNames from 'classnames';

export default class NavGroup extends React.Component {
  render() {
    return (
        <div className={classNames('NavGroup', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}