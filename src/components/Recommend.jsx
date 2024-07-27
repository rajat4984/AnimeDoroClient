import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/recommend.scss';
import Slider from 'react-slick';
import { MdNavigateNext } from 'react-icons/md';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  render() {
    const { anime } = this.props;

    const settings = {
      speed: 350,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1230,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 940,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 670,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="recommend">
        {anime?.recommendations?.length && (
          <>
            <button
              className="next-btn"
              onClick={() => this.slider.current.slickNext()}
            >
              <MdNavigateNext size={40} />
            </button>
            <button
              className="prev-btn"
              onClick={() => this.slider.current.slickPrev()}
            >
              <MdNavigateNext
                style={{ transform: 'rotate(180deg)' }}
                size={40}
              />
            </button>
          </>
        )}

        <Slider ref={this.slider} {...settings}>
          {anime?.recommendations?.map((item) => (
            <Link
              key={item.node.id}
              to={`/anime/${item.node.id}`}
              className="anime-card"
            >
              <div className="img-container">
                <img src={item.node.main_picture.large} alt={item.node.title} />
              </div>
              <div className="anime-name">
                <p>{item.node.title}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Recommend;
