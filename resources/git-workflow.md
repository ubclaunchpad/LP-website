# 🛶 Git Workflow

Teams at Launch Pad will use the git version control system and GitHub website
to build software collaboratively. This document starts with a "zero-to-hero"
guide to Git and concludes with a recommended GitHub workflow for Launch Pad
teams as well as a basic intro on how to execute that workflow yourself.

If you're familiar with Git, feel free to jump ahead to the [recommended workflow](#recommended-workflow) section.

## Git Zero to Hero

### What is Git?

Git is a *version control system* - a tool that lets you maintain
a timeline of changes that have occured in your project. Think of it as awesome alternative to saving dozens of copies of a document labelled "report-v1", "report-v2", "report-FINAL", and so on. Having version
history is great because you get to freely make changes without ever worrying
about losing prior work.

::: tip
Git is not the same thing as Git*Hub*. GitHub is a platform that lets you store
(and do other things) your Git-tracked folders (known as repositories) on a
remote server. This lets you easily share these repositories across team
members.
:::

On top of keeping history, Git comes with a set of features that make it truly
great for collaborative work. Git allows you to create *branches*, alternative
versions of your code, that could later be *merged* back to the main history.
This allows everyone to make changes to a repository without worrying
about changes that other people are doing!
We'll get to this in a bit - let's first talk about how to get your repository
set up.

### Creating a Repository

TODO: Should this be more conceptual or more tutorial-like?

### Saving Changes

Saving changes in a Git repository is a two-step process: first you have to
*stage* your changed files, then you have to *commit* them.

You can think of a Git commit as a snapshot along your project
timeline. Each commit comes with a message that describes what changes each
new snapshot introduced, and consists of a "diff" - the difference between
this snapshot and the previous.

### Branches

### Merging

## Recommended Workflow

### Updating Your Copy of the Codebase

Most projects will have a primary branch, which will usually be called `master`.
Before beginning new development, make sure you have checked out your project's
`master` branch and have the most recent commits from your GitHub repo on your
local `master` branch by:

```
git checkout master
git pull
```

### Using Branches

When you begin working on a feature or bug fix associated with a GitHub issue,
create a new branch from `master`; the most convenient way to do this is:

```
git checkout -b <my-new-branch>
```

Branch naming varies from team to team - one format is to name it with the
following template:

```
<name>/#<issue-number>-<issue-description>
```

For instance, if Eric is working on issue #23, which is for adding a like
button, he would name his branch `eric/#23-like-button`.

Alternatively, a larger project can name branches based on the component being
affected, like so:

```
<component>/#<issue-number>-<issue-description>
```

For example, if you're adding a like button to the user profile page, you would
name your branch `profile/#23-like-button`.

If you have been working on your branch for a while, there may have been updates
to your project's `master` branch that you want to include in your branch. To
update your branch, run the following command:

```
git pull origin master
```

Alternatively, you can rebase ("replay" your commits on top of the latest
`master` commit) instead by running `git pull --rebase origin master` instead.

### Developing and Committing Code

All new code should be committed to the new issue branch. To make commits, first
you must "stage" your new code:

```
git add .
```

This will add all edited files in your project to "staging", which means it will
be part of your next commit. You can add individual files as well using
`git add <my-file-name>`. When you have finalized your change, you should commit
it using the following command:

```
git commit -m "<my-description>"
```

Commits on the remote issue branch should contain logical chunks of functionality
and be accompanied by descriptive commit messages. A commit description should
be a brief, succinct, and accurate overview of your changes - messages like
"fix" or "attempt 12" are uninformative and unhelpful, while "Added check to
account for edge case in render()" is a good message. You can refer to
[this guide](https://chris.beams.io/posts/git-commit/#seven-rules) for an
overview of how to write good commit messages.

When you're happy with a chunk of functionality, which is usually be built
over several commits, you should push it to a remote (i.e. GitHub) branch. The
easiest way to do this is to run the following command:

```
git push origin HEAD
```

Commits can be edited if you feel your commits are not descriptive enough - if
you would like some help doing so, ask your Tech Lead.

### Pull Request

When the issue being worked on is ready to be merged into `master` and all
relevant commits on that branch have been pushed to GitHub, OR when you feel
like you are stuck and need help, create a pull request on GitHub. Opening
work-in-progress pull requests for your branch is a good way to get feedback on
your direction and get pointers on how to best complete your task.

* Request a review from anyone who is familiar with the section of the codebase
  being worked on; it is often a good idea to request a review from your Tech Lead
  as well.
* **At least** one other team member must review every pull request before it is
  merged (your team should be enforcing this with GitHub's repository controls).
* If a reviewer requests changes, update the PR accordingly and request another
  review.
* Once the reviewer accepts the changes, merge the PR.
* Once it is merged, delete the branch.

Learn more about pull requests in our [handbook's GitHub guide](../handbook/tools/github.md).
