import React from 'react';
import axios from "axios";
import classNames from 'classnames';
import {Navbar, NavBrand, NavGroup, NavScroller} from "../../components/Navbar";
import {Link} from "react-router-dom";

export default class Navigation extends React.Component {
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
        <div className={classNames('Navigation', this.props.className)}>
          <Navbar>
            <NavBrand>
              Corderoy
            </NavBrand>
            <NavGroup>
              <NavScroller>
                {this.state.collections.map(coll => (
                    <Link to={`/wardrobe/${coll}`}>
                      {coll}
                    </Link>
                ))}
              </NavScroller>
            </NavGroup>
          </Navbar>
        </div>
    );
  }
}