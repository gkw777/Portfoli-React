import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import Root from './app';

import './index.css';
import './styles/common.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </HashRouter>
);
