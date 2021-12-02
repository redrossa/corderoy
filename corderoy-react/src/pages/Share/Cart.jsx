import '../../styles/Share/Cart.scss'
import React from 'react';
import classNames from 'classnames';
import {UserSelection} from '../../components/UserSelection';
import {Card, CardImg} from '../../components/Card';

export default class Cart extends React.Component {
  render() {
    return (
        <div className={classNames('Cart', this.props.className)}>
          <UserSelection.Consumer>
            {outfit => (
                <div className="container">
                  <div className="items-preview">
                    {Object.entries(outfit.items).map(([part, partItems]) => (
                        <div className="items-part">
                          <h3>{part}</h3>
                          <div className="items-container">
                            {Object.entries(partItems).map(([code, item]) => (
                                <div className="item">
                                  <div className="left-col">
                                    <Card className="item-card">
                                      <CardImg
                                          src={`https://m.media-amazon.com/images/G/01/Shopbop/p${item.product.colors[0].images[0].src}`}
                                          alt={item.product.shortDescription}
                                      />
                                    </Card>
                                    <div className="item-label">
                                      <div className="desc">{item.product.shortDescription}</div>
                                      <div className="name">{item.product.designerName}</div>
                                    </div>
                                  </div>
                                  <div className="right-col">
                                    <div className="price">{item.product.retailPrice.price}</div>
                                  </div>
                                </div>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                  <form action="/wat" method="post" id="share-form">
                    <div className="share-bar">
                      <div className="top">
                        <input type="text" name="title" placeholder="Title" />
                        <hr />
                        <textarea name="desc" placeholder="Description" />
                      </div>
                      <div className="bottom">
                        <hr />
                        <div className="total">
                          TOTAL: {}
                        </div>
                        <button type="submit" form="share-form" value="Share">
                          Share
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
            )}
          </UserSelection.Consumer>
        </div>
    );
  }
}