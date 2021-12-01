import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {UserSelection} from './components/UserSelection';
import Home from './pages/Home';
import {Wardrobe, Catalog} from './pages/Wardrobe';
import {Share} from './pages/Share';

class App extends React.Component {
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
    this.removeProduct = this.removeProduct.bind(this);
  }

  addProduct(item) {
    const {part, product} = item;
    const outfit = {...this.state.outfit};
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

  removeProduct(item) {
    const {part, product} = item;
    const outfit = {...this.state.outfit};
    switch (part) {
      case "Upper":
        delete outfit["Upper"][product.productCode];
        break;
      case "Lower":
        delete outfit["Lower"][product.productCode];
        break;
      case "Shoes":
        delete outfit["Shoes"][product.productCode];
        break;
      case "Bags":
        delete outfit["Bags"][product.productCode];
        break;
      case "Accessories":
        delete outfit["Accessories"][product.productCode];
        break;
      default:
        return;
    }
    this.setState({outfit: outfit});
  }

  render() {
    return (
        <div className="App">
          <UserSelection.Provider
              value={{
                outfit: this.state.outfit,
                addProduct: this.addProduct,
                removeProduct: this.removeProduct
              }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/wardrobe" element={<Wardrobe/>}>
                  <Route path=":collection" element={<Catalog/>}/>
                </Route>
                <Route path="/share" element={<Share/>}/>
              </Routes>
            </BrowserRouter>
          </UserSelection.Provider>
        </div>
    );
  }
}

export default App;