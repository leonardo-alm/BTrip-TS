import { InputType, InputSelect } from '.';
import { Form, useSubmit, Link } from 'react-router-dom';
import { TRIP_TYPE, TRIP_STATUS, TRIP_SORT_BY } from '../../../utils/constants';
import { useMyTripsContext } from '../pages/MyTrips';
import Wrapper from '../assets/wrappers/DashboardFormPage';

const SearchContainer = () => {
  const { searchValues } = useMyTripsContext()!;
  const { search, tripStatus, tripType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange: (form: HTMLFormElement) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.form as HTMLFormElement;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          <InputType
            type='search'
            name='search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <InputSelect
            labelText='trip status'
            name='tripStatus'
            list={['all', ...Object.values(TRIP_STATUS)]}
            defaultValue={tripStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <InputSelect
            labelText='trip type'
            name='tripType'
            list={['all', ...Object.values(TRIP_TYPE)]}
            defaultValue={tripType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <InputSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(TRIP_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to='/dashboard' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
