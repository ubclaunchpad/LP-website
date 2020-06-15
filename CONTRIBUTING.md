# Contributing to docs.ubclaunchpad.com

> Source repository: [`ubclaunchpad/docs`](https://github.com/ubclaunchpad/docs)

If you just have an idea for a change but don't want to implement it yourself,
add an [issue](https://github.com/ubclaunchpad/docs/issues) to this repository
(but make sure to check for duplicates first). Be descriptive!

## Making a Change

The content in this website is written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), a plain-text markup format. We use [VuePress](#vuepress) to convert Markdown files into this website - making a change to `docs.ubclaunchpad.com` simply involves editing these files.

### The Easy Way

The easiest way to make a quick change is to simply hit the "Help us improve this page" link that's available on the bottom of every page:

![help us](./img/help-us-improve.png)

This will open up an editor in the GitHub interface, where you can make small changes and submit them as a pull request entirely from your browser.

### The Complete Way

While the [Easy Way](#the-easy-way) is good for small changes, writing larger chunks of content is best done from the comfort of your computer. To do this, make sure you have [Node.js](https://nodejs.org/en/) installed, then:

1. Download the repository and create a new branch locally:
   ```
   git clone https://github.com/ubclaunchpad/docs.git
   git checkout -b my-new-branch
   ```
2. Make changes and commit them (make sure you have [good commit messages](https://chris.beams.io/posts/git-commit/#seven-rules)!)
   * We recommend using [Visual Studio Code](https://code.visualstudio.com/).
3. Run `npm install` and `npm run lint` to ensure your code follows our style rules.
   * (optional) run `npm run serve` to test out the updated website locally!
4. Push your local branch to the remote repository using `git push origin HEAD`
5. Make a pull request on GitHub's web interface (and make sure to fill out the provided template!)
6. [Netlify](https://www.netlify.com/) will then deploy a preview of your change - see [Deployment](#deployment)

More details on using `git` is available in our [Git Workflow guide](./resources/git-workflow.md).

## Structuring Content

In general:

* `handbook/` should have Launch Pad-specific documentation (some of it might be generally useful, however - if so, link to it from Resources)
* `resources/` should have general learning resources
* Before creating a new section, look for an existing section where your new content could live instead, and create links from other relevant sections if possible.
* Feel free to add a badge to new or updated content:
  ```
  <Badge type="tip" text="new"/>
  ```
* Images should go in a `/img` folder in the same directory.
* Headers can *start* with emoji, but don't put emojis anywhere else in a header!
* Use **relative links** to content within the website - this means `/handbook/file.md` instead of `https://docs.ubclaunchpad.com/..`!

### Nested Folders

Any folders deeper than the top-level documents (such as `handbook/`, `resources/`) should *not* have a dedicated README in its folder - instead, a "table of contents" of the directory should be placed in one of the top-level documents' READMEs. For example, the contents of `resources/project-management` are listed in `resources/README.md` and *not* `resources/project-management/README.md`.

When adding a new file to a subfolder of content (for example, `handbook/tools`), make sure you:

* add a link to `handbook/README.md`
* if the subfolder has a [defined sidebar group](https://sourcegraph.com/search?q=repo:%5Egithub%5C.com/ubclaunchpad/docs%24+file:%5E%5C.vuepress/config%5C.js+sidebar&patternType=literal), add your new page to the group

## Technical Details

### Scripts

This repo offers some `package.json` scripts to help you out:

```sh
npm install      # installs our standard Markdown linter and site builder
npm run lint     # runs the linter to check for style errors
npm run hooks    # installs the git commit hook that runs the linter before you commit
npm run serve    # runs the website locally
```

### VuePress

This website is based on [VuePress](https://vuepress.vuejs.org/guide/) - refer to the
VuePress documentation for more details. VuePress takes the [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) content in this repository (all those `.md` files) and turns them into the pretty website on `docs.ubclaunchpad.com`.

Most VuePress configuration lives in [`.vuepress/config.js`](./.vuepress/config.js).

### Deployment

Deployments are handled automatically by the [Netlify](https://www.netlify.com/) - the website is managed under the "Launch Pad OSS Sponsored" team. Build and deploy options can be declared in [`netlify.toml`](./netlify.toml).

This means that when your changes are merged to `master`, your contribution will automatically be deployed!

Also note that individual pull requests also get their own preview deployment - Netlify will comment on your pull request with a link to the preview. This is useful for reviewing changes! Look out for a comment from the Netlify bot.
