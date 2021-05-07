# ts-monorepo
An example monorepo setup with different TS projects

## Contents

- [rnapp](./rnapp): React Native application
- [server](./server): Node.js server, deployed as a Docker container
- [shared](./shared): Code shared between all projects

## Setup flow

### Switch to Yarn 2

See Yarn 2 [documentation](https://yarnpkg.com/getting-started).

To switch using yarn 2, you need to use the following commands (assuming you have
`yarn` installed globally. If not, install it first). Yarn 2 is only ever
installed locally (global `yarn` is always version 1).

```sh
yarn set version berry
yarn set version latest
```

Then, setup your `.gitignore` like so:

```
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```

This assumes that you do not use Zero-Installs; see the
[documentation](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored).

To use the command `yarn workspaces focus` (for installing deps to only one module), you
must run:

```sh
yarn plugin import workspace-tools
```

See the [documentation](https://yarnpkg.com/cli/workspaces/focus).

### Setup global resolutions

With yarn 2, you can use the `resolutions` field in the root `package.json` to set
resolutions for all projects. This is useful for setting up all projects to use the
same version of TypeScript, or express, or any other build tool or library that
is mainly used by top-level worktrees.

If you would like to defined resolutions to dependencies shared by many libraries,
be careful that the libraries work with the resolved version. The setting in the
root `package.json` is global, so it forces the resolution for each use case.
For example, the [uuid](https://www.npmjs.com/package/uuid) library has a breaking
change between some major versions, so resolving it to a newer version will
probably break some other dependencies that require an older version of the library.

### Link workspaces

For yarn to resolve transitive dependencies to linked projects, you need to add
the projects (or _workstrees_, as yarn calls them) to the root `package.json`, and
then install the shared projects to each project that needs them. For example, in
this repo the `shared` project is linked to the `server` project by having a
dependency `{ "shared": "workspace:*" }`.

The version `workspace:*` is what yarn suggests for linking the worktrees. The
`workspace` prefix ensures that yarn will not try to find the dependency from
npm.

### Setup path aliases

There are other ways of making the builds work, but the approach in this repo
is to configure the paths to shared code via path aliases specified in `tsconfig.json`.
With the path aliases in place in `tsconfig.json`, the TypeScript compiler (`tsc`)
will find the files, but other tools need to be configured:

- `jest`: create a JS config file for jest, import `pathsToModuleNameMapper`
  from `ts-jest`, and use that to make jest aware of the path aliases.
  If you get problems with multiple instances of React during testing, see
  the jest configuration example in [rnapp](./rnapp):
  - [jest.config.js](./rnapp/jest.config.js)
  - [jest.resolver.js](./rnapp/jest.resolver.js)
- `node`: use `tsconfig-paths` to tell node where the built files are. Note:
  in our approach the built files are in a different directory layout, so
  another `tsconfig.json` file must be used to specify the built directory
  layout.
- `react-native`: add `babel-plugin-module-resolver` to configure Metro bundler.
  Edit `babel.config.js` and `metro.config.js`; see the examples in the
  [rnapp](./rnapp) folder.
