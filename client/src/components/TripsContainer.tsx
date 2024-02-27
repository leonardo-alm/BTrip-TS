import Trip from './Trip';
import Wrapper from '../assets/wrappers/TripsContainer';
import { useMyTripsContext } from '../pages/MyTrips';
import Pagenation from './Pagenation';
import img from '../assets/images/nodata.svg';

const TripsContainer = () => {
  const { data } = useMyTripsContext()!;

  const { trips, totalTrips, numOfPages } = data;
  if (trips.length === 0) {
    return (
      <Wrapper>
        <div className='no-trips'>
          <h2>No trips to display...</h2>
          <img src={img} alt='no trips' />
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalTrips} trip{trips.length > 1 && 's'} found
      </h5>
      <div className='trips'>
        {trips.map((trip) => {
          return <Trip key={trip._id.toString()} {...trip} />;
        })}
      </div>
      {numOfPages > 1 && <Pagenation />}
    </Wrapper>
  );
};
export default TripsContainer;
