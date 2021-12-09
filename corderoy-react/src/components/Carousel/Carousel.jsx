import '../../styles/Carousel/Carousel.scss';
import React, {createRef} from 'react';
import classNames from 'classnames';
import LeftChevronIcon from '../../images/chevron_left_24px_outlined.svg';
import RightChevronIcon from '../../images/chevron_right_24px_outlined.svg';

export default class Carousel extends React.Component {
  static defaultProps = {
    updateIndex: () => {}
  }

  constructor(props) {
    super(props);
    this.content = createRef();
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.state = {
      currentSlide: 0
    }
  }

  slideLeft() {
    const curr = this.state.currentSlide;
    if (curr > 0) {
      const index = curr - 1;
      this.setState({currentSlide: index});
      this.props.updateIndex(index);
    }
  }

  slideRight() {
    const curr = this.state.currentSlide;
    if (curr < this.props.children.length - 1) {
      const index = curr + 1;
      this.setState({currentSlide: index});
      this.props.updateIndex(index);
    }
  }

  render() {
    return (
        <div className={classNames('Carousel', this.props.className)}>
          <div
              className="Carousel-content"
              ref={this.content}
              style={{
                transform: `translate(-${this.state.currentSlide}00%)`,
                transition: 'transform 0.5s'
              }}
          >
            {this.props.children}
          </div>
          <img className="chevron left-chevron" src={LeftChevronIcon} alt="Scroll left" onClick={this.slideLeft} />
          <img className="chevron right-chevron" src={RightChevronIcon} alt="Scroll left" onClick={this.slideRight} />
        </div>
    );
  }
}