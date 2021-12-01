import '../../styles/wardrobe/Wardrobe.scss';
import React from 'react';
import {UserSelection} from './UserSelection';
import Navigation from './Navigation';
import {Outlet} from 'react-router-dom';
import Cart from './Cart';

export default class Wardrobe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: ""
    }
    this.setOutfit = this.setOutfit.bind(this);
  }

  setOutfit(newOutfit) {
    this.setState({outfit: newOutfit})
  }

  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <div className="content">
            <UserSelection.Provider value={{outfit: this.state.outfit, setOutfit: this.setOutfit}}>
              <Cart className="cart" />
              <Outlet />
            </UserSelection.Provider>
          </div>
        </div>
    );
  }
}