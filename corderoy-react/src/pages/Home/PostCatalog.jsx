import '../../styles/Home/PostCatalog.scss';
import React from 'react';
import classNames from 'classnames';
import Post from './Post';

export default class PostCatalog extends React.Component {
  render() {
    return (
        <div className={classNames('PostCatalog', this.props.className)}>
          {this.props.posts.map(post => <Post post={post} />)}
        </div>
    );
  }
}