// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultLang: 'la',
  // API_HOST_NAME: 'http://localhost:8080',
  // API_HOST_NAME: 'http://10.120.44.68:8996/hss-ws',
  API_HOST_NAME: 'http://upoint-uat.uid.com.la:8996/hss-ws',
  WS_BASE_URL: 'http://localhost:8081/ws-notification',
  HOST_UNITEL: 'http://10.120.8.116:8123/ApiGateway',
  AUTHOR_UNITEL: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQUQtMTYxNjk4OTM0MiIsImlhdCI6MTY0MTc5Njk2OCwiY2xpZW50X2lkIjoiMWMyMTdlZDAtNmY0Yi00NzJiLWExN2UtZDA2ZjRiNTcyYmFmIn0.aheS_4d6PmcQWcvVDFRpRbdsN4BQpLkXgcruZPm-hrY',

  UID_SYSTEM: {
    API_UID: 'https://uid.com.la:9998',
    LINK_CALL_BACK_UID: 'https://127.0.0.1/auth/call-back/end-point',
    // LINK_CALL_BACK_UID: 'https://upoint-uat.uid.com.la/upoint/auth/call-back/end-point',
    // LINK_CALL_BACK_UID: 'https://upoint.la/auth/call-back/end-point',
    CLIENT_ID_UID: '8a41a4fb-c31d-4ed5-81a4-fbc31d0ed523',
    SECRET_KEY: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQUQtMTYxNjk4OTM0MiIsImlhdCI6MTY0ODA4MDg4OCwiY2xpZW50X2lkIjoiOGE0MWE0ZmItYzMxZC00ZWQ1LTgxYTQtZmJjMzFkMGVkNTIzIn0.7M3GdW9HE2tveNgl59j2nFSpIA3lE8KS4YSIURRCpWA',
    USER_NAME_DEFAULT: '8888888888',
    KEY_PASS_DEFAULT: '123456a@'
  },
};
