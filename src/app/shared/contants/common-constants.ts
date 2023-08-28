import {environment} from '@env/environment';

export const COMMON_CONFIG = {
  LINE_TRAN_TYPE: [
    {
      CODE: '-1',
      NAME: 'SELECT_ALL',
    },
    {
      CODE: '1',
      NAME: 'TOP_UP'
    },
    {
      CODE: '2',
      NAME: 'GIVE_POINT'
    },
    {
      CODE: '3',
      NAME: 'GET_POINT'
    }
  ],
  KEY: {
    LOCALIZATION: 'lang'
  },
  TIME_LOADDING_TRANS: 3,
  UPOINT_CONFIRM_DEFAULT: 50000,
  TYPE_VOUCHER:{
    AUTO : 1,
    MANUAL : 2
  },
  MAX_FILE_SIZE_TEMPLATE : 1024 * 1024 * 4,
  MAX_IMAGE_SIZE_TEMPLATE : 1024 * 1024 * 4,
  SHOW_RATING : 3,
  LIMIT_VOUCHER : 8,
  LIMIT_TRANS : 30
};

export const WEBSOCKET_ENDPOINT = `${environment.WS_BASE_URL}`;
export const WEBSOCKET_NOTIFY_TOPIC = '/topic/notif';
export const ROLE = {
  END_USER : 'END_USER',
  ROLE_MERCHANT : 'ROLE_MERCHANT',
  ROLE_ASSISTANT: 'ROLE_ASSISTANT',
  ROLE_COLLABORATORS: 'ROLE_COLLABORATORS'
};
export const FILTER_VOUCHER = {
  NEAR_BY : 'NEAR_BY',
  BEST_DISCOUNT : 'BEST_DISCOUNT',
  BEST_RATED: 'BEST_RATED',
  NEWEST: 'NEWEST',
  PRICE: 'PRICE',
  BEST_SELLERS: 'BEST_SELLERS',
  ONLINE: 'ONLINE'
};

// GET CLIENT PUBLIC IP
export const GET_IP_URL = `https://api.ipify.org/?format=json`;
export const REGEX = {
  EXTENSION_FILE: '[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|bmp|JPG|JPEG|PNG|GIF|BMP)$',
  COORDINATES: '^[-+]?[0-9]*\\.?[0-9]+(,)+[-+]?[0-9]*\\.?[0-9]+$'
}
