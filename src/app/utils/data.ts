export class DataUtilities {
    static isNullOrEmpty(obj: any) {
        return obj == null || obj === undefined || obj === '';
    }

    static trim(needToTrimString: any) {
        if (needToTrimString == null || needToTrimString == undefined) {
            return "";
        }
        return ('' + needToTrimString).trim();
    }

    static toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    static base64ToArrayBuffer = (base64: any) => {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
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

export function getMimeType(extension: string) {
    switch (extension) {
        case 'doc':
        case 'docx':
            return 'application/msword';
        case 'xls':
        case 'xlsx':
            return 'application/vnd.ms-excel';
        case 'ppt':
        case 'pptx':
            return 'application/vnd.ms-powerpoint';
        case 'pdf':
            return 'application/pdf';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        case 'csv':
            return 'text/csv';
        case 'txt':
            return 'text/plain';
        case 'zip':
            return 'application/zip';
        case 'rar':
            return 'application/x-rar-compressed';
        default:
            return 'application/octet-stream';
    }
}