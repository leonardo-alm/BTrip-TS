import img from '../assets/images/tripstats.svg'
import { FaPlaneCircleCheck, FaPlaneCircleExclamation, FaPlaneCircleXmark } from "react-icons/fa6";
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
import { IDefaultStats } from '../interfaces/IDefaultStats';

const StatsContainer = ({ defaultStats }: { defaultStats: IDefaultStats }) => {
  const stats = [
    {
      title: 'pending trips',
      count: defaultStats?.pending || 0,
      icon: <FaPlaneCircleExclamation />,
      color: '#E6600D',
      bcg: '#FABD64',
    },
    {
      title: 'confirmed trips',
      count: defaultStats?.confirmed || 0,
      icon: <FaPlaneCircleCheck />,
      color: '#759421',
      bcg: '#ABE2AB',
    },
    {
      title: 'cancelled trips',
      count: defaultStats?.cancelled || 0,
      icon: <FaPlaneCircleXmark />,
      color: '#C14646',
      bcg: '#FF8888',
    },
  ];
  return (
    <Wrapper>
      <div className='stats-data'>
        {stats.map((item) => {
          return <StatItem key={item.title} {...item} />;
        })}
      </div>
      <div className='img'>
        <img src={img} alt='no trips' />
      </div>

    </Wrapper>
  );
};
export default StatsContainer;
