const endpoints = {
  product: {
    get: (uuid?: string) => (!!uuid ? `/products/${uuid}` : "/products"),
    create: () => "/products",
  },
};

export default endpoints;
