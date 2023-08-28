const endpoints = {
  product: {
    get: (uuid?: string) => (!!uuid ? `/products/${uuid}` : '/products'),
    create: () => '/products',
    delete: (uuid: string) => `/products/${uuid}`,
    update: (uuid: string) => `/products/${uuid}`,
  },
};

export default endpoints;
