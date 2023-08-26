const endpoints = {
  product: {
    get: (uuid?: string) => (!!uuid ? `/product/${uuid}` : "/products"),
    create: () => "/products",
  },
};

export default endpoints;
