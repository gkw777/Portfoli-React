import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';

import Footer from 'components/common/layouts/footer';

const FooterComponent = () => {
  return (
    <Footer>
      <div css={footer_wrap}>
        <FooterNav />
        <FooterBottom />
      </div>
    </Footer>
  );
};

export default memo(FooterComponent);

const FooterNav = () => {
  const navigate = useNavigate();
  const clickHome = useCallback(() => {
    navigate('/');
  }, [navigate]);
  return (
    <div className='footer-nav'>
      <div className='footer-nav-container'>
        <ul className='footer-nav li-style-none'>
          <li>
            <a href=' ' className='fs-14 fw-500 lh-14'>
              XXX
            </a>
          </li>
          <li>
            <a href=' ' className='fs-14 fw-500 lh-14'>
              XXXX
            </a>
          </li>
          <li>
            <a href=' ' className='fs-14 fw-500 lh-14'>
              XXXX
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const FooterBottom = () => {
  return (
    <div className='footer-bottom'>
      <div className='footer-bottom-container'>
        <p className='fs-12 fw-400 lh-14'>XXXXXXXXXXXXXX XXXXXXXXXXXXXXXX</p>
        <p className='fs-12 fw-400 lh-14'>XXXXXX XXXXXXXXXXXXXXX XXXXXXXXX</p>
        <p className='fs-12 fw-400 lh-14'>XXXXXXXXXXX XXXXXXXXXXXXXXXXXXX</p>
      </div>
    </div>
  );
};

const footer_wrap = css`
  background-color: #322e43;
  .footer-nav {
    .footer-nav-container {
      max-width: 1280px;
      margin: 0 auto;
      width: 95%;
      padding: 1rem 0;

      li {
        display: inline-block;
        padding-left: 1.25rem;
        a {
          color: #28b45b;
          &:after {
            content: '|';
            color: #4b4d50;
            padding-left: 1.25rem;
          }
        }
        :first-of-type {
          padding-left: 0;
        }
        :last-of-type a:after {
          content: none;
        }
      }
    }
  }
  .footer-bottom {
    background-color: rgba(0, 0, 0, 0.32);
    .footer-bottom-container {
      max-width: 1280px;
      margin: 0 auto;
      width: 95%;
      padding: 1.25rem 0;
      p {
        color: rgba(255, 255, 255, 0.72);
      }
    }
  }
  @media (max-width: 980px) {
    .footer-nav-container > .footer-nav {
      text-align: center;
    }
    .footer-bottom > .footer-bottom-container > p {
      text-align: center;
    }
  }
`;
