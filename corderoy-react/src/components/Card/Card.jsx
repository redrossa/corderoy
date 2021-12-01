import '../../styles/Card/Card.scss';
import React from 'react';
import classNames from 'classnames';

export default class Card extends React.Component {
  render() {
    return (
        <div
            className={classNames('Card', this.props.className)}
            style={{width: this.props.width}}
            onClick={this.props.onClick}
        >
          <img src={this.props.src} alt={this.props.alt}/>
          {this.props.children}
        </div>
    );
  }
}