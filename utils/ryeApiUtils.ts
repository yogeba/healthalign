

// useQuery hook to fetch the cart
const [getCart, { loading, data }] = useLazyQuery(GET_CART);

getCart({ variables: { id } });

//Utilize Apollo clients useMutation for the mutation written
const [createCart, { loading, error, data }] = useMutation(CREATE_CART);

//`useMutation` for the mutation written
const [addProduct, { loading: addLoading, data: addProductResult }] =
  useMutation<AddCartProductResult>(ADD_CART_ITEMS);

//method to add item to cart
export const createCartWithProducts = (product) => {
  const input: CartItemsAddInput = {
    id: cart?.id!,
    items: {},
  };

  if (product.marketplace === Marketplace.AMAZON) {
    input.items.amazonCartItemsInput = [{ productId: product.id, quantity: 1 }];
  }
  if (product.marketplace === Marketplace.SHOPIFY) {
    input.items.shopifyCartItemsInput = [
      { variantId: product.id, quantity: 1 },
    ];
  }

  addProduct({ variables: { input } });
};

const ryePay = new RyePay();

// Initialize rye-pay via Spreedly iFrames In your front-end, you should have input objects which allow users to enter their spreedly number and cvv. The object IDs should be spreedly-number and spreedly-cvv respectively. Initialize the RyePay object by passing in the spreedly-number and spreedly-cvv. Feel free to play around with the other auxilliary methods that rye-pay offers.

export const loadSpreedly = () => {
  ryePay.init({
    apiKey,
    numberEl: "spreedly-number",
    cvvEl: "spreedly-cvv",
    environment: prod,
    onReady: () => {
      // Customize card number field and cvv field
      ryePay.setStyle(
        "number",
        "display:inline; width: 30%; border-radius: 3px; border: 1px solid #ccc;"
      );
      ryePay.setStyle(
        "cvv",
        "display: inline; width: 30%; border-radius: 3px; border: 1px solid #ccc;"
      );
    },
    onErrors: (errors: SpreedlyError[]) => {
      for (const { key, message, attribute } of errors) {
        console.log(`new error: ${key}-${message}-${attribute}`);
      }
    },
    enableLogging: true,
    onIFrameError: (err: FrameError) => {
      console.log(`frameError: ${JSON.stringify(err)}`);
    },
  });
};

loadSpreedly();

const submit = () => {
  ryePay.submit({
    first_name: "John",
    last_name: "Doe",
    month: "04",
    year: "2025",
    cartId: "cartId", // IMPORTANT! Make sure the cartId is valid
    address1: "address1",
    address2: "address2",
    zip: "zip",
    city: "city",
    country: "country",
    state: "state",
    selectedShippingOptions: [],
    shopperIp: "xxx.xxx.x.x", // IMPORTANT! Make sure this is set correctly
  });
};

submit();


// Rye API utility functions
  export const createCartWithProducts = (product) => {
   const input = {
      items: {}
    };

    if (product.marketplace === Marketplace.AMAZON) {
      input.items.amazonCartItemsInput = [
        { productId: product.id, quantity: 1 },
      ];
    }

    if (product.marketplace === Marketplace.SHOPIFY) {
      input.items.shopifyCartItemsInput = [
        { variantId: product.id, quantity: 1 },
      ];
    }input.buyerIdentity = {
        city: 'city',
        countryCode: 'countryCode',
        provinceCode: 'provinceCode',
        postalCode: 'postalCode',
      };
		
    createCart({ variables: { input: input } });
    return;
	}
  };

   // Fetch products from Rye API

   export async function fetchRyeProducts(query: string): Promise<Product[]> {
    const API_KEY = process.env.RYE_API_KEY;

    const response = await axios.get(
      "/api/rye?query=" + encodeURIComponent(query)
    );
    const products = response.data;
    setFilteredProducts((prevProducts) => [
      ...prevProducts,
      ...products.products,
    ]);

    console.log("All Products: ", filteredProducts);
    return products.products;
  }

  export const extractSupplementNames = (response: string) => {
    const lines = response.split("\n");
    const question10Supplements = lines.find((line) => line.startsWith("10."));
    const question11Supplements = lines.find((line) => line.startsWith("11."));

    const supplementNames = question10Supplements
      ? question10Supplements.replace(/^10\.\s*/, "").split(", ")
      : [];

    const plantBasedSupplementNames = question11Supplements
      ? question11Supplements.replace(/^11\.\s*/, "").split(", ")
      : [];

    return { supplementNames, plantBasedSupplementNames };
  };