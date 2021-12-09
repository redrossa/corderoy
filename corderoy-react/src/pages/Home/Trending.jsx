import '../../styles/Home/Trending.scss';
import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import PostCatalog from './PostCatalog';

export default class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('/api/trending')
        .then(resp => {
          this.setState({posts: resp.data})
        });
  }

  render() {
    return (
        <div className={classNames('Trending', this.props.className)}>
          <h1>Trending</h1>
          <PostCatalog posts={this.state.posts} />
        </div>
    );
  }
}