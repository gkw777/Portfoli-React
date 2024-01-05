import { Route, Routes } from 'react-router-dom';

import Home from 'pages/landingPage/home';

const Root = () => {
  return <App />;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

export default Root;
