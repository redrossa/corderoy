import React from 'react';
import classNames from 'classnames';

export default class NavBrand extends React.Component {
  render() {
    return (
        <div className={classNames('NavBrand', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}