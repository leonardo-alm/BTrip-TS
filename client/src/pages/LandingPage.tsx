import { Link, redirect } from 'react-router-dom';
import world from '../assets/images/world.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import customAxios from '../utils/customAxios';

export const loader = async () => {
  try {
    const { data } = await customAxios.get('/users/current-user');
    if (data) return redirect('/dashboard');
    return null
  } catch (error) {
    return null
  }
};

const LandingPage = () => {
  return (
    <Wrapper>
      <div className='container page'>
        <div className='info'>
          <h1>
            Welcome to <span>BTrip</span>
          </h1>
          <p>
            Ready to elevate your business travel experience? Subscribe to BTrip
            now and embark on a journey of efficiency, convenience, and stress-free
            business trips. It's time to redefine the way you travel for work!
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login
          </Link>
        </div>
        <img src={world} alt='world' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default LandingPage;
