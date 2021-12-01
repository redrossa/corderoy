import React from 'react';
import classNames from 'classnames';
import {UserSelection} from './UserSelection';

export default function Cart(props) {
  return (
      <div className={classNames('Cart', props.className)}>
        <h1>Your outfit list</h1>
        <UserSelection.Consumer>
          {({outfit, setOutfit}) => (
              <p>{outfit}</p>
          )}
        </UserSelection.Consumer>
      </div>
  );
}