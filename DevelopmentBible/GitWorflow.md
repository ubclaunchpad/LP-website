# 🛶 Git Workflow

Teams at Launch Pad will use the git version control system and GitHub website to build software collaboratively.
This document describes a recommended GitHub workflow for Launch Pad teams.

## Pull Latest
Most projects will have a primary branch, which will usually be called `master`.
Before beginning new development, make sure you have the most recent commits from your GitHub repo on your local `master` branch by running `git pull`.

## Branch
When you begin working on a feature or bug fix associated with a GitHub issue, create a new branch from `master`;
the most convenient way to do this is `git checkout -b branch_name`, where `branch_name` is the name for the new branch.
Name the branch using the following naming scheme: `<name>/#<issue number>-<issue-description>`.
For instance, if Eric is working on issue #23, which is for adding a like button, he would name his branch `eric/#23-like-button`.

## Develop
All new code should be committed to the new issue branch.
Commit early and often--you can always edit your commits later before you push.

When you're happy with a chunk of functionality, you should push it to the remote (i.e. GitHub) issue branch.
The first time you try to do so on a new branch, you will likely encounter an error message similar to the following:
```
fatal: The current branch migration has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin migration
```
Don't panic!
Just run the recommended command and everything should work.

Commits on the remote issue branch should contain logical chunks of functionality and be accompanied by descriptive commit messages.
It is usually preferable to clean up your local commits before pushing;
if you would like some help doing so, ask your Tech Lead.

## Pull Request
When the issue being worked on is ready to be merged into `master` and all relevant commits on that branch have been pushed to GitHub, create a pull request on GitHub.
Request a review from anyone who is familiar with the section of the codebase being worked on;
it is often a good idea to request a review from your Tech Lead as well.
**At least** one other team member must review every pull request before it is merged
(your team should be enforcing this with GitHub's repository controls).
If a reviewer requests changes, update the PR accordingly and request another review.
Once the reviewer accepts the changes, merge the PR.
Once it is merged, delete the branch.
