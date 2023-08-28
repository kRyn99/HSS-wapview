export class EndUserInfoModels{
  lstCategory?: CategoryDTO[];
  lstSpecialGift?: SpecialGiftDTO[];
  lstTopBrand?: TopBrandDTO[];
}

export class CategoryDTO{
  language?: string;
  name?: string;
  value?: string;
  strLogo?: string;
  categoryId?: number;
  categoryName?: string;
  categoryCode?: string;
  createBy?: string;
  createDatetime?: string;
  description?: string;
  logo?: string;
  banner?: string;
  status?: number;
  orderNo?: number;
}

export class SpecialGiftDTO{
  description?: string;
  language?: string;
  name?: string;
  strLogo?: string;
  logo?: string;
  value?: string;
}

export class TopBrandDTO{
  accountType?: string;
  accountTypeName?: string;
  brandName?: string;
  id?: number;
  merchantId?: number;
  merchantIsdn?: string;
  orderNumber?: number;
  serviceType?: string;
  serviceTypeName?: string;
  shopId?: number;
  brandLogo?: string;
  discountRate?: number;
  totalFollow?: number;
  totalTrans?: number;
  brandBanner?: string;
  categoryId?: number;
  categoryName?: string;
  originalLogo?: string;
}
