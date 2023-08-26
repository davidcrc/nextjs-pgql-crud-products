## Setup

### Prisma : config ORM

```bash
npm i prisma -D
```

```bash
npm install @prisma/client
```

- iniziliate

```bash
npx prisma init
```

- migrate initial

```bash
npx prisma migrate dev --name init
```

### React hook form

```bash
npm i react-hook-form
```

### NextUi 2.1.0

```bash
npm i @nextui-org/react framer-motion
```

- create a file provider.tsx

```tsx
"use client";

import \* as React from "react";
import { NextUIProvider } from "@nextui-org/system";

export interface ProvidersProps {
children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
return <NextUIProvider>{children}</NextUIProvider>;
}

```

- and add to layout

```tsx
<body className={inter.className}>
  <Providers>{children}</Providers>
</body>
```

### Axios

```bash
npm i axios
```

- first config: src/axios/index.ts

- then configure files in src/services/\*\*

- then use:

```tsx
const response = await productService.createProduct({
  name: data.name,
  price: data.price,
  description: data.description,
});
```
