import '../../styles/Navbar/Navbar.css'
import React from 'react';
import classNames from 'classnames';

export default class Navbar extends React.Component {
  render() {
    return (
        <div className={classNames('Navbar', this.props.className)}>
          {this.props.children}
        </div>
    );
  }
}