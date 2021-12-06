import '../../styles/Wardrobe/Catalog.scss'
import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, CardTitle, CardBody, CardImg} from '../../components/Card';
import {UserSelection} from '../../components/UserSelection';
import Modal from '../../components/Modal/Modal';

export default function Catalog(props) {
  const {collection} = useParams();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const modal = useRef();

  useEffect(() => {
    axios.get(`/api/products?collection=${encodeURIComponent(collection)}`)
        .then(resp => {
          setProducts(resp.data);
        })
  }, [collection]);

  const openModal = (product) => {
    console.log(product);
    setModalProduct(product);
    setShowModal(true);
  };

  return (
      <div className={classNames('Catalog', props.className)}>
        <div className="title">
          <h1>{collection}</h1>
        </div>
        <div className="cards">
          {products.map(prod => (
              <UserSelection.Consumer>
                {outfit => (
                    <Card className="card" onClick={() => openModal(prod)}>
                      <CardImg
                          className="card-img"
                          src={`https://m.media-amazon.com/images/G/01/Shopbop/p${prod.product.colors[0].images[0].src}`}
                          alt={prod.product.shortDescription}
                      />
                      <div className="card-annotation">
                        <CardTitle className="card-title">{prod.product.shortDescription}</CardTitle>
                        <CardBody className="card-annotation-body">
                          <div className="desc">
                            {prod.product.designerName}
                          </div>
                          <div className="price-tag">
                            {prod.product.retailPrice.price}
                          </div>
                        </CardBody>
                      </div>
                    </Card>
                )}
              </UserSelection.Consumer>
          ))}
        </div>
        <Modal className="item-detail-modal" ref={modal} show={showModal} setShow={setShowModal}>
          <div style={{backgroundColor: 'white'}}>
            {!Object.keys(modalProduct).length ? '' : modalProduct.product.shortDescription}
          </div>
        </Modal>
      </div>
  );
}