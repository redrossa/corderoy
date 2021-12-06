import '../../styles/Modal/Modal.scss';
import React from 'react';
import classNames from 'classnames';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.background = React.createRef();
  }

  handleClick(event) {
    const show = this.props.show;
    const target = event.target;
    if (show && target === this.background.current) {
      target.classList.toggle('Modal-show');
      this.props.setShow(false);
    }
  }

  render() {
    return (
        <div
            className={classNames('Modal', this.props.className, this.props.show && 'Modal-show')}
            onClick={this.handleClick}
            ref={this.background}
        >
          {this.props.children}
        </div>
    );
  }
}