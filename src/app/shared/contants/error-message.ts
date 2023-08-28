interface ErrorMessage {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string
}



// {
//     "timestamp":"2021-02-05T09:51:08.918+0000",
//     "status":500,
//     "error":"Internal Server Error",
//     "message":"400 : [{\"status\":400,\"message\":\"Bank account not available. Please check again. Thank you!\",\"result\":{\"inGameTime\":false,\"responseCode\":\"10702\",\"responseDescription\":\"Bank account not available. Please check again. Thank you!\",\"transactionDateTime\":\"16:51 05/02/2021\",\"bankAccountName\":\" \",\"requireOtp\":false}}]",
//     "path":"/api/v1/transfer-to-bank/check-account"
//  }