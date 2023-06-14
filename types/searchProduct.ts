export interface Product {
  available: boolean;
  body_html: string;
  category: string;
  cleaned_description: string;
  cleaned_title: string;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  created_at: string;
  currencyCode: string;
  description: string;
  featured_image: string;
  formatted_price: string;
  handle: string;
  id: string;
  image_url: string;
  images: string[];
  media: any[];
  options: any[];
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  product_type: string;
  published_at: string;
  request_domain: string;
  requires_selling_plan: boolean;
  selling_plan_groups: any[];
  store_canonical_url: string;
  tags: string[];
  title: string;
  type: string;
  url: string;
  variant_id: string;
  variants: any[];
  vendor: string;
  marketplace: string;
  identifier: string;
  quantity: number;
  isAvailable: boolean;
}

export type CartProps = {
  cartId: string;
  // Add other props as needed
};
