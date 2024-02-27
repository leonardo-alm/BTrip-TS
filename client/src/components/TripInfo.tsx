import { ReactNode } from 'react';
import Wrapper from '../assets/wrappers/TripInfo';

const TripInfo = ({ icon, text }: { icon: ReactNode, text: string }) => {
  return (
    <Wrapper>
      <span className='trip-icon'>{icon}</span>
      <span className='trip-text'>{text}</span>
    </Wrapper>
  );
};
export default TripInfo;
