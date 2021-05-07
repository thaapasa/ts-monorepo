# React Native app

## Setup

You can initialize the app with:

```sh
npx react-native init rnapp --template react-native-template-typescript
```

Note: because yarn 2 affects the module resolution, running this inside the
monorepo may fail. This app was initialized by running the command in a
separate directory and by just copying the files here afterwards.

After creating the basic React Native app, add setup hoisting limits to app
and add rnapp to workspaces by adding the following configuration to
`rnapp/package.json`:

```json
{
  ...
  "workspaces": [
    ...,
    "rnapp"
  ],
  ...
  "installConfig": {
    "hoistingLimits": "workspaces"
  },
  ...
}
```

Then, remove `yarn.lock` and run `yarn` again to merge dependency resolution
to yarn 2.

## Configure linked modules

Add `babel-plugin-module-resolver`:

```sh
yarn add babel-plugin-module-resolver
```

Then, edit [metro.config.js](./metro.config.js) and
[babel.config.js](./babel.config.js) to link the tsconfig path aliases
to the Metro bundling process.

## Testing with jest

Jest seems to work with the abovementioned setup, without further configuration.
However, if you test React rendering and have shared React Hooks, you may end
up with several different versions of React in the module resolution, and this
may break the jest tests.

If this happens, you can configure jest manually to resolve only one version of
react. To do that, remove the jest configuration from [package.json](./package.json),
and add custom [jest.config.js](./jest.config.js) and
[jest.resolver.js](./jest.resolver.js). This example resolver is setup to
locate all `react` dependencies from the project root.
