import '../../styles/Wardrobe/Preview.scss';
import React from 'react';
import classNames from 'classnames';
import {UserSelection} from '../../components/UserSelection';
import {Card, CardImg} from '../../components/Card';
import {Link} from 'react-router-dom';

export default function Preview(props) {
  return (
      <div className={classNames('Preview', props.className)}>
        <h2>Your outfit selection</h2>
        <UserSelection.Consumer>
          {outfit => (
                <div>
                  <div className="list" style={{maxHeight: props.maxHeight}}>
                    {Object.entries(outfit.items).map(([part, partItems]) => (
                        <div>
                          <div className="part-header">
                            <h5>{part}</h5>
                          </div>
                          <div className="items">
                            {Object.keys(partItems).length === 0 ?
                                <p style={{fontStyle: 'italic'}}>Empty</p> :
                                Object.entries(partItems).map(([code, item]) => (
                                      <div className="item">
                                        <Card className="item-card" onClick={() => outfit.remove(item)}>
                                          <CardImg
                                              src={`https://m.media-amazon.com/images/G/01/Shopbop/p${item.product.colors[item.color].images[0].src}`}
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
                    ))}
                  </div>
                  <Link
                      className={classNames('link', !outfit.size() && 'link-disabled')}
                      to={'/share'}
                      >
                    <div className="proceed-btn">
                      Proceed to share
                    </div>
                  </Link>
                </div>
          )}
        </UserSelection.Consumer>
      </div>
  );
}