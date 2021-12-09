import '../../styles/Home/Post.scss';
import React from 'react';
import classNames from 'classnames';
import PostItems from './PostItems';
import PostDetail from './PostDetail';

export default class Post extends React.Component {
  render() {
    return (
        <div className={classNames('Post', this.props.className)}>
          <PostItems items={this.props.post.products} />
          <PostDetail post={this.props.post} />
        </div>
    );
  }
}