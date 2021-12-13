import '../../styles/Home/Landing.scss';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Navbar, NavGroup} from '../../components/Navbar';
import {Link, useNavigate} from 'react-router-dom';
import Corderoy from '../../images/Corderoy.svg';
import DownwardIcon from '../../images/arrow_downward_ios_24px_outlined.svg';
import WavesBackground from '../../images/layered-waves-haikei.svg';

export default function Landing(props) {
  const [scroll, setScroll] = useState(0);
  const navigate = useNavigate();

  const handleScroll = (event) => {
    setScroll(event.target.scrollingElement.scrollTop)
  };

  const handleSubmit = (event) => {
    navigate(`/posts?q=${encodeURIComponent(event.target.searchbar.value)}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <div className={classNames('Landing', props.className)}>
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
          <form action="javascript:void(0);" method="get" id="search-form" onSubmit={handleSubmit}>
            <input type="text" name="searchbar" placeholder="Search outfits" />
          </form>
        </div>
        <div className={classNames('portal', scroll && 'portal-hide')}>
          <div className="text">See what's popular</div>
          <button className="btn" onClick={props.portalOnClick}>
            <img src={DownwardIcon} alt="Downward icon" />
          </button>
        </div>
        <img className="background" src={WavesBackground} alt="Waves" />
      </div>
  );
}