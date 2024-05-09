import { IoClose } from 'react-icons/io5';
import '../styles/components/cardpage.scss';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardPage } from '../redux/chartSlice/chartSlice';
import BarChart from './BarChart';
import { GoClock } from 'react-icons/go';
import { SlCalender } from 'react-icons/sl';
import { AiOutlineFire } from 'react-icons/ai';
import { GrPrevious } from 'react-icons/gr';
import { Data } from '../data';
import { useEffect, useState } from 'react';

const CardPage = () => {
  const { data: chartData } = useSelector((store) => store.chart);
  // console.log(chartState, 'chartState');
  const { isOpen: isChartOpen } = useSelector((store) => store.chart);
  const userState = useSelector((store) => store.user);
  // console.log(data, 'data');
  // console.log(userState, 'userState');
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);
  // const firstSevenData = Data.slice(start, end);
  const [firstSevenData, setFirstSevenData] = useState(
    chartData.pomoData.slice(start, end)
  );

  useEffect(() => {
    setFirstSevenData(chartData.pomoData.slice(start, end));
  }, [start, end]);

  const animateVariants = {
    open: { opacity: 1, y: 0, x: 5 },
    close: { opacity: 0, y: 1600 },
  };

  const handleNext = () => {
    if (end < Data.length - 1) {
      setStart((prev) => prev + 1);
      setEnd((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
      setEnd((prev) => prev - 1);
    }
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

            <p>
              {chartData.pomoData
                .reduce((total, item) => {
                  console.log(item.TotalTime, 'HEllo');
                  return (total + item.TotalTime) / 60;
                }, 0)
                .toFixed(2)}
            </p>
            <p>hours focused</p>
          </div>

          <div className="flex-card">
            <div className="icon">
              <SlCalender size={18} />
            </div>

            <p>{chartData.pomoData.length}</p>
            <p>days accessed</p>
          </div>

          <div className="flex-card">
            <div className="icon">
              <AiOutlineFire size={18} />
            </div>

            <p>{chartData.streak}</p>
            <p>days streak</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="chart-info">
        <div className="flex">
          <div className="time">
            <div className="month">
              <input
                defaultChecked
                id="month"
                type="radio"
                name="time-period"
              />
              <label htmlFor="month">Month</label>
            </div>
            <div className="week">
              <input id="week" type="radio" name="time-period" />
              <label htmlFor="week">Week</label>
            </div>
          </div>
          <div className="btn-group">
            <GrPrevious className="prev-btn" onClick={handlePrev} size={10} />
            <GrPrevious className="next-btn" onClick={handleNext} size={10} />
          </div>
        </div>
        <BarChart data={firstSevenData} />
      </div>
    </motion.div>
  );
};

export default CardPage;
