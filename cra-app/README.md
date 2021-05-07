# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

To initialize the project, run:

```sh
npx create-react-app cra-app --template typescript
```

Run this in a separate directory so that yarn workspaces does not mess with
the CRA install process.

**Note**: CRA initializes the project as a new git repo, so you need to
delete the `.git` directory from under `cra-app` before copying the files
under monorepo.

After copying, add the `cra-app` folder to the `workspaces` list in root
[package.json](../package.json).

Then, delete `node_modules` and `yarn.lock` and re-run `yarn` to merge
dependency resolution to yarn workspaces. You probably also want to mark
`react` and other deps as `*` if they are included in the `resolutions` field
of the root `package.json` (the root `resolutions` field will be used anyway,
so listing another version in the local `package.json` can be confusing).
