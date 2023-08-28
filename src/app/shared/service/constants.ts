import { environment } from "@env/environment";

export const CONFIG = {
  SYSTEM_CODE: 'BGW',
  KEY: {
    TOKEN: `tokenInLocalStorage`,
    LOCALIZATION: 'lang',
    USER_PERMISSION: 'userPermission',
    RESPONSE_BODY_LOGIN: 'userRes',
    USER_NAME: 'userName'
  }
};

export const  WEBSOCKET_ENDPOINT = `${environment.WS_BASE_URL}`;
export const  WEBSOCKET_NOTIFY_TOPIC = '/topic/notif';
