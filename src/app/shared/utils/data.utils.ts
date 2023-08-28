export function getBrowserNameAndVersion() {
  let ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {name: 'IE', version: (tem[1] || '')};
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bEdg\/(\d+)/)
    if (tem != null) {
      return {name: 'Edge(Chromium)', version: tem[1]};
    }
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return {name: 'Opera', version: tem[1]};
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}

export function getMsisdn(isdn) {
  let msisdn = '';
  isdn = isdn.toString();
  if (isdn.startsWith('(+856)')) {
    msisdn = isdn.replace('(+856)', '856');
  } else if (isdn.startsWith('+856')) {
    msisdn = isdn.replace('+856', '856');
  } else if (isdn.startsWith('20')) {
    msisdn = '856' + isdn;
  } else if (isdn.startsWith('0')) {
    msisdn = '856' + isdn.substring(1);
  } else if (isdn.startsWith('9')) {
    msisdn = '85620' + isdn;
  } else if (isdn.startsWith('7')) {
    msisdn = '85620' + isdn;
  } else if (isdn.startsWith('5')) {
    msisdn = '85620' + isdn;
  } else if (isdn.startsWith('2') && isdn.length === 8) {
    msisdn = '85620' + isdn;
  } else {
    msisdn = isdn;
  }

  return msisdn;
}

export function getIsdn(isdn) {
  isdn = isdn.toString();
  let msisdn = '';
  if (isdn.startsWith('(+856)')) {
    msisdn = isdn.replace('(+856)', '');
  } else if (isdn.startsWith('+856')) {
    msisdn = isdn.replace('+856', '');
  } else if (isdn.startsWith('856')) {
    msisdn = isdn.substring(3);
  } else if (isdn.startsWith('0')) {
    msisdn = isdn.substring(1);
  } else if (isdn.startsWith('9')) {
    msisdn = '20' + isdn;
  } else if (isdn.startsWith('7')) {
    msisdn = '20' + isdn;
  } else if (isdn.startsWith('5')) {
    msisdn = '20' + isdn;
  } else if (isdn.startsWith('2') && isdn.length === 8) {
    msisdn = '20' + isdn;
  } else {
    msisdn = isdn;
  }
  return msisdn;
}

export function formatMessage(str, args) {
  return str.replace(new RegExp('{-?[0-9]+}', 'g'), (item) => {
    const intVal = parseInt(item.substring(1, item.length - 1));
    let replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = '{';
    } else if (intVal === -2) {
      replace = '}';
    } else {
      replace = '';
    }
    return replace;
  });
}

export class DataUtilities {
  static base64ToArrayBuffer = (base64: any) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  static dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
}

export function downExportExcel(data: string, name = '.xlsx') {
  if (!data) {
    return;
  }
  const newData = DataUtilities.base64ToArrayBuffer(data);
  const myBlob = new Blob([newData as BlobPart], { type: 'application/vnd.ms-excel;charset=UTF-8' });
  const blobURL = URL.createObjectURL(myBlob);
  const anchor = document.createElement('a');
  anchor.href = blobURL;
  // href.download = 'abc.csv';
  anchor.id = 'download';
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function downExportText(data: string, name = '.txt') {
  if (!data) {
    return;
  }
  const newData = DataUtilities.base64ToArrayBuffer(data);
  const myBlob = new Blob([newData as BlobPart], { type: 'text/plain' });
  const blobURL = URL.createObjectURL(myBlob);
  const anchor = document.createElement('a');
  anchor.href = blobURL;
  anchor.id = 'download';
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function downloadBase64File(dataUrl, fileName) {
  const linkSource = dataUrl;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.setAttribute("style", "visibility: hidden");
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
}
