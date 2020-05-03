# Contributing to docs.ubclaunchpad.com

> Source repository: [`ubclaunchpad/docs`](https://github.com/ubclaunchpad/docs)

If you just have an idea for a change but don't want to implement it yourself,
add an [issue](https://github.com/ubclaunchpad/docs/issues) to this repository
(but make sure to check for duplicates first). Be descriptive!

If you want to make a change yourself, you'll need to make a pull request.
To do that:

1. Download the repository and create a new branch locally:
   ```
   git clone https://github.com/ubclaunchpad/docs.git
   git checkout -b my-new-branch
   ```
2. Make changes and commit them (make sure you have
  [good commit messages](https://chris.beams.io/posts/git-commit/#seven-rules)!).
3. Run `npm install` and `npm run lint` to ensure your code follows our Markdown style rules.
   * (optional) run `npm run serve` to test out the updated website locally!
4. Push your local branch to the remote repository.
5. Make a pull request on GitHub's web interface.

Make sure to fill out all parts of the pull request template.
Also, check this repository's [issues](https://github.com/ubclaunchpad/docs/issues).
If you think your PR affects an issue, you should reference it in your PR using
`#` followed by the issue's number. For instance, if you think your PR closes
issue #7, you should include the phrase "Closes #7" somewhere in your PR's
description (this will automatically close the issue once your PR is merged),
and if you think it affects but doesn't close it, you should include a phrase
like "Affects #7".

## Scripts

This repo offers some `package.json` scripts to help you out:

```sh
npm install      # installs our standard Markdown linter and site builder
npm run lint     # runs the linter to check for style errors
npm run hooks    # installs the git commit hook that runs the linter before you commit
npm run serve    # runs the website locally
```

## Structuring Content <Badge type="tip" text="new"/>

* Any folders deeper than the top-level documents (such as `handbook/`, `resources/`) should not have a dedicated README in its folder - instead, a "table of contents" of the directory should be placed in one of the top-level documents' READMEs.
  * For example, the contents of `resources/project-management` are listed in `resources/README.md` and *not* `resources/project-management/README.md`.
* Before creating a new section, look for an existing section where your new content could live instead, and create links from other relevant sections if possible.
* In general:
  * `handbook/` should have Launch Pad-specific documentation (some of it might be generally useful, however - if so, link to it from Resources)
  * `resources/` should have general learning resources
* Feel free to add a badge to new or updated content:
  ```
  <Badge type="tip" text="new"/>
  ```

## VuePress

This website is based on [VuePress](https://vuepress.vuejs.org/guide/) - refer to the
VuePress documentation for more details.

Most VuePress configuration lives in [`.vuepress/config.js`](./.vuepress/config.js).

## Deployment

Deployments are handled automatically by the [Netlify](https://www.netlify.com/) - the website is managed under the "Launch Pad OSS Sponsored" team. Build and deploy options can be declared in [`netlify.toml`](./netlify.toml).

This means that when your changes are merged to `master`, your contribution will automatically be deployed!

Also note that individual pull requests also get their own preview deployment - Netlify will comment on your pull request with a link to the preview. This is useful for reviewing changes! Look out for a comment from the Netlify bot.
