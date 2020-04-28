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

## VuePress

This website is based on [VuePress](https://vuepress.vuejs.org/guide/) - refer to the
VuePress documentation for more details.
