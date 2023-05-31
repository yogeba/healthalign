export type AmazonCartItemsInput = {
  quantity: number;
  productId: string | number;
};

export type ShopifyCartItemsInput = {
  quantity: number;
  variantId: string | number;
};

export type CartItemsInput = {
  amazonCartItemsInput: AmazonCartItemsInput[];
  shopifyCartItemsInput: ShopifyCartItemsInput[];
};

export type BuyerIdentityInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  countryCode: string;
  postalCode: string;
};

export type CartIdInput = {
  id: string | number;
};

export type BillingAddressInput = {
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  countryCode: string;
  postalCode: string;
};

export type SelectedShippingOption = {
  store: string;
  shippingId: string;
};
