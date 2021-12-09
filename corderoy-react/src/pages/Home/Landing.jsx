import '../../styles/Home/Landing.scss';
import React from 'react';
import classNames from 'classnames';
import {Navbar, NavGroup} from '../../components/Navbar';
import {Link} from 'react-router-dom';
import Corderoy from '../../images/Corderoy.svg';
import DownwardIcon from '../../images/arrow_downward_ios_24px_outlined.svg';
import WavesBackground from '../../images/layered-waves-haikei.svg';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scroll: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    this.setState({scroll: event.target.scrollingElement.scrollTop});
  }

  handleSubmit(event) {
    console.log(event.target.searchbar.value);
  }

  render() {
    return (
        <div className={classNames('Landing', this.props.className)}>
          <Navbar className="landing-nav">
            <NavGroup>
              <Link to="/">About</Link>
            </NavGroup>
            <NavGroup>
              <Link to="/wardrobe">Create outfit</Link>
            </NavGroup>
          </Navbar>
          <div className="landing-content">
            <Link to="/">
              <img src={Corderoy} alt="Corderoy logo"/>
            </Link>
            <form action="javascript:void(0);" method="get" id="search-form" onSubmit={this.handleSubmit}>
              <input type="text" name="searchbar" placeholder="Search outfits" />
            </form>
          </div>
          <div className={classNames('portal', this.state.scroll && 'portal-hide')}>
            <div className="text">See what's popular</div>
            <button className="btn" onClick={this.props.portalOnClick}>
              <img src={DownwardIcon} alt="Downward icon" />
            </button>
          </div>
          <img className="background" src={WavesBackground} alt="Waves" />
        </div>
    );
  }
}