# Contributing

If you just have an idea for a change but don't want to implement it yourself,
add an [issue](https://github.com/ubclaunchpad/docs/issues) to this repository
(but make sure to check for duplicates first!). Be descriptive and also add
labels as appropriate.

If you want to make a change yourself, you'll need to make a pull request.
To do that:

* Create a new branch locally.
* Make changes and commit them (make sure you have
  [good commit messages](https://chris.beams.io/posts/git-commit/#seven-rules)!).
* Run `make lint` (or just `make`, if you don't have mdl installed yet)
  to ensure your code follows our Markdown style rules.
* Push your local branch to the remote repository.
* Make a pull request on GitHub's web interface.

Make sure to fill out all parts of the pull request template.
Also, check this repository's [issues](https://github.com/ubclaunchpad/docs/issues).
If you think your PR affects an issue, you should reference it in your PR using
`#` followed by the issue's number. For instance, if you think your PR closes
issue #7, you should include the phrase "Closes #7" somewhere in your PR's
description (this will automatically close the issue once your PR is merged),
and if you think it affects but doesn't close it, you should include a phrase
like "Affects #7".

## Scripts

This repo offers a Makefile with some useful scripts that can be run using the
`make` command.

```
make install  # installs our standard Markdown linter
make lint     # runs the linter to check for style errors
make hook     # installs the git commit hook that runs the linter before you commit
```
