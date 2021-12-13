import '../../styles/Home/Feed.scss';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Navbar, NavBrand, NavGroup} from '../../components/Navbar';
import Corderoy from '../../images/Corderoy.svg';
import axios from 'axios';
import PostCatalog from './PostCatalog';
import SearchIcon from '../../images/search_24px_outlined.svg';

export default function Feed(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    navigate(`/posts?q=${encodeURIComponent(event.target.searchbar.value)}&sort=${event.target.sort.value}`)
  };

  useEffect(() => {
    axios.get(`/api/outfits?q=${encodeURIComponent(query)}&sort=${!sort ? 'likes' : sort}`)
        .then(resp => {
          setPosts(resp.data);
        });
  }, [query, sort])

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
      <div className="filter">
        <form action="javascript:void(0);" method="get" id="filter-form" onSubmit={handleSubmit}>
          <select name="sort" form="filter-form">
            <option value="likes">Sort by</option>
            <option value="likes">Likes</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
          <input type="text" name="searchbar" placeholder="Search Outfits" />
          <button type="submit">
            <img src={SearchIcon} alt="Search icon" />
          </button>
        </form>
      </div>
      <PostCatalog posts={posts} />
    </div>
  );
}