import { IoClose } from 'react-icons/io5';
import '../styles/components/cardpage.scss';
import { delay, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardPage } from '../redux/chartSlice/chartSlice';
import BarChart from './BarChart';
import { GoClock } from 'react-icons/go';
import { SlCalender } from 'react-icons/sl';
import { AiOutlineFire } from 'react-icons/ai';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";

const CardPage = () => {
  const { isOpen: isChartOpen } = useSelector((store) => store.chart);
  const dispatch = useDispatch();

  const animateVariants = {
    open: { opacity: 1, y: 0, x: 5 },
    close: { opacity: 0, y: 1600 },
  };

  return (
    <motion.div
      className="card-page"
      animate={isChartOpen ? 'open' : 'close'}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.2,
      }}
      variants={animateVariants}
    >
      <IoClose
        className="close-btn"
        onClick={() => {
          dispatch(toggleCardPage());
        }}
      />
      <div className="activities">
        <h4>Activities</h4>
        <div className="flex">
          <div className="flex-card">
            <div className="icon">
              <GoClock size={18} />
            </div>

            <p>10.2</p>
            <p>hours focused</p>
          </div>

          <div className="flex-card">
            <div className="icon">
              <SlCalender size={18} />
            </div>

            <p>25</p>
            <p>days accessed</p>
          </div>

          <div className="flex-card">
            <div className="icon">
              <AiOutlineFire size={18} />
            </div>

            <p>2</p>
            <p>days streak</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="chart-info">
        <div className="flex">
          <div className="time">
            <div className="month">
              <input defaultChecked id="month" type="radio" name="time-period" />
              <label htmlFor="month">Month</label>
            </div>
            <div className="week">
              <input id="week" type="radio" name="time-period" />
              <label htmlFor="week">Week</label>
            </div>
          </div>
          <div className='btn-group'>
            <GrPrevious className='prev-btn' size={10}/>
            <GrPrevious className='next-btn' size={10}/>
          </div>
        </div>
        <BarChart/>
      </div>
    </motion.div>
  );
};

export default CardPage;
