import React from 'react';
import classNames from 'classnames';

export default function Cart(props) {
  return (
      <div className={classNames('Cart', props.className)}>
        <h1>Your outfit list</h1>
      </div>
  );
}