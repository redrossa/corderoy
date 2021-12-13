import '../../styles/Home/PostDetail.scss';
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import ReactHashtag from 'react-hashtag';
import {Link} from 'react-router-dom';
import BorderedLikeIcon from '../../images/favorite_border_24px_outlined.svg';
import FilledLikeIcon from '../../images/favorite_24px_outlined.svg';
import axios from 'axios';

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      post: props.post
    }
  }

  formatDate(srcDate) {
    const date = new Date(srcDate);
    const relTime = moment(date).fromNow();
    return relTime.toString();
  }

  formatDescription(srcDesc) {
    return (
        <ReactHashtag renderHashtag={tag => <Link to={`/posts?q=${encodeURIComponent(tag)}`}>{tag}</Link>}>
          {srcDesc}
        </ReactHashtag>
    );
  }

  getTotalPrice(items) {
    const usdFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return usdFormatter.format(Object.values(items)
        .map(coll => Object.values(coll))
        .flat()
        .map(item => item.product.retailPrice.usdPrice)
        .reduce((a, b) => a + b, 0));
  }

  handleLike(event) {
    const icon = event.currentTarget.children[0];
    const post = {...this.state.post};
    const localLikedPosts = JSON.parse(localStorage.getItem('likedPosts'));
    const index = localLikedPosts.indexOf(post.id);
    const liked = index > -1;
    let cb_url = '';

    if (liked) {
      icon.classList.remove('like-btn-liked');
      localLikedPosts.splice(index, 1);
      post.likes -= 1;
      cb_url = 'unlike';
    } else {
      icon.classList.add('like-btn-liked');
      localLikedPosts.push(post.id);
      post.likes += 1;
      cb_url = `like`;
    }

    cb_url = `/api/${cb_url}?outfit-id=${post.id}`
    axios.post(cb_url).then(resp => console.log(resp.data));
    localStorage.setItem('likedPosts', JSON.stringify(localLikedPosts));
    this.setState({post: post});
  }

  render() {
    const localLikedPosts = JSON.parse(localStorage.getItem('likedPosts'));
    const liked = localLikedPosts.includes(this.state.post.id);

    return (
        <div className={classNames('PostDetail', this.props.className)}>
          <h2 className="PostDetail-title">{this.state.post.title}</h2>
          <h5 className="PostDetail-date">{this.formatDate(this.state.post.date)}</h5>
          <div className="PostDetail-actions">
            <div className="PostDetail-actions-like">
              <button className="like-btn" onClick={this.handleLike}>
                <img src={liked ? FilledLikeIcon : BorderedLikeIcon} alt="Like" />
              </button>
              <span className="like-count">
                {this.state.post.likes}
              </span>
            </div>
          </div>
          <div className="PostDetail-price">TOTAL: {this.getTotalPrice(this.props.post.products)}</div>
          <div className="PostDetail-desc">{this.formatDescription(this.props.post.desc)}</div>
        </div>
    );
  }
}