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
import { format, startOfDay, sub } from 'date-fns';
import { useEffect, useState } from 'react';

const CardPage = () => {
  const { data: chartData } = useSelector((store) => store.chart);
  const { isOpen: isChartOpen } = useSelector((store) => store.chart);
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);
  const [monthEnd, setMonthEnd] = useState(4);
  const [firstSevenData, setFirstSevenData] = useState(
    chartData?.pomoData?.slice(start, end)
  );
  const [isWeek, setIsWeek] = useState(false);
  const monthMap = new Map();

  useEffect(() => {
    setFirstSevenData(chartData?.pomoData?.slice(start, end));
  }, [start, end]);

  const getMonthsMap = () => {
    for (let i = start; i < monthEnd; i++) {
      let currentDate = startOfDay(new Date());
      console.log(currentDate, 'currentbefore');
      currentDate.setMonth(currentDate.getMonth() - i);

      monthMap.set(currentDate, {});
    }
    console.log(monthMap, 'monthmap');
  };

  useEffect(() => {
    getMonthsMap();
  }, [isWeek, monthEnd]);

  const animateVariants = {
    open: { opacity: 1, y: 0, x: 5 },
    close: { opacity: 0, y: 1600 },
  };

  const handleNext = () => {
    if (end < chartData?.pomoData?.length) {
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

  const handleNextMonth = () => {
    if (monthMap.get > startOfDay(new Date()).setMonth(startOfDay(new Date()).getMonth())) {
      setMonthEnd((prev) => prev - 1);
      setStart((prev) => prev - 1);
    }
  };

  const handlePrevMonth = () => {
    if (end <= 12) {
      setMonthEnd((prev) => prev + 1);
      setStart((prev) => prev + 1);
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
              {chartData?.pomoData
                ?.reduce((total, item) => {
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

            <p>{chartData?.pomoData?.length}</p>
            <p>days accessed</p>
          </div>

          <div className="flex-card">
            <div className="icon">
              <AiOutlineFire size={18} />
            </div>

            <p>{chartData?.streak}</p>
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
                id="month"
                type="radio"
                name="time-period"
                onChange={() => {
                  setIsWeek(false);
                  setStart(0);
                }}
              />
              <label htmlFor="month">Month</label>
            </div>
            <div className="week">
              <input
                defaultChecked
                id="week"
                type="radio"
                name="time-period"
                onChange={() => {
                  setIsWeek(true), setStart(0);
                }}
              />
              <label htmlFor="week">Week</label>
            </div>
          </div>
          <div className="btn-group">
            <GrPrevious
              className="prev-btn"
              onClick={isWeek ? handlePrev : handlePrevMonth}
              size={10}
            />
            <GrPrevious
              className="next-btn"
              onClick={isWeek ? handleNext : handleNextMonth}
              size={10}
            />
          </div>
        </div>
        <BarChart isWeek={isWeek} data={firstSevenData} />
      </div>
    </motion.div>
  );
};

export default CardPage;
