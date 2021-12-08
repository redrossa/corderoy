import '../../styles/Wardrobe/Catalog.scss'
import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Card, CardTitle, CardBody, CardImg} from '../../components/Card';
import {UserSelection} from '../../components/UserSelection';
import Modal from '../../components/Modal/Modal';
import Carousel from '../../components/Carousel/Carousel';

export default function Catalog(props) {
  const {collection} = useParams();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [counter, setCounter] = useState(0);
  const modal = useRef();

  useEffect(() => {
    axios.get(`/api/products?collection=${encodeURIComponent(collection)}`)
        .then(resp => {
          setProducts(resp.data);
        })
  }, [collection]);

  const openModal = (product) => {
    setCounter(counter + 1);
    setModalProduct(product);
    setShowModal(true);
  };

  return (
      <UserSelection.Consumer>
        {outfit => (
            <div className={classNames('Catalog', props.className)}>
              <div className="title">
                <h1>{collection}</h1>
              </div>
              <div className="cards">
                {products.map(prod => (
                    <Card className="card" onClick={() => openModal(prod)}>
                      <CardImg
                          className="card-img"
                          src={`https://m.media-amazon.com/images/G/01/Shopbop/p${prod.product.colors[prod.color].images[0].src}`}
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
                ))}
              </div>
              {!Object.keys(modalProduct).length ? '' : (
                  <Modal className="item-detail-modal" ref={modal} show={showModal} setShow={setShowModal}>
                    <div className="item-modal">
                      <div className="item-modal-images">
                        <Carousel className="item-modal-carousel" key={counter}>
                          {modalProduct.product.colors[modalProduct.color].images.map(im => (
                              <img
                                  src={`https://m.media-amazon.com/images/G/01/Shopbop/p${im.src}`}
                                  alt={modalProduct.product.shortDescription}
                              />
                          ))}
                        </Carousel>
                      </div>
                      <div className="item-modal-info">
                        <div className="item-modal-info-top">
                          <h3 className="item-title">{modalProduct.product.shortDescription}</h3>
                          <h5 className="item-subtitle">{modalProduct.product.designerName}</h5>
                          <div className="item-modal-info-price">{modalProduct.product.retailPrice.price}</div>
                          <div className="item-modal-info-colors">
                            {modalProduct.product.colors
                                .map((color, idx) => (
                                    <button
                                        className={classNames('item-modal-info-swatch',
                                            modalProduct.color == idx && 'item-modal-info-swatch-select')}
                                        onClick={() => {
                                          const modalProd = {...modalProduct};
                                          modalProd.color = idx;
                                          setModalProduct(modalProd);
                                        }}
                                    >
                                      <div className="item-modal-info-swatch-wrapper">
                                        <img
                                            src={`https://m.media-amazon.com/images/G/01/Shopbop/p${color.swatch.src}`}
                                            alt={color.name}
                                        />
                                      </div>
                                    </button>
                                ))
                            }
                          </div>
                        </div>
                        <div className="item-modal-info-bot">
                          <button
                              className="item-modal-info-add-btn"
                              onClick={() => outfit.add(modalProduct)}
                          >
                            Add to outfit
                          </button>
                          <a
                              className="item-modal-info-store-link"
                              href={`https://shopbop.com${modalProduct.product.productDetailUrl}`}
                          >
                            See store page
                          </a>
                        </div>
                      </div>
                    </div>
                  </Modal>
              )}
            </div>
        )}
      </UserSelection.Consumer>
  );
}