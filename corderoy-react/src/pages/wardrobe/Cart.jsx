import '../../styles/wardrobe/Cart.scss';
import React from 'react';
import classNames from 'classnames';
import {UserSelection} from './UserSelection';
import {Card, CardImg} from '../../components/Card';
import {Link} from 'react-router-dom';

export default function Cart(props) {
  return (
      <div className={classNames('Cart', props.className)}>
        <h1>Your outfit list</h1>
        <UserSelection.Consumer>
          {({outfit, removeProduct}) => (
                Object.entries(outfit).map(([part, items]) => (
                    <div>
                      <div className="part-header">
                        <h4>{part}</h4>
                      </div>
                      <div className="items">
                        {Object.keys(items).length === 0 ?
                            <p style={{fontStyle: "italic"}}>Empty</p> :
                            Object.entries(items).map(([code, item]) => (
                                <div className="item">
                                  <Card className="item-card" onClick={() => removeProduct(item)}>
                                    <CardImg
                                        src={`https://m.media-amazon.com/images/G/01/Shopbop/p${item.product.colors[0].images[0].src}`}
                                        alt={item.product.shortDescription}
                                    />
                                  </Card>
                                  <div className="item-label">
                                    <div>{item.product.designerName}</div>
                                    <div>{item.product.retailPrice.price}</div>
                                  </div>
                                </div>
                            ))
                        }
                      </div>
                    </div>
                ))
            )
          }
        </UserSelection.Consumer>
        <Link className="link" to={"/share"}>
          <div className="proceed-btn">
            Proceed to share
          </div>
        </Link>
      </div>
  );
}