import '../../styles/Home/Feed.scss';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Link, useSearchParams} from 'react-router-dom';
import {Navbar, NavBrand, NavGroup} from '../../components/Navbar';
import Corderoy from '../../images/Corderoy.svg';
import axios from 'axios';
import PostCatalog from './PostCatalog';

export default function Feed(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const query = searchParams.get('q');

  useEffect(() => {
    axios.get(`/api/outfits?q=${query}`)
        .then(resp => {
          setPosts(resp.data);
        });
  }, [query])

  return (
    <div className={classNames('Feed', props.className)}>
      <Navbar className="feed-nav">
        <NavGroup>
          <NavBrand>
            <img src={Corderoy} alt="Corderoy"/>
          </NavBrand>
        </NavGroup>
        <NavGroup className="menu">
          <Link to="/wardrobe">Create outfit</Link>
        </NavGroup>
      </Navbar>
      <h1 className="search-title">{query}</h1>
      <PostCatalog posts={posts} />
    </div>
  );
}