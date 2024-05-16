import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/recommend.scss';
import Slider from 'react-slick';
import { MdNavigateNext } from 'react-icons/md';

const Recommnend = ({ anime }) => {
  console.log(anime, 'anime');
  const slider = React.useRef(null)
  let settings = {
    speed: 350,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <div  className="recommend" >
      <button className='next-btn'  onClick={() => slider?.current?.slickNext()}><MdNavigateNext size={40}/></button>
      <button className='prev-btn' onClick={() => slider?.current?.slickPrev()}><MdNavigateNext style={{rotate:"180deg"}} size={40}/></button>
      <Slider ref={slider} {...settings}>
        {anime?.recommendations?.map((item) => {
          return (
            <Link to={`/anime/${item.node.id}`} className="anime-card">
              <div className="img-container">
                <img src={item.node.main_picture.large} />
              </div>
              <div className="anime-name">
                <p>{item.node.title}</p>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default Recommnend;
