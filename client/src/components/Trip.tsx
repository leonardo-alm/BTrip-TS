import { FaPlaneArrival, FaPlaneDeparture, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Trip';
import TripInfo from './TripInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { ITrip } from '../interfaces/ITrip';
day.extend(advancedFormat);

const Trip = ({
  _id,
  tripTo,
  tripFrom,
  tripType,
  tripDate,
  tripStatus,
}: ITrip) => {
  const date = day(tripDate).format('MMM Do, YYYY');
  const airportCode = tripTo.substring(tripTo.length - 3);

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{airportCode}</div>
        <div className='info'>
          <h5>{tripType}</h5>
          <p>{tripTo}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <TripInfo icon={<FaPlaneDeparture />} text={tripFrom} />
          <TripInfo icon={<FaPlaneArrival />} text={tripTo} />
          <TripInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${tripStatus}`}>{tripStatus}</div>
        </div>
        <footer className='actions'>
          <Link to={`edit-trip/${_id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`delete-trip/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Trip;
