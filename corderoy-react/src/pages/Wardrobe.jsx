import React from 'react';
import axios from "axios";
import {Navbar, NavBrand, NavGroup, NavScroller} from '../components/Navbar';

export default class Wardrobe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: []
    }
  }

  componentDidMount() {
    axios.get('/api/collections')
        .then(res => {
          this.setState({collections: res.data})
        })
  }

  render() {
    return (
        <div className="Wardrobe page">
          <Navbar>
            <NavBrand>
              Corderoy
            </NavBrand>
            <NavGroup>
              <NavScroller>
                {this.state.collections}
              </NavScroller>
            </NavGroup>
          </Navbar>
          cart preview
          catalog
        </div>
    );
  }
}