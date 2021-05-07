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
