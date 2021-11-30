import '../../styles/Navbar/NavScroller.css'
import React from 'react';
import classNames from 'classnames';

export default class NavScroller extends React.Component {
  render() {
    return (
        <div className={classNames('NavScroller', this.props.className)}>
          {this.props.children.map(c => (
            <div className="item">
              {c}
            </div>
          ))}
        </div>
    );
  }
}