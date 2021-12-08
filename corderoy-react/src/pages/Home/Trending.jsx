import '../../styles/Home/Trending.scss';
import React from "react";
import classNames from "classnames";
import PostCatalog from "./PostCatalog";
import axios from "axios";

export default class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    await axios.get('/api/outfits?q=trending')
        .then(res => {
          console.log('get got called')
          const posts = res.data;
          this.setState({posts: posts});
        });
  }

  handleSubmit(event) {
    console.log(event.target.searchbar.value);
  }

  render() {
    return (
        <div className={classNames('Trending', this.props.className)}>
          <div className="landing">
            <h1>Corderoy</h1>
            <form action="javascript:void(0);" method="get" id="outfits-form" onSubmit={this.handleSubmit}>
              <input type="text" name="searchbar" placeholder="Search outfits" />
            </form>
            <div className="catalog">
              <div className="search-title">Trending</div>
              <PostCatalog posts={this.state.posts} />
            </div>
          </div>
        </div>
    );
  }
}