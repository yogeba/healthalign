export type ShopifyVariantIDInput = {
  variantId: string | number;
};

export type AmazonProductIDInput = {
  productId: string | number;
};

export type DeleteCartLinesInput = {
  shopifyProducts: ShopifyVariantIDInput[];
  amazonProducts: AmazonProductIDInput[];
};

export type CartItemsDeleteInput = {
  id: string | number;
  items: DeleteCartLinesInput;
};
