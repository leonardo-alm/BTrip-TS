import { TRIP_STATUS, TRIP_TYPE, TRIP_LOCATION } from '../../../utils/constants';
import { InputType, InputSelect, SubmitBtn } from '../components';
import { Params, useLoaderData } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import customAxios from '../utils/customAxios';
import { ITrip } from '../interfaces/ITrip';

day.extend(advancedFormat);

export const loader = async ({ params }: { params: Params }) => {
  try {
    const { data } = await customAxios.get(`/trips/${params.id}`);
    console.log(data);
    return data;
  } catch (error: any) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error('An error occurred.');
    }
    return redirect('/dashboard');
  }
}


export const action = async ({ request, params }: { request: Request, params: Params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customAxios.patch(`/trips/${params.id}`, data);
    toast.success('Trip edited successfully');
    return redirect('/dashboard');
  } catch (error: any) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
    else {
      toast.error('An error occurred.');
    }
    return error;
  };
}

const EditTrip = () => {
  const { trip } = useLoaderData() as { trip: ITrip }
  const tripDate = day(trip.tripDate).format('YYYY-MM-DD');

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit trip</h4>
        <div className='form-center'>
          <InputSelect
            labelText='from'
            name='tripFrom'
            defaultValue={trip.tripFrom}
            list={Object.values(TRIP_LOCATION)}
          />
          <InputSelect
            labelText='to'
            name='tripTo'
            defaultValue={trip.tripTo}
            list={Object.values(TRIP_LOCATION)}
          />
          <InputType type='date'
            labelText='when'
            name='tripDate'
            defaultValue={tripDate}
          />
          <InputSelect
            name='tripStatus'
            labelText='trip status'
            defaultValue={trip.tripStatus}
            list={Object.values(TRIP_STATUS)}
          />
          <InputSelect
            name='tripType'
            labelText='trip type'
            defaultValue={trip.tripType}
            list={Object.values(TRIP_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditTrip;
