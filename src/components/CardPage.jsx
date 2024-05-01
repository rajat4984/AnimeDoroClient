import { IoClose } from 'react-icons/io5';
import '../styles/components/cardpage.scss';
import { motion } from "framer-motion"
const CardPage = () => {
  
  return (
    <motion.div initial={{y:0}} animate={{y:600}} transition={{duration:1}} className="card-page">
      <div className="overlay">
        <IoClose className="close-btn" />
      </div>
    </motion.div>
  );
};

export default CardPage;
