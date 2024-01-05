import { css } from '@emotion/react';

const Home = () => {
  return (
    <div className='search-icon' css={home_wapper}>
      <i className='material-symbols-outlined'>Menu</i>
      Home
    </div>
  );
};

export default Home;

const home_wapper = css`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  :hover {
    color: red;
  }
`;
