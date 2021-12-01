import '../../styles/Wardrobe/Catalog.scss'
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, CardTitle, CardBody, CardImg} from '../../components/Card';
import {UserSelection} from '../../components/UserSelection';

export default function Catalog(props) {
  const {collection} = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products?collection=${encodeURIComponent(collection)}`)
        .then(resp => {
          setProducts(resp.data);
        })
  }, [collection]);

  return (
      <div className={classNames('Catalog', props.className)}>
        <div className="title">
          <h1>{collection}</h1>
        </div>
        <div className="cards">
          {products.map(p => (
              <UserSelection.Consumer>
                {outfit => (
                    <Card className="card" onClick={() => outfit.add(p)}>
                      <CardImg
                          className="card-img"
                          src={`https://m.media-amazon.com/images/G/01/Shopbop/p${p.product.colors[0].images[0].src}`}
                          alt={p.product.shortDescription}
                      />
                      <div className="card-annotation">
                        <CardTitle className="card-title">{p.product.shortDescription}</CardTitle>
                        <CardBody className="card-body">
                          <div className="desc">
                            {p.product.designerName}
                          </div>
                          <div className="price-tag">
                            {p.product.retailPrice.price}
                          </div>
                        </CardBody>
                      </div>
                    </Card>
                )}
              </UserSelection.Consumer>
          ))}
        </div>
      </div>
  );
}