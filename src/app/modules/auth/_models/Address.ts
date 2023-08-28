export class Address {
  data?: ListAddress[];
  errorCode?: string;
  description?: string;
}

export class ListAddress {
  provinceId?: string;
  provinceName?: string;
  districtId?: string;
  districtName?: string;
  name?: string;
  value?: string;
}
