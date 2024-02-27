import { toast } from 'react-toastify';
import { TripsContainer, SearchContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import customAxios from '../utils/customAxios';
import { IMyTripsContext } from '../interfaces/IMyTripsContext';

export const loader = async ({ request }: { request: Request }) => {
  const params = Object.fromEntries(
    Array.from(new URL(request.url).searchParams.entries())
  );

  try {
    const { data } = await customAxios.get('/trips', {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error: any) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error('An error occurred.');
    }
    return error
  }
};

const MyTripsContext = createContext<IMyTripsContext | undefined>(undefined);

const MyTrips = () => {
  const { searchValues, data } = useLoaderData() as IMyTripsContext;

  return (
    <MyTripsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <TripsContainer />
    </MyTripsContext.Provider>
  );
};

export const useMyTripsContext = () => useContext(MyTripsContext);

export default MyTrips;
