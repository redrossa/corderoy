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
      outfit: {
        "Upper": {},
        "Lower": {},
        "Shoes": {},
        "Bags": {},
        "Accessories": {}
      }
    };
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(item) {
    const {part, product} = item;
    const outfit = this.state.outfit;
    console.log(item);
    switch (part) {
      case "Upper":
        outfit["Upper"][product.productCode] = item;
        break;
      case "Lower":
        outfit["Lower"][product.productCode] = item;
        break;
      case "Shoes":
        outfit["Shoes"][product.productCode] = item;
        break;
      case "Bags":
        outfit["Bags"][product.productCode] = item;
        break;
      case "Accessories":
        outfit["Accessories"][product.productCode] = item;
        break;
      default:
        return;
    }
    this.setState({outfit: outfit});
  }

  render() {
    return (
        <div className="Wardrobe page">
          <Navigation />
          <div className="content">
            <UserSelection.Provider
                value={{
                  outfit: this.state.outfit,
                  addProduct: this.addProduct
                }}
            >
              <Cart className="cart" />
              <Outlet />
            </UserSelection.Provider>
          </div>
        </div>
    );
  }
}