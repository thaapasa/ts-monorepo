# ts-monorepo
An example monorepo setup with different TS projects

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
