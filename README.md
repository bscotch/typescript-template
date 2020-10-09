# Typescript Template (Typescript Starter Project)

Getting a Typescript project running
is a pain, since there is a lot of environment and configuration setup
before you can get started. In addition, if you want to be able to publish
the Typescript project to [npm](https://www.npmjs.com/) there is even more
configuration to ensure that you are only (and definitely) pushing the files
that are strictly needed. Finally, setting up testing can be confusing,
especially since test code also needs to be compiled but should not be
included with your published npm package.

This starter kit aims to alleviate all the annoyance of setting up a
Typescript project, with testing, and preconfigured to be ready to 
publish to npm (though you can use it for non-npm projects as well).

## Setup Guide

### Dependencies

+ [**Node.js v14+**](https://nodejs.org/) (lower versions will probably also be fine, though require fine-tuning)
+ [**Visual Studio Code**](https://code.visualstudio.com/)
  (not strictly required -- you can use other code editors, but this template has VSCode in mind)

### Workflow

This project has some assumptions built in about your workflow. If you are using
a different workflow, you'll likely need to edit the `scripts` section of the
`package.json` file accordingly and may need to use different branches and project
setup than what is described here.

Assumptions:

+ Your primary branch is `develop`.
+ Your stable branch is `main`.
+ You're using semver for versioning.
+ `main` will only receive merges from `develop`, and only when you increment the project version.
+ You're coupling versioning to npm package publishing

### Preparing a new project

#### The easy way to start: GitHub Templates

[This project](https://github.com/bscotch/typescript-template) is set up as a GitHub template.

1. Click the "Use this Template" button on the project homepage to create your own
  remote repo with everything here. Follow the prompts.
2. On your local machine, navigate to the parent folder where you want to keep your
  local repo copy. Run `git clone your-remote-url`.

#### The hard way to start

1. Create a new remote repo on your host (e.g. GitHub, BitBucket, GitLab, etc.)
1. Go to the local parent folder into which you want to put your new Typescript project
    (via your file explorer or a terminal)
1. Clone this repo locally: `git clone --branch develop git@github.com:bscotch/typescript-template.git`
1. Rename the folder containing this repo (`typescript-template`) to your project's name
1. Go to your new local repo (via a Git GUI or a terminal (with `cd your-new-name`))
1. (Optional) If you don't want the git history from this template to be included in your project's history:
  1. Delete the `.git` folder
  1. Run `git init` (or use a Git GUI to initialize the repo)
  1. Run `git checkout -b develop`
1. Change the remote to your own remote repository: `git remote set-url origin your-remote-url` (or, if you initialized a new repo, add your remote with `git remote add origin your-remote-url`)

#### Customize the template

1. Run `npm install` to install all dependencies
  1. (Optional) Run `npm update` to get those dependencies up to date with minor updates.
  1. (Optional) Run `npm outdated` to see if any dependencies have major updates.
    + (Optional) Run `npm install outdated-package-name@latest` for each package you want to update.
1. Update the `package.json` with your project's details
  + Set the `name` field. If you are going to publish to npm, this will be the name of your package. Must be a URL-friendly name. Best practice is to use kebab-case (all lower-case, alphanumeric and dashes).
  + Set the `description` field.
  + Set the `repository` field to your remote git repo's URL.
  + Set the `homagepage` field (your remote git repo's URL works fine for this). 
  + Add any `keywords` strings. If you publish to npm, these will be used by searches.
  + Remove the `private` field **if you want to publish to npm**.
  + If you do not want to publish to npm, remove `&& npm publish` from the `scripts.postversion` script.
1. Check the `.gitignore` and add any filetypes or folders you want to keep out of your repo.
1. Remove any stuff from the template that you don't care about. (You can do this at any time.)
1. Commit all your changes: `git add -A; git commit`
1. Push your commit: `git push -u origin develop` (the `-u` lets you just run `git push` without the other arguments from here on)
1. Make sure you have a `main` branch if you are going to use the versioning commands: `git branch main`


### Begin coding!

+ Ensure you are on the `develop` branch, or on a branch coming off of `develop` that
  you intend to merge back into `develop` at some point.
+ If you intend to use the `fs-extra` module for anything in your non-test code,
  move it from the `devDependencies` to the `dependencies` section of your `package.json`.
+ To continuously compile your typescript as you code, run `npx tsc -w` in a terminal.
+ Your entrypoint is `./src/index.ts`, so start there!
+ Sample folders and files for types and your code library are placed in `src/lib` and `src/types`.
  Edit those or delete them to do things your own way.
+ Edit the `.eslintrc.js` if you prefer different linter rules.
+ Edit the `tsconfig.json` file if you need different typescript configuration options. In particular:
  + If your code will run in a browser, add `"dom"` to the `lib` array.
    That gives you access to types specific to the browser.
  + If you are getting typescript errors from dependencies, set `skipLibCheck` to `true`.
+ Your compiled code will appear in a git-ignored `build` folder, with entrypoint `build/index.js`.

### Creating a CLI (Command Line Interface)

This template project comes with the [commander module](https://www.npmjs.com/package/commander),
which is great for rapidly building command line interfaces
(uninstall it with `npm uninstall commander` if you don't need to make a CLI).

To create a CLI that will become available when someone installs your npm package:

+ Rename `src/cli/cli.ts` to `src/cli/your-main-cli-name.ts`. This is the entrypoint
  for your CLI. If it is simple you could do everything here.
+ Name any subcommand files to `src/cli/your-main-cli-name-subcommand.ts`.
  Update the CLI entrypoint to use the same subcommand names.
  Subcommand scripts *must* start with the same name as your main CLI script,
  and *must* end with an exact command name listed by its parent script
  (one of the `cli.command()` values).
+ Modify the CLI templates to do whatever it's all supposed to do.
+ To make `your-cli-command` available to users who install your
  npm package, add the `bin` field to your `package.json`, like so:
  ```jsonc
  {
    //... other root package.json options
    "bin":{
      "your-cli-command": "build/cli/your-main-cli-name.js"
    }
  }
  ```

Test your CLI locally by running `node build/cli/your-main-cli-name.js -h`.

If you publish your project as an npm module, users who install it will be able
to run `npx your-cli-command` in their terminals, or simply `your-cli-command`
if they've done a global install of your module (with `npm install --global your-module-name`).

### Testing

+ Add tests to `./src/test` as you go.
+ Place any reference data for tests into `./samples`
+ Run tests from the terminal with `npm test` (make sure your code is compiled first).
+ Run tests from VSCode (click the debugger on the sidebar) to use breakpoints and allow inspection:
  + Use the "Tests (ts-node)" option to run your tests without having to first compile.
    This is the best default option, since it prevents you from running tests against old compiled code.
  + Use the "Tests" option to run against your compiled code.
  + Console logs will appear in the Debug Console, where you can also step through your code if you set breakpoints.
  + Edit `./.vscode/launch.json` to add or change the tests.

### Versioning and publishing to npm

When you are ready to increment the version of your project, which by default
is coupled to publishing to `npm` and merging into your `main` branch
(edit this behavior in the `scripts` section of the `package.json`),
use the `npm version` commands. For example:

+ `npm version patch` to bump the patch version, indicated a bugfix
+ `npm version minor` to bump the minor version, indicating a new feature (backwards-compatible)
+ `npm version major` to bump the major version, indicating substantial and/or breaking changes

The `preversion`, `version`, and `postversion` scripts in the `package.json` file dictate what happens
when you use an `npm version` command. By default, the sequence of things that happen are:

1. Checkout `develop` (in case we aren't already on it).
1. Compile your source into plain JavaScript.
1. Run tests against the compiled JavaScript. If any fail, abort here.
1. Increment the version number in the package.json file.
1. Update `CHANGELOG.md` to reflect the new version.
1. `git add` all file changes.
1. Commit changes and create a version tag.
1. Push changes to remote `develop`
1. Checkout `main`, merge in changes from `develop`, and push to remote.
1. Publish package to `npm`.
1. Checkout `develop` so that you're ready to continue coding.

