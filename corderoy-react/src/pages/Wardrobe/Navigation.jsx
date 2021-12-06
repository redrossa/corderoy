import '../../styles/Wardrobe/Navigation.scss';
import React from 'react';
import axios from "axios";
import classNames from 'classnames';
import {NavAccordion, Navbar, NavBrand, NavGroup, NavScroller} from '../../components/Navbar';
import {Link} from "react-router-dom";
import Corderoy from '../../images/Corderoy.svg';
import {Collections} from '../../components/Collections';


export default class Navigation extends React.Component {
  static contextType = Collections;

  constructor(props) {
    super(props);
    this.partsMenu = [];
    this.state = {
      part: null,
      collections: []
    };
  }

  handleClick(part, idx) {
    for (const menu of this.partsMenu) {
      menu.classList.remove('wardrobe-menu-part-active');
    }

    if (part === this.state.part) {
      this.partsMenu[idx].classList.remove('wardrobe-menu-part-active');
      this.setState({
        part: null,
        collections: []
      });
      return;
    }

    const ctx = this.context;
    const collections = Object.fromEntries(Object.entries(ctx).map(([p, c]) => [p, Object.keys(c)]));
    const links = collections[part].map(c => (
        <Link to={`/wardrobe/${c}`}>
          {c}
        </Link>
    ));

    this.partsMenu[idx].classList.add('wardrobe-menu-part-active');
    this.setState({
      part: part,
      collections: links
    });
  }

  render() {
    const ctx = this.context;
    const collections = Object.fromEntries(Object.entries(ctx).map(([p, c]) => [p, Object.keys(c)]));
    if (!collections)
      return;

    return (
        <div className={classNames('Navigation', this.props.className)}>
          <Navbar className="wardrobe-nav">
            <NavBrand className="wardrobe-navbrand">
              <img src={Corderoy} alt="Corderoy"/>
            </NavBrand>
            <NavGroup className="wardrobe-menu">
              <div className="wardrobe-menu-parts">
                {Object.keys(collections).map((part, idx) => (
                    <div
                        className="wardrobe-menu-part"
                        onClick={() => this.handleClick(part, idx)}
                        key={idx}
                        ref={e => this.partsMenu[idx] = e}
                    >
                      {part}
                    </div>
                ))}
              </div>
              <div className="wardrobe-menu-collections">
                <NavScroller className="wardrobe-menu-scroll">
                  {this.state.collections}
                </NavScroller>
              </div>
            </NavGroup>
          </Navbar>
        </div>
    );
  }
}