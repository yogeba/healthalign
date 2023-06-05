export interface ProductById {
  identifier: string;
  title: string;
  vendor: string;
  marketplace: string;
  description: string;
  url: string;
  isAvailable: boolean;
  images: Image[];
  variants: Variant[];
  price: Price;
  ASIN: string;
  manufacturer: string;
  tags: any[];
  categories: Category[];
}

export interface Id {
  $oid: string;
}

export interface Image {
  url: string;
}

export interface Variant {
  title: string;
  image: Image;
}

export interface Price {
  displayValue: string;
  currency: string;
  value: number;
}

export interface Category {
  name: string;
  categoryID: string;
}
