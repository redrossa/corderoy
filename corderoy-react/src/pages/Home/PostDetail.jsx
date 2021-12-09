import '../../styles/Home/PostDetail.scss';
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import ReactHashtag from 'react-hashtag';
import {Link} from 'react-router-dom';
import BorderedLikeIcon from '../../images/favorite_border_24px_outlined.svg';
import FilledLikeIcon from '../../images/favorite_24px_outlined.svg';

export default class PostDetail extends React.Component {
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
    icon.classList.toggle('like-btn-liked');
    icon.src = icon.classList.contains('like-btn-liked') ? FilledLikeIcon : BorderedLikeIcon;
  }

  render() {
    return (
        <div className={classNames('PostDetail', this.props.className)}>
          <h2 className="PostDetail-title">{this.props.post.title}</h2>
          <h5 className="PostDetail-date">{this.formatDate(this.props.post.date)}</h5>
          <div className="PostDetail-actions">
            <div className="PostDetail-actions-like">
              <button className="like-btn" onClick={this.handleLike}>
                <img src={BorderedLikeIcon} alt="Like" />
              </button>
              <span className="like-count">
                {this.props.post.likes}
              </span>
            </div>
          </div>
          <div className="PostDetail-price">TOTAL: {this.getTotalPrice(this.props.post.products)}</div>
          <div className="PostDetail-desc">{this.formatDescription(this.props.post.desc)}</div>
        </div>
    );
  }
}