import '../../styles/Navbar/NavScroller.scss'
import React from 'react';
import classNames from 'classnames';
import LeftChevronIcon from '../../images/chevron_left_24px_outlined.svg';
import RightChevronIcon from '../../images/chevron_right_24px_outlined.svg';

export default class NavScroller extends React.Component {
  constructor(props) {
    super(props);
    this.leftScroller = React.createRef();
    this.rightScroller = React.createRef();
    this.menu = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.handleScroll();
  }

  handleScroll() {
    const menu = this.menu.current;
    const scroll = menu.scrollLeft;
    const overflowLeft = scroll > 0;
    const overflowRight = scroll < menu.scrollWidth - menu.clientWidth;
    this.leftScroller.current.style.visibility = overflowLeft ? "visible" : "hidden";
    this.rightScroller.current.style.visibility = overflowRight ? "visible" : "hidden";
  }

  handleItemOnClick(event) {
    event.target.scrollIntoView({behavior: 'smooth', inline: 'center'});
  }

  render() {
    console.log(this.props.children)
    return (
        <div className={classNames('NavScroller', this.props.className)}>
          <div className="left-chevron chevron" ref={this.leftScroller}>
            <img src={LeftChevronIcon} alt="Scroll left" />
          </div>
          <div className="menu-items" onScroll={this.handleScroll} ref={this.menu}>
            {this.props.children.map(c => (
                <div className="menu-item" onClick={this.handleItemOnClick}>
                  {c}
                </div>
            ))}
          </div>
          <div className="right-chevron chevron" ref={this.rightScroller}>
            <img src={RightChevronIcon} alt="Scroll left" />
          </div>
        </div>
    );
  }
}