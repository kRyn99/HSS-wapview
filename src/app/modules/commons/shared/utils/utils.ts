export const isStrEmpty = (v: any) => v == null || v === '';
export const isEmptyObject = (obj: any) => Object.values(obj).some(isStrEmpty);
export const makeShortName = (name: string) => name == null ? '' : name.split('\\s+').slice(0, 2).join('').toUpperCase();
export const isTrim = (v: any) => v == null ? '' : v.trim();

