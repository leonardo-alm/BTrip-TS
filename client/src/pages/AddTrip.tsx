import { TRIP_STATUS, TRIP_TYPE, TRIP_LOCATION } from '../../../utils/constants';
import { InputType, InputSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customAxios from '../utils/customAxios';
import img from '../assets/images/plane.svg'

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customAxios.post('/trips', data);
    toast.success('Trip added successfully ');
    return redirect('/dashboard');

  } catch (error: any) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    } else {
      toast.error('An error occurred.');
    }
    return error
  }
};

const AddTrip = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h3 className='form-title'>add trip</h3>
        <div className='form-center'>
          <InputSelect
            labelText='from'
            name='tripFrom'
            defaultValue={TRIP_LOCATION.POA}
            list={Object.values(TRIP_LOCATION)}
          />
          <InputSelect
            labelText='to'
            name='tripTo'
            defaultValue={TRIP_LOCATION.FRA}
            list={Object.values(TRIP_LOCATION)}
          />
          <InputType type='date' labelText='when' name='tripDate' />
          <InputSelect
            labelText='status'
            name='tripStatus'
            defaultValue={TRIP_STATUS.PENDING}
            list={Object.values(TRIP_STATUS)}
          />
          <InputSelect
            labelText='type'
            name='tripType'
            defaultValue={TRIP_TYPE.CLIENT_MEETING}
            list={Object.values(TRIP_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>

      </Form>
      <div className='img'>
        <img src={img} alt='airplane' />
      </div>
    </Wrapper>
  );
};

export default AddTrip;
