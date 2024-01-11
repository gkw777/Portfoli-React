import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import Root from './app';

import './index.css';
import './styles/common.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </BrowserRouter>
);
