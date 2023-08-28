export enum ScreenRequest {
    default = 'NONE',
    reservationAccepting = 'RESERVATION-ACCEPTING',
    payment = 'PAYMENT',
    reservation = 'RESERVATION',
    scheduler = 'SCHEDULER',
    reception = 'RECEPTION',
    customerRegist = 'MM_CUSTOMER_REGIST', // mode = 0
    customerInsert = 'MM_CUSTOMER_INSERT', // mode = 5
    customerUpdateLifeKarte = 'MM_CUSTOMER_UPDATE_LIFEKARTE', // mode = 1
    customerNayose = 'CUSTOMER_NAYOSE', // mode = 1
    formAlert = 'FORM_ALERT', // mode = 6
    revenue = 'URIAGE_D', // mode = 4
    selectMenuCouponModeRev = 'REV',
    selectMenuCouponModeAdj = 'ADJ',
}
