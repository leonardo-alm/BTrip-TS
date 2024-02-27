import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaPlane } from "react-icons/fa";
import { ImProfile } from 'react-icons/im';


const links = [
  {
    text: 'my trips',
    path: '.',
    icon: <MdQueryStats />,
  },
  {
    text: 'add trip',
    path: 'add-trips',
    icon: <FaPlane />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default links;
