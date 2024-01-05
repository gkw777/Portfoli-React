import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import _ from 'lodash';

/**
 * 기본 언어 설정
 */
export const DEFAULT_LANGUAGE = 'en'; // en-US
/**
 * 이메일 인증코드 자릿수
 */
export const EMAIL_VERIFY_CODE = 8;
/**
 * 이메일 최소 자릿수
 */
export const EMAIL_MIN_COUNT = 3;
/**
 * 아이디 최소 자릿수
 */
export const USERID_MIN_COUNT = 6;
/**
 * 비밀번호 최소 자릿수
 */
export const PASSWORD_MIN_COUNT = 8;
/**
 * 레퍼럴 코드 자릿수
 */
export const REFERRAL_CODE = 8;
/**
 * 이미지 파이 크기
 */
export const FILE_IMAGE_SIZE = 10;
/**
 * 비디오 파이 크기
 */
export const FILE_VIDEO_SIZE = 50;
/**
 * 카드 넘버 자리수
 */
export const CARD_NUMBER_COUNT = 16;

export const createSearchParams = (obj = {}, base = {}) => {
  const result = _.reduce(
    obj,
    (searchParams, value, key) => {
      // URLSearchParams 객체의 인스턴스로 변경
      if (value instanceof Array) {
        searchParams.delete(key);
        _.forEach(value, (item) => {
          return searchParams.append(key, item.toString());
        });
        // append는 추가, set은 덮어쓰기
      } else if (value !== undefined && value !== '') {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
      return searchParams;
    },
    new URLSearchParams(base)
  ).toString();

  return result === '' ? '' : `?${result}`;
};

export const createFormData = (obj = {}) => {
  return _.reduce(
    obj,
    (form, value, key) => {
      if (value === 0 || value) {
        if (value instanceof Array) {
          _.forEach(value, (item) => {
            if (item instanceof File) {
              form.append(key, item);
            } else {
              form.append(key, item.toString());
            }
          });
        } else if (value instanceof File) {
          // 데이터 형식이 file일 때 예외처리
          form.append(key, value);
        } else {
          form.append(key, value.toString());
        }
      } else {
        form.delete(key);
      }
      return form;
    },
    new FormData()
  );
};

/**
 * 암호화
 */
export const encrypt = (value) => {
  let data = value;
  if (typeof data === 'number') {
    data = data.toString();
  }

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_key-1');
  return encodeURIComponent(encrypted.toString());
};

/**
 * 복호화
 */
export const decrypt = (value) => {
  const decrypted = CryptoJS.AES.decrypt(value, 'secret_key-1');

  return decodeURIComponent(decrypted.toString(CryptoJS.enc.Utf8));
};

// 남은 시간( 일 / 시 / 분 / 초 )
export const getCountFullTimer = (value) => {
  const remainTime = new Date(value * 1000);
  const todayTime = new Date();
  const diff = remainTime - todayTime;
  if (diff <= 0) return 0;

  const diffDay = String(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const diffHour = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const diffMin = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const diffSec = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  return `${parseInt(diffDay) > 0 ? `${diffDay}D ${diffHour}:` : parseInt(diffHour) > 0 ? `${diffHour}:` : ''}${diffMin}:${diffSec}`;
};

/**
 * 윈도우 크기
 * return Array
 */
const delay = 100;
let timer = null;
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        setSize([window.innerWidth, window.innerHeight]);
      }, delay);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      return window.removeEventListener('resize', updateSize);
    };
  }, []);
  return size;
};

/**
 * 랜덤으로 이름 생성
 */
export const getRandomName = () => {
  return Math.random().toString(36).substring(2, 11);
};
/**
 * 두 값이 동일 여부 체크
 */
export const isEqual = (x, y) => {
  return _.isEqual(x, y);
};

export const isSignin = () => {
  return localStorage.getItem('accessToken') !== null;
};

export const getAssociationName = () => {
  const partner = localStorage.getItem('association_name');
  return partner !== null ? partner : '';
};

export const changeTitle = (subTitle = undefined) => {
  const baseTitle = 'Willet[admin]';
  const htmlTitle = document.querySelector('title');
  let newTitle;
  if (subTitle) {
    newTitle = `${subTitle.trim()} · ${baseTitle}`;
  } else {
    newTitle = baseTitle;
  }
  htmlTitle.innerText = newTitle;
};

/**
 * 현재 시각 기준으로 다음주 월요일을 가져온다
 * @param {Date} date // Date
 * @param {Number} day // UTC Day
 * @returns Date
 * 
* Example:
* ```
const toDayDate = new Date();
const nextDate = searchNextMondayUTCDate(toDayDate);
let dateArr = nextDate.toUTCString().split(" ");
const year = dateArr[3];
const month = dateArr[2];
const day = dateArr[1];
let nextMonday = `${month} ${day}, ${year}`;
* ```
 */
export const searchNextMondayUTCDate = (date) => {
  if (!date) return null;

  const thisDate = date;
  thisDate.setUTCHours(0, 0, 0, 0);
  const day = thisDate.getUTCDay();
  const calcDate = thisDate.getUTCDate() - day + ((day === 0 ? 1 : 8) + 0);
  const nextDate = new Date(thisDate.setUTCDate(calcDate));
  return nextDate;
};

export const UTCDateString = (timestamp, nonValue = '-') => {
  if (!timestamp) {
    return nonValue;
  }
  const date = new Date(timestamp);
  const dateArr = date.toUTCString().split(' ');
  const timeArr = dateArr[4].split(':');
  const year = dateArr[3];
  const month = dateArr[2];
  const day = dateArr[1];
  const hours = (parseInt(timeArr[0]) % 12).toString().padStart(2, '0');
  const minutes = timeArr[1];
  return `${month} ${day}, ${year} / ${hours}:${minutes}${date.getUTCHours() >= 12 ? 'PM' : 'AM'}`;
};
export const tsToDateString = (timestamp, nonValue = '-') => {
  if (!timestamp) {
    return nonValue;
  }
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().substr(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  // const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minute}`;
};

/**
 * 자릿수 모두 표출
 * @param {float | number} value number
 * @param {number} digit 소수점 자리수
 * @returns string
 */
export const locale = (value) => {
  if (value === undefined || value === null) return value;

  const separations = value.toString().split('.');
  if (separations.length === 1) {
    return value.toLocaleString();
  }
  return `${parseInt(separations[0]).toLocaleString()}.${separations[1]}`;
};

/**
 * 소수점 자릿수만큼 표출 ( 해당 자리수까지만 표시하고 버림처리 )
 * @param {float | number} value number
 * @param {number} digit 소수점 자리수
 * @returns string
 */
export const getPriceDigit = (value, digit = 8) => {
  if (value === undefined || value === null) {
    return '0';
  }
  if (value === '') {
    return '0';
  }

  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }

  const separations = value.toString().split('.');
  if (separations.length === 1 && digit === 0) {
    return value.toLocaleString();
  }
  if (separations.length === 1 && digit > 0) {
    return `${parseInt(separations[0]).toLocaleString()}.${String('').padEnd(digit, '0')}`;
  }

  return `${parseInt(separations[0]).toLocaleString()}.${separations[1].slice(0, digit).padEnd(digit, '0')}`;
};

/**
 * 소수점 자릿수만큼 표출 ( 해당 자리수까지만 표시하고 내림처리 )
 * @param {float | number} value number
 * @param {number} digit 소수점 자리수
 * @returns string
 */
export const getPriceFloor = (value, digit = 3) => {
  if (value === null || undefined === value) {
    return '0';
  }
  if (value === '') {
    return '0';
  }

  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }

  const digit_num = parseInt(String(1).padEnd(digit + 1, '0'));
  const price = Math.floor(value * digit_num) / digit_num;

  const separations = price.toString().split('.');
  if (separations.length === 1 && digit === 0) {
    return price.toLocaleString();
  }
  if (separations.length === 1 && digit > 0) {
    return `${parseInt(separations[0]).toLocaleString()}.${String('').padEnd(digit, '0')}`;
  }

  return `${parseInt(separations[0]).toLocaleString()}.${separations[1].slice(0, digit).padEnd(digit, '0')}`;
};

/**
 * 소수점 자릿수만큼 표출 ( 해당 자리수까지만 표시하고 올림처리 )
 * @param {float | number} value number
 * @param {number} digit 소수점 자리수
 * @returns string
 */
export const getPriceCeil = (value, digit = 3) => {
  if (value === null || undefined === value) {
    return '0';
  }
  if (value === '') {
    return '0';
  }

  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }

  const digit_num = parseInt(String(1).padEnd(digit + 1, '0'));
  const price = Math.ceil(value * digit_num) / digit_num;

  const separations = price.toString().split('.');
  if (separations.length === 1 && digit === 0) {
    return price.toLocaleString();
  }
  if (separations.length === 1 && digit > 0) {
    return `${parseInt(separations[0]).toLocaleString()}.${String('').padEnd(digit, '0')}`;
  }

  return `${parseInt(separations[0]).toLocaleString()}.${separations[1].slice(0, digit).padEnd(digit, '0')}`;
};

/**
 * 소수점 자릿수만큼 표출 ( 해당 자리수까지만 표시하고 반올림처리 )
 * @param {float | number} value number
 * @param {number} digit 소수점 자리수
 * @returns string
 */
export const getPriceRound = (value, digit = 3) => {
  if (value === null || undefined === value) {
    return '0';
  }
  if (value === '') {
    return '0';
  }

  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }

  const digit_num = parseInt(String(1).padEnd(digit + 1, '0'));
  const price = Math.round(value * digit_num) / digit_num;

  const separations = price.toString().split('.');
  if (separations.length === 1 && digit === 0) {
    return price.toLocaleString();
  }
  if (separations.length === 1 && digit > 0) {
    return `${parseInt(separations[0]).toLocaleString()}.${String('').padEnd(digit, '0')}`;
  }

  return `${parseInt(separations[0]).toLocaleString()}.${separations[1].padEnd(digit, '0')}`;
};

// 금액 단위
// return Array
export const getPriceUnit = (x) => {
  let newValue = x;
  let unit = '';
  if (x >= 1000) {
    if (x < 1000000) {
      newValue = x / 1000;
      unit = 'K';
    } else if (x <= 1000000000) {
      newValue = x / 1000000;
      unit = 'M';
    } else if (x <= 1000000000000) {
      newValue = x / 1000000000;
      unit = 'B';
    } else if (x <= 1000000000000000) {
      newValue = x / 1000000000000;
      unit = 'T';
    }
  }
  return [newValue, unit];
};

// 로케일 숫자 포맷
// const toLocaleString = (value, digit = 3) => {
//   const option = {
//     maximumFractionDigits: digit        // 소수점 자릿 수
//   }
//   return value.toLocaleString(navigator.language, option);
// }

/**
 * 첫번째 영문 (숫자와 알파벳만 입력 가능)
 * @param {string} value
 * @returns string
 */
export const getFirstEnglish_NumbEnglishOnly = (value) => {
  const type = /^[A-Za-z]{1}[A-Za-z0-9]/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};

/**
 * 유효성 검사( 한글 입력 방지 )
 * @param {string} value
 * @returns string
 */
export const getHangulPrevent = (value) => {
  const type = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};
// 유효성 검사( 숫자와 알파벳만 입력 가능 )
// return string
export const getNumEnglishOnly = (value) => {
  const type = /[^0-9a-zA-Z]/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};
// 유효성 검사( 알파벳만 입력 가능 )
// return string
export const getEnglishOnly = (value) => {
  const type = /[^a-zA-Z]/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};
// 유효성 검사( 숫자 입력 가능 )
// return boolean
export const getNumberOnly = (value) => {
  const type = /[^0-9]/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};

// 유효성 검사( 숫자앞 0제거 )
// return boolean
export const getNumberFirstZeroRemove = (value) => {
  const type = /(^0+)/g;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};

// 유효성 검사( 특수문자 제거 )
// return boolean
export const removeSpecialCharacters = (value) => {
  // eslint-disable-next-line
  let type = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};

/**
 * 문자열 공백 제거
 * @param {string} value
 * @returns
 */
export const removeSpace = (value) => {
  const type = /\s/gi;
  if (type.test(value)) {
    value = value.replace(type, '');
  }

  return value;
};

/**
 * 첫번째 영문
 * @param {string} value
 * @returns boolean
 */
export const isFirstEnglish = (value) => {
  const Regexp = new RegExp(/^[A-Za-z]/g);
  if (Regexp.exec(value) === null) {
    return false;
  }
  return true;
};

/**
 * 패스워드 정규식 ( 영문 대소문자, 숫자, 특수문자 1개 이상 포함)
 * @param {string} value
 * @returns boolean
 */
export const isPasswordCheck = (value) => {
  const isPW = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/g);
  if (isPW.exec(value) === null) {
    return false;
  }

  return true;
};

/**
 * 이메일 형식 검증
 * @param {string} value
 * @returns boolean
 */
export const isEamilRegExp = (value) => {
  const emailRegexp = new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9+-_.]+$');
  // const emailRegexp = new RegExp(/^[0-9a-zA-Z]([-_+\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_+\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
  if (emailRegexp.exec(value) === null) {
    return false;
  }
  return true;
};
// 유효성 검사( 숫자, 영문 대소문자 1개 이상 포함 체크 )
// return string
export const isVerifyCodeCehck = (value) => {
  const regexpCheck = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/g);
  if (regexpCheck.exec(value) === null) {
    return false;
  }
  return true;
};

// 파일크기 체크
// return Array
export const getfileSize = (x) => {
  const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const e = Math.floor(Math.log(x) / Math.log(1024));
  return [(x / 1024 ** e).toFixed(2), s[e]];
};

//  Base64 파일을 URL로 변환
export const getBase64ToURL = (base64) => {
  const separetedDate = base64.split(',');
  const mimeTypeData = separetedDate[0].match(/:(.*?);/);
  const mimeType = Array.isArray(mimeTypeData) ? mimeTypeData[1] : '';
  const decodedData = atob(separetedDate[1]);
  const dataLength = decodedData.length;
  const arrayBuffer = new ArrayBuffer(dataLength);
  const u8arr = new Uint8Array(arrayBuffer);

  for (let i = 0; i < dataLength; ++i) {
    u8arr[i] = decodedData.charCodeAt(i);
  }
  const blob = new Blob([u8arr], { type: mimeType });
  const url = URL.createObjectURL(blob);
  URL.revokeObjectURL(blob);
  return url;
};

export const getContentTypeToURL = (content, contentType) => {
  const decodedData = atob(content);
  const dataLength = decodedData.length;
  const arrayBuffer = new ArrayBuffer(dataLength);
  const u8arr = new Uint8Array(arrayBuffer);

  for (let i = 0; i < dataLength; ++i) {
    u8arr[i] = decodedData.charCodeAt(i);
  }
  const blob = new Blob([u8arr], { type: contentType });
  const url = URL.createObjectURL(blob);
  URL.revokeObjectURL(blob);
  return url;
};

export const getCardNumber = (value, cut_number = 4) => {
  if (value === undefined || value === null) return '';

  const card_number = value.toString();
  if (card_number.length === 0) {
    return '';
  }

  let number = '';
  if (card_number.length > 0 && cut_number > 0) {
    // 카드 번호를 n개씩 자르기
    const length = card_number.length / cut_number;
    let cardnum = '';
    for (let i = 0; i < length; ++i) {
      let num = card_number.substring(i * cut_number, (i + 1) * cut_number);
      num = num.replace(/x/g, '*');
      if (i < length - 1) {
        cardnum += `${num}-`;
      } else {
        cardnum += num;
      }
    }
    number = cardnum;
  }

  return number;
};

export const cardNumberToArray = (value, cut_number = 4) => {
  if (value === undefined || value === null) return [];

  const card_number = value.toString();
  if (card_number.length === 0) {
    return [];
  }
  if (cut_number === 0) {
    return [card_number];
  }

  const numbers = [];
  // 카드 번호를 n개씩 자르기
  const length = card_number.length / cut_number;
  for (let i = 0; i < length; ++i) {
    let num = card_number.substring(i * cut_number, (i + 1) * cut_number);
    num = num.replace(/x/g, '*');
    numbers.push(num);
  }

  return numbers;
};

/**
 * 문자열 변경
 * @param {string} value 전체 문자열
 * @param {string} searchValue 찾는 문자열
 * @param {string} replaceValue 변경할 문자열
 * @returns string
 */
export const replaceAll = (value, searchValue, replaceValue) => {
  return value.split(searchValue).join(replaceValue);
};
