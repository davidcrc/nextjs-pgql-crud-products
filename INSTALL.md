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

### Add Prettier

- resource : https://dev.to/nausaf/set-up-linting-and-formatting-for-code-and-scss-files-in-a-nextjs-project-43fb

```bash
npm install --save-dev prettier
```

- create .prettierrc.json

```json
{
  "singleQuote": true,
  "jsxSingleQuote": true
}
```

- create .prettierignore

```
node_modules
.next
.husky
coverage
.prettierignore
.stylelintignore
.eslintignore
```

### Add Eslint

```bash
npm install --save-dev eslint eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- replace file with eslintrc.js

```js
/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        //declaring 'next/core-web-vitals' and 'prettier' again in case
        //the two plugin:... configs above overrode any of their rules
        //Also, 'prettier' needs to be last in any extends array
        'next/core-web-vitals',
        'prettier',
      ],
    },
  ],
};
```

- create empty file .eslintignore

### Add Stylelint

```bash
npm install --save-dev sass
```

```bash
npm install --save-dev stylelint stylelint-config-standard-scss stylelint-config-prettier-scss
```

- create .stylelintrc.json

```json
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss"
  ],
  "rules": {
    "selector-class-pattern": null
  }
}
```

- create .stylelintignore

```
styles/globals.css
styles/Home.module.css
coverage
```

- setup package.json

```json
{
  "scripts": {
    // ...
    "build": "prettier --check . && stylelint --allow-empty-input \"**/*.{css,scss}\" && next build",
    "build:local": "prettier --write . && stylelint --allow-empty-input \"**/*.{css,scss}\" && next build",
    "lint": "prettier --check . && stylelint --allow-empty-input \"**/*.{css,scss}\" && next lint",
    "format": "prettier --write ."
  }
}
```

### lint-staged setup

```bash
npm install --save-dev lint-staged
```

- create lint-staged.config.js

```js
/* eslint-env node */
const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const formatCommand = 'prettier --write';
const stylelintCommand = 'stylelint --allow-empty-input "**/*.{css,scss}"';
module.exports = {
  '*.{js,jsx,ts,tsx}': [formatCommand, eslintCommand],
  '*.{css,scss}': [formatCommand, stylelintCommand],
  '!*.{js,jsx,ts,tsx,css,scss}': [formatCommand],
};
```

```bash
npm install --save-dev husky
```

- run prepare

```bash
npm pkg set scripts.prepare="husky install"
npm run prepare
```

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```
