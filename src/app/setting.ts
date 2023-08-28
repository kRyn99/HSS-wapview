function isIOS() {
	// const userAgent = navigator['userAgent'] || navigator['vendor'] || window['opera'] || navigator['safari'];
	// return /iPad|iPhone|iPod/.test(userAgent) && !window['MSStream'];
	const userAgent = navigator['userAgent'] || navigator['vendor'] || window['opera'] || navigator['safari'];
	const isIOSCheck = (/iPad|iPhone|iPod/.test(navigator.platform) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		|| /iPad|iPhone|iPod/.test(userAgent)
	)
	return isIOSCheck;
}
function checkMaxLengAmount() {
	return (screen.width > 480) || isIOS()
}
enum netWorkName {
	Unitel = 1,
	ETL = 2,
	LTC = 3,
	NotValid = 0
}

export const settings = {
	iOS: isIOS(),
	currency: { prefix: '₭ ', thousands: ',', decimal: '.', precision: 0, align: 'left' },
	currencyNoUnit: { prefix: '', thousands: ',', decimal: '.', precision: 0, align: 'left' },
	currencyMaxLength: checkMaxLengAmount() ? 8 : 12, // isOS requires more 4 characters than on Android
	bankAccount: '00000000000000000000',
	phoneNumber: '000000000000000',
	// phoneMinLength: 10,
	formatPhoneNumberRegex: new RegExp(/^[+]?(856|)(0304|309|304)[0-9]{6}$|^(856|)(0209|209|9)[0-9]{7}$|^(856|)(0302|302)[0-9]{6}$|^(856|)(0202|202)[0-9]{7}$|^(856|)(0305|305)[0-9]{6}$|^(856|)(0205|205)[0-9]{7}$|^(856|)(0207|207|7)[0-9]{7}$/),
	netWorkName,
	internetBillAccountNumber: '000000000',
}

