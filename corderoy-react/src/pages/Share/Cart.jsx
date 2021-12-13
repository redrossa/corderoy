import '../../styles/Share/Cart.scss'
import React from 'react';
import classNames from 'classnames';
import {UserSelection} from '../../components/UserSelection';
import {Card, CardImg} from '../../components/Card';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

export default class Cart extends React.Component {
  static contextType = UserSelection;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: null,
      titleInput: ''
    }
  }

  parseThemes(desc) {
    return [...desc.matchAll('#[\\w]+')].map(groups => groups[0]);
  }

  async handleSubmit(event, outfit) {
    const localDate = new Date();
    const dateFmt = [
        String(localDate.getUTCFullYear()).padStart(4, '0'),
        String(localDate.getUTCMonth() + 1).padStart(2, '0'),
        String(localDate.getUTCDate()).padStart(2, '0')
    ].join('-') + ' ' + [
        String(localDate.getUTCHours()).padStart(2, '0'),
        String(localDate.getUTCMinutes()).padStart(2, '0'),
        String(localDate.getUTCSeconds()).padStart(2, '0')
    ].join(':')

    const post = {
      title: event.target.title.value,
      desc: event.target.desc.value,
      date: dateFmt,
      price: outfit.totalPrice(),
      likes: 0,
      themes: this.parseThemes(event.target.desc.value),
      designers: outfit.designers(),
      collections: outfit.collections(),
      parts: outfit.parts(),
      products: outfit.items,
      comments: []
    };

    await axios.post('/api/outfit', post)
        .then(res => {
          this.setState({redirect: '/'});  // Redirect to home page
        });

    outfit.clear();
  }

  render() {
    if (this.state.redirect) {
      const link = this.state.redirect;
      this.setState({redirect: null});
      return <Navigate to={link} push={true}/>
    }

    const outfit = this.context;
    return (
        <div className={classNames('Cart', this.props.className)}>
          <div className="container">
            <div className="items-preview">
              {Object.entries(outfit.items).filter(([part, partItems]) => Object.keys(partItems).length).map(([part, partItems]) => (
                  <div className="items-part">
                    <h3>{part}</h3>
                    <div className="items-container">
                      {Object.values(partItems).map(item => (
                          <div className="item">
                            <div className="left-col">
                              <Card className="item-card">
                                <CardImg
                                    src={`https://m.media-amazon.com/images/G/01/Shopbop/p${item.product.colors[item.color].images[0].src}`}
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
            <form action="javascript:void(0);" method="post" id="share-form" onSubmit={event => this.handleSubmit(event, outfit)}>
              <div className="share-bar">
                <div className="top">
                  <input type="text" name="title" placeholder="Title" onInput={e => this.setState({titleInput: e.target.value})} />
                  <hr />
                  <textarea name="desc" placeholder="Description" />
                </div>
                <div className="bottom">
                  <hr />
                  <div className="total">
                    TOTAL: {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(outfit.totalPrice())}
                  </div>
                  <button
                      disabled={!outfit.size() || !this.state.titleInput}
                      type="submit"
                      form="share-form"
                      value="Share"
                  >
                    Share
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}