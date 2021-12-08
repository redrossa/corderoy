import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

export default class NavBrand extends React.Component {
  render() {
    return (
        <div className={classNames('NavBrand', this.props.className)}>
          <Link to="/">
            {this.props.children}
          </Link>
        </div>
    );
  }
}