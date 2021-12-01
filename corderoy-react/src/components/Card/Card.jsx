import '../../styles/Card/Card.scss';
import React from 'react';
import classNames from 'classnames';

export default class Card extends React.Component {
  render() {
    return (
        <div className={classNames('Card', this.props.className)} onClick={this.props.onClick}>
          {this.props.children}
        </div>
    );
  }
}