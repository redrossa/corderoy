import React, {createRef} from 'react';
import Landing from './Landing';
import Trending from './Trending';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.trending = createRef();
    this.handlePortal = this.handlePortal.bind(this);
  }

  handlePortal(event) {
    this.trending.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  render() {
    return (
        <div className="Home page">
          <Landing portalOnClick={this.handlePortal} />
          <div ref={this.trending}>
            <Trending />
          </div>
        </div>
    );
  }
}