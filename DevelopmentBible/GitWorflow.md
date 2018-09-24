# # 🛶 Git Flow
Describes how Launch Pad teams use Git and GitHub to develop new features.

## Branch
When you begin working on a feature or bug fix associated with a GitHub issue, create a new branch from the project's primarily development branch (usually `master`). Name the branch using the following naming scheme: `<name>/#<issue number>-<issue-description>`. For instance, if Eric is working on issue #23, which is for adding a like button, he would name his branch `eric/#23-like-button`.

## Develop
All new code should be committed to the issue branch created above. Commit and push early and often. Commits should contain logical chunks of functionality and should be accompanied by a descriptive commit message.

## Pull Request
When the issue being worked on is ready to be merged into master, create a pull request on GitHub. Request a review from anyone who is familiar with the section of the codebase being worked on. **At least** one other team member must review every pull request before it is merged. If the reviewer requests changes, update the PR accordingly and request another review. Once the reviewer accepts the changes, merge the PR. Once it is merged, delete the branch.
