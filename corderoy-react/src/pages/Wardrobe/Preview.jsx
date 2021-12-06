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
                  ))}
                  <Link
                      className="link"
                      to={'/share'}
                      style={{
                        'pointer-events': (outfit.size() === 0 ? 'none' : 'auto')
                      }}>
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