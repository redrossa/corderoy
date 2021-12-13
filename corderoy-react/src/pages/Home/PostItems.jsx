import '../../styles/Home/PostItems.scss';
import React from 'react';
import classNames from 'classnames';
import Carousel from '../../components/Carousel/Carousel';
import {Collections} from '../../components/Collections';

export default class PostItems extends React.Component {
  static contextType = Collections;

  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
    this.state = {
      orderedItems: [],
      currentItem: null
    }
  }

  componentDidMount() {
    const collections = this.context;
    console.log(collections);
    console.log('items', this.props.items);
    
    const orderedItems = collections.collectionRank
          .map(coll => this.props.items[coll])
          .filter(collProds => Object.keys(collProds).length)
          .map(collProds => Object.values(collProds))
          .flat()
    
    console.log('orderedItems', orderedItems);  
        


    this.setState({
      orderedItems: orderedItems,
      currentItem: orderedItems[0]
    });
  }

  handleSlide(index) {
    this.setState({currentItem: this.state.orderedItems[index]});
  }

  render() {
    if (!this.state.orderedItems.length)
      return null;

    return (
        <div className={classNames('PostItems', this.props.className)}>
          <Carousel className="PostItems-carousel" updateIndex={this.handleSlide}>
            {this.state.orderedItems.map(prod => (
                <img
                    src={`https://m.media-amazon.com/images/G/01/Shopbop/p${prod.product.colors[prod.color].images[0].src}`}
                    alt={prod.product.shortDescription}
                />
            ))}
          </Carousel>
          <div className="PostItems-item-detail">
            <div className="PostItems-item-name">
              {this.state.currentItem.product.shortDescription}
            </div>
            <div className="PostItems-item-detail-bot">
              <div className="PostItems-item-designer">
                {this.state.currentItem.product.designerName}
              </div>
              <div className="PostItems-item-price">
                {this.state.currentItem.product.retailPrice.price}
              </div>
            </div>
            <a className="PostItems-item-store-link" href={`https://shopbop.com${this.state.currentItem.product.productDetailUrl}`}>
              See store page
            </a>
          </div>
        </div>
    );
  }
}