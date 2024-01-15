import { memo, useState } from 'react';

import { css } from '@emotion/react';

import { imgPath } from 'constants/imagePath';

import Header from 'components/common/layouts/header';

const HeaderComponent = () => {
  return (
    <Header style={{ marginBottom: '1rem' }}>
      <div css={header_wrap}>
        <div className='w-100 d-inline-flex align-items-center'>
          <a href='#a' className='banner-log'>
            <img
              src={imgPath.banner_title_logo}
              alt='banner logo'
              loading='lazy'
              data-height-percentage='42'
              data-actual-width='133'
              data-actual-height='23'
            />
          </a>
          <TopHeaderList />
        </div>
      </div>
    </Header>
  );
};

export default memo(HeaderComponent);

const TopHeaderList = () => {
  const [header_items] = useState([
    { title: 'XXXX', item: ['XXX XX', 'XXXX', 'XX', 'XXX', 'XXXX X XX', 'XXXX'] },
    { title: 'XX·XXX/XX', item: ['XXXXXXXX', 'XX XX XX', 'XX', 'XXXXXX', 'XXXXXX'] },
    { title: 'XX/XXXX', item: ['XXXXXXXX', 'XXX', 'XX X XX', 'XXXX'] },
    { title: 'XXXX', item: ['XXXXXX', 'XXXXXXXX', 'XXXXXX'] },
    { title: 'XX/XXXX', item: ['XX·XXX/XX', 'XX/XXXX', 'XXXX', 'XXXX'] },
    { title: 'XXXX', item: ['XXXX', 'XX/XXXX', 'XXXX'] }
  ]);
  return (
    <nav className='nav d-inline-flex align-items-center'>
      <>
        <ul className='top-menu li-style-none d-inline-flex flex-wrap'>
          {header_items.map((item, key) => (
            <li className='top-item' key={key} aria-label={item.title}>
              <a href='#a' className='fs-14 fw-700 lh-14 d-inline-flex align-items-center'>
                {item.title}
                <i className='material-icons'>expand_more</i>
              </a>
              <ul className='sub-menu li-style-none'>
                {item.item.map((item, key) => (
                  <li className='sub-item' key={key} aria-label={item}>
                    <a href='#a' className='fs-14 fw-500 lh-14 d-inline-flex align-items-center'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className='d-inline-flex align-items-center'>
          <a href='#a' className='header-menu-icon'>
            <i className='material-icons'>menu</i>
          </a>
        </div>
      </>
    </nav>
  );
};

const header_wrap = css`
  width: 90%;
  margin: auto;
  max-width: 1280px;
  .banner-log {
    padding: 1.8125rem 0 0;

    img {
      display: inline-block;
      vertical-align: middle;
      transition: all 0.4s ease-in-out;
      max-height: 54%;
    }
    @media (max-width: 980px) {
      img {
        max-width: 60%;
      }
    }
  }
  .nav {
    padding: 2.375rem 0 0 1.25rem;
    margin-left: auto;
    .top-menu {
      & > .top-item {
        padding-right: 1.375rem;
        &:last-of-type {
          padding: 0;
        }
        a {
          opacity: 1;
          color: rgba(0, 0, 0, 0.6);
          transition: opacity 0.2s ease-in-out;
          &:hover {
            opacity: 0.7;
          }
        }
        &:hover {
          .sub-menu {
            display: block;
            animation-duration: 0.4s;
            animation-name: slide-in;
          }
        }
      }
      & .sub-menu {
        max-width: 240px;
        height: auto;
        position: absolute;
        z-index: 9999;
        display: none;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        & > .sub-item {
          width: 100%;
          display: inline-block;
          background-color: #fff;
          transition: background-color 0.2s ease-in-out;
          a {
            opacity: 1;
            width: 100%;
            padding: 15px 24px;
            color: rgba(0, 0, 0, 0.6);
            transition: color 0.3s ease-in-out;
          }
          &:hover {
            background-color: #73a91f;
            a {
              color: #fff;
            }
          }
        }
      }

      @media (max-width: 980px) {
        display: none;
      }
    }
    .header-menu-icon {
      display: none;
      transition: all 0.2s ease-in-out;
      @media (max-width: 980px) {
        display: block;
      }
    }
  }
`;
