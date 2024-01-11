import { Route, Routes } from 'react-router-dom';

import Base from 'components/common/layouts/base';

import Home from 'pages/landingPage/home';

const Root = () => {
  return <App />;
};

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Base />}>
        <Route path='' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Root;
