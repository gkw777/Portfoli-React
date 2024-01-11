import { useCallback, useState } from 'react';

import { css } from '@emotion/react';

import classNames from 'classnames';

import { imgPath } from 'constants/imagePath';

import Main from 'components/common/layouts/main';
import Section from 'components/common/layouts/section';

const MainComponent = () => {
  return (
    <Main css={main_wrap}>
      <Section>
        <Section1 />
      </Section>
      <Section>
        <Section2 />
      </Section>
      <Section>
        <Section3 />
      </Section>
      <Section>
        <Section4 />
      </Section>
    </Main>
  );
};

export default MainComponent;

const Section1 = () => {
  return (
    <div className='section-1 position-relative'>
      <div className='slide-container'>
        <div className='slide-container-inner'>
          <h1 className='slide-title fs-24 fw-900 lh-24'>푸른 물, 맑은 공기, 깨끗한 토양</h1>
          <p className='slide-content fs-18 fw-400 lh-18'>세계로 나아가는 토탈환경전문기업</p>
        </div>
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <div className='section-2'>
      <div className='section-2-container-row'>
        <div className='section-2-container-column'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a'>
                <img src={imgPath.service01} alt='service 04' loading='lazy' />
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className=' fs-14 fw-400 lh-20'>
                토양/지하수
              </a>
            </div>
          </div>
        </div>
        <div className='section-2-container-column'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a'>
                <img src={imgPath.service02} alt='service 04' loading='lazy' />
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className=' fs-14 fw-400 lh-20'>
                반입정화시설
              </a>
            </div>
          </div>
        </div>
        <div className='section-2-container-column'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a'>
                <img src={imgPath.service01} alt='service 04' loading='lazy' />
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className=' fs-14 fw-400 lh-20'>
                토양환경평가
              </a>
            </div>
          </div>
        </div>
        <div className='section-2-container-column'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a'>
                <img src={imgPath.service03} alt='service 04' loading='lazy' />
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className=' fs-14 fw-400 lh-20'>
                플라스틱시트파일
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <div className='section-3'>
      <div className='section-3-container-row'>
        <div className='section-3-container-column bg-column-1'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a' className='fs-24 fw-400 lh-24'>
                <span className='material-icons'>add</span>
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className='fs-24 fw-400 lh-24'>
                오염토양 발견시
              </a>
            </div>
          </div>
        </div>
        <div className='section-3-container-column bg-column-2'>
          <div className='column'>
            <div className='column-image'>
              <a href='#a' className='fs-24 fw-400 lh-24'>
                <span className='material-icons'>add</span>
              </a>
            </div>
            <div className='column-content'>
              <a href='#a' className='fs-24 fw-400 lh-24'>
                충주 반입정화시설
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section4 = () => {
  const [play, setPaly] = useState(false);
  const handleClickPlay = useCallback(() => {
    setPaly(true);
  }, []);
  return (
    <div className='section-4'>
      <div className='section-4-container-row'>
        <div className='section-4-container-column'>
          <div className='column'>
            <div className={classNames('video-box', play ? 'video-play' : '')}>
              <iframe
                className='fluid-width-video-wrapper'
                id='fitvid0'
                src={`https://www.youtube.com/embed/oFeahD-ZePE?${play ? 'autoplay=1&amp;' : ''}feature=oembed`}
                allowfullscreen
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                title='[K-Tech Green Solutions] Soil Purification Company ‘Beautiful Environmental Construction’'
              />
            </div>
            <div className={classNames('video-overlap', play ? 'video-overlap-hidden' : '')}>
              <div className='video-overlap-hover' onClick={handleClickPlay}>
                <span className='material-icons'>play_circle</span>
              </div>
            </div>
          </div>
        </div>
        <div className='section-4-container-column'>
          <div className='column column-news'>
            <div className='news-1'>
              <p className='fs-24 fw-700 lh-24' style={{ marginBottom: 20 }}>
                BEC&nbsp;<span>새소식</span>
              </p>
              <div className='news-description'>
                <p className='fs-20 fw-600 lh-20' style={{ marginBottom: 10 }}>
                  경기도 우수환경기업 지정
                </p>
                <p className='fs-14 fw-400 lh-14'>[이뉴스투데이 강의석 기자] 경기도가 우수한 환경기술로 높은 성장잠재력을 지닌 도내 중소 환경기업</p>
              </div>
            </div>
            <div className='news-2'>
              <p className='fs-24 fw-700 lh-24' style={{ marginBottom: 20 }}>
                BEC&nbsp;<span>사업실적</span>
              </p>
              <div className='news-description'>
                <p className='fs-20 fw-600 lh-20' style={{ marginBottom: 10 }}>
                  Fuel Recovery at 5 Camp Bioslurping
                </p>
                <p className='fs-14 fw-400 lh-14'>5개 Site 내 195개 관정 설치 5개 Site 내 처리장치 총 12 System 설치 및 운영</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const main_wrap = css`
  .section-1 {
    width: 100%;
    height: 100%;
    min-height: 480px;
    background-position: bottom right;
    background-repeat: no-repeat;
    background-image: url('assets/imgs/bg_world_1.jpg');
    background-size: cover;
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: #322e43;
      opacity: 0.38;
    }
    .slide-container {
      max-width: 1280px;
      position: relative;
      min-height: 480px;
      width: 80%;
      margin: 0 auto;
      display: table;
      table-layout: fixed;
      .slide-container-inner {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        padding: 0 6%;
        .slide-title {
          position: relative;
          margin: auto;
          margin-bottom: 10px;
          padding: 12px 0;
          color: #fff;
          &::before {
            position: absolute;
            content: '';
            top: -10px;
            left: -35px;
            width: 20px;
            height: 80px;
            border-left-width: 7px;
            border-left-style: solid;
            border-bottom-width: 7px;
            border-bottom-style: solid;
            border-color: #73a91f;

            @media (max-width: 766px) {
              top: -5px;
              left: -20px;
              width: 10px;
              height: 60px;
              border-left-width: 5px;
              border-bottom-width: 5px;
            }
          }
          &::after {
            position: absolute;
            content: '';
            top: -10px;
            left: -35px;
            width: 80px;
            height: 15px;
            border-right-width: 7px;
            border-right-style: solid;
            border-top-width: 7px;
            border-top-style: solid;
            border-color: #73a91f;
            @media (max-width: 766px) {
              top: -5px;
              left: -20px;
              width: 55px;
              height: 10px;
              border-right-width: 5px;
              border-top-width: 5px;
            }
          }
        }
        .slide-content {
          color: #fff;
          @media (max-width: 766px) {
            font-size: 14px;
          }
        }
      }
    }
  }
  .section-2 {
    width: 100%;
    max-width: 1280px;
    margin: auto;
    .section-2-container-row {
      display: flex;

      .section-2-container-column {
        width: 25%;
        text-align: center;
        direction: ltr;
        .column {
          .column-content a {
            color: #333;
          }
          background-color: #efefef;
          padding: 30px 0;
          margin-top: 1px;
          margin-left: 2px;
          :hover {
            background-color: #c4ddae;
          }
        }
      }
      .section-2-container-column:first-of-type > .column {
        margin-left: 0;
      }
    }
    @media (max-width: 479px) {
      .section-2-container-row {
        .section-2-container-column {
          width: 100% !important;
          :nth-child(2) > .column,
          :nth-child(4) > .column {
            margin-left: 0;
          }
        }
      }
    }
    @media (max-width: 980px) {
      width: 98%;
      .section-2-container-row {
        flex-wrap: wrap;
        .section-2-container-column {
          width: 50%;
          :nth-child(1) > .column,
          :nth-child(3) > .column {
            margin-left: 0;
          }
        }
      }
    }
  }
  .section-3 {
    width: 100%;
    max-width: 1280px;
    margin: auto;
    .section-3-container-row {
      display: flex;
      .section-3-container-column.bg-column-1 {
        background-position: center right;

        background-image: url('assets/imgs/bg_world_2.jpg');
      }
      .section-3-container-column.bg-column-2 {
        background-position: center left;

        background-image: url('assets/imgs/bg_world_3.jpg');
      }
      .section-3-container-column {
        background-repeat: no-repeat;
        background-size: cover;
        width: 50%;
        .column {
          .column-image {
            margin-bottom: 14px;
            a {
              color: #fff;
            }
          }
          .column-content a {
            color: #fff;
            text-shadow: 0.08em 0.08em 0.08em rgba(0, 0, 0, 0.4);
          }
          padding: 12px 20px 42px 26px;
          margin-top: 174px !important;
        }
      }
      .section-3-container-column:not(.bg-column-2) {
        .column {
          background-color: rgba(114, 170, 53, 0.86);
        }
      }
      .section-3-container-column:not(.bg-column-1) {
        .column {
          background-color: rgba(139, 114, 74, 0.86);
        }
      }
    }
    @media (max-width: 980px) {
      width: 98%;
      .section-3-container-row {
        flex-wrap: wrap;
        .section-3-container-column {
          width: 100% !important;
        }
      }
    }
  }
  .section-4 {
    width: 100%;
    max-width: 1280px;
    margin: auto;
    .section-4-container-row {
      display: flex;
      .section-4-container-column {
        width: 50%;
      }
      .section-4-container-column {
        min-height: 350px;

        .column {
          position: relative;
          height: 100%;
          .video-box {
            display: none;
            position: relative;
            height: 100%;
            .fluid-width-video-wrapper {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 0;
            }
          }
          .video-box.video-play {
            display: block;
          }
          .video-overlap:not(.video-overlap-hidden) {
            position: relative;
            display: table;
            table-layout: fixed;
            width: 100%;
            height: 100%;
            cursor: pointer;

            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url('assets/imgs/bg_wolrd_video.jpg');

            .video-overlap-hover {
              width: 100%;
              text-align: center;
              display: table-cell;
              vertical-align: middle;

              background: rgba(0, 0, 0, 0);
              transition: all 0.4s ease-in-out;
              & > span {
                color: #fff;
                font-size: 6rem !important;
              }

              :hover {
                background: rgba(0, 0, 0, 0.6);
              }
            }
          }
          .video-overlap.video-overlap-hidden {
            display: none;
          }
        }
        .column.column-news {
          padding: 10px;
          .news-1,
          .news-2 {
            height: calc(50% - 5px);
            border: 1px solid #e1e1e1;
            padding: 30px 10px;

            p {
              color: #333;
              text-align: center;
              & > span {
                color: #44b034;
              }
            }
            .news-description {
              padding: 0 8%;
            }
          }
          .news-2 {
            margin-top: 10px;
          }
        }
      }
    }
    @media (max-width: 980px) {
      width: 98%;
      .section-4-container-row {
        flex-wrap: wrap;
        .section-4-container-column {
          width: 100% !important;
        }
      }
    }
  }
`;
