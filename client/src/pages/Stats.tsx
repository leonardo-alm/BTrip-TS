import { StatsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { IDefaultStats } from '../interfaces/IDefaultStats';
import customAxios from '../utils/customAxios';

export const loader = async () => {
  const response = await customAxios.get('/trips/stats');
  console.log(response);
  
  return response.data;
};

const Stats = () => {
  const { defaultStats } = useLoaderData() as { defaultStats: IDefaultStats }
  console.log(defaultStats);
  

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
    </>
  );
};

export default Stats;
