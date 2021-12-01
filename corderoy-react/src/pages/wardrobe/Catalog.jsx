import '../../styles/wardrobe/Catalog.scss'
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, CardTitle, CardBody} from '../../components/Card';

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
            <Card
                className="card"
                src={`https://m.media-amazon.com/images/G/01/Shopbop/p${p.product.colors[0].images[0].src}`}
                alt={p.product.shortDescription}
                width={"12vw"}
            >
              <div className="card-annotation">
                <CardTitle>{p.product.designerName}</CardTitle>
                <CardBody className="card-body">
                  <div className="desc">
                    {p.product.shortDescription}
                  </div>
                  <div className="price-tag">
                    {p.product.retailPrice.price}
                  </div>
                </CardBody>
              </div>
            </Card>
          ))}
        </div>
      </div>
  );
}