import { createContext } from 'react';

import FooterContainer from './footer';
import HeaderContainer from './header';
import MainContainer from './main';

const homeContext = createContext();
const HomeContainer = () => {
  return (
    <homeContext.Provider value={{}}>
      <HeaderContainer />
      <MainContainer />
      <FooterContainer />
    </homeContext.Provider>
  );
};

export default HomeContainer;
