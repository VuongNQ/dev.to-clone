## Getting started

### Requirements

1. You must have [Node.js](https://nodejs.org/) installed.
2. Knowledge Shopify app brigde, auth, Oauth
3. Knowledge about React, React router ,Typescript, redux

### Install package

1. Open root folder on terminal and install package:

    ```shell
    npm i
    ```

    **NOTE**: if have error `Could not resolve dependency peer react` of package store-evaluation-swift, using command `npm i --legacy-peer-deps`


### Local Development

1. Create the `.env` file:

    ```shell
    cp .env.example .env
    ```
2. Update youre VITE_SHOPIFY_CLIENT_ID key on `env` file had copy, this key is Client ID of Client credentials region, section overview of page setting app

2. Using npm:

    ```shell
    npm run dev
    ```

### Build

Using npm:

```shell
npm run build
```
### Check ESLINT 

npx eslint src --format html --output-file eslint-result.html

### Build Excel from folder locale 

requirement install https://www.npmjs.com/package/run-func

```shell
npm i -g run-func
```

if not token, using command below to generate token.json
```shell
npm run authorSheet
```

Build all file translate json to Excel 
```shell
npm run translateExcel
```

Build Excel file to Json translate
```shell
npm run translateJson
```
## Deployment
Sourcemap just config for develop env(vite.config.ts), when deploy production or hot fix production, requirement update  version in "package.json" follow format:
```
<number-version-app>.<number-sprint>.<whatever number, string you want define, like: task code v.v...>
```
example
```
4.25.1
```


## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Giải thích structure của source demo

vì react không khuyến 

