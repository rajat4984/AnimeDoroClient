import Slider from 'react-slick';
import { Link } from 'react-router-dom';


const RecSlider = ({slider,settings}) => {
  return (
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
  )
}

export default RecSlider

