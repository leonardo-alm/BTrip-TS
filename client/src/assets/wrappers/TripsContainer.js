import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 2rem;
  h2 {
    text-transform: none;
    margin-bottom: 3rem;
  }
  img {
    width: 20%;
    height: 10%;
  }

.no-trips{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .trips {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .trips {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
