
# 🏃 Sprint Planning <Badge type="tip" text="updated"/>

Launch Pad uses "agile" software development, as is common in industry. This allows teams to manage small, achievable milestones and adjust projects as needed quickly and effectively.

An important part of being "agile" is sprint planning and defining units of work ("tasks", sometimes referred to as "issues") - this document will take you through what that entails and how to utilize it to get your projects out to the world!

This information is useful to everyone, regardless of your role at Launch Pad.

::: tip

This is **guidance** - feel free to adapt it to your team's needs and habits! If you have suggestions that have worked out for your team, please contribute them to this document!

:::

## What is a Sprint?

At Launch Pad, a **sprint** will typically constitute a period of work spanning a week. At the start of each sprint, you will:

* Reflect on your previous sprint
* Plan work for the coming sprint

During each sprint, each member should have a few assigned tasks to work on - this is the primary way of driving forward progress on a project.

## Sprint Meetings

Sprint meetings should be conducted at the very start or end of each sprint. Most sprint meetings should have the following structure - we've also provided some guidance on roughly how long each step should take, though this will vary per team.

At the start of the project, the lead should have created a project folder in Google Drive with a meeting document and shared it with their team - ask your lead if you don't have access to your team's meeting notes and project folder.

1. 📝 **Prep:** 1-2 days before your meeting, update your meeting document to outline all of the following parts of the meeting in a few words per point.
   * The goal is to have everyone briefly think about what they've achieved and problems they've faced so that meetings can run more smoothly!
   * A good way to do this is to have a document posted to your team's Slack channel or your team's GitHub discussions so everyone can add to it at their leisure before your team meeting. An example of document could be one where each member contributes the following:
      > **Last Week**:
      > * Started working on issue #1
      > * Submitted PR #2 for logging
      >
      > **This Week**:
      > * Continue to work on issue #1
      > * Get PR #2 reviewed and merged
      >
      > **Blockers**:
      > * Had 3 mid terms last week
      > * Could not get debugger to work
2. ✈️ **Overview:** At the start of the meeting, the lead gives general updates or comments overall progress (~1-2 minutes)
3. 👋 **Standup:** Each member gives updates on their progress and reflects on their work during the previous sprint (~2-3 minutes/person)
    * Each member should bring up their accomplishments or difficulties they've had during the sprint with their assigned task
    * The lead can make quick suggestions on future work based each member's update
4. 🚀 **Action Items:** Finalize tasks that need to be done and assign work for everyone (~5-10 minutes)
    * [Define and create tasks](#tasks) as GitHub issues, and make sure each member has a task assigned (new or old) through a GitHub issue
5. ❓ **Follow-up**: Leave some time after each meeting to help each other out with any issues, discuss the project, or just socialize!

## Tasks

### Defining Tasks

A **task** is a unit of work that needs to be done. One way of making sure a task is clear is to answer the following:

* 💪 **Purpose**: Why does this task need to be done?
* ✔ **Definition of Completion**: At what point is this task complete?

A *definition of completion* creates a clear view of what a task encapsulates. This helps the team member working on the task know what to work towards and when to stop.

### Managing Tasks

Each task should be tracked as a **GitHub issue** (this is why we sometimes call tasks "issues"). Learn more about issues in [our GitHub guide](/handbook/tools/github.md#issues), or in [GitHub's official project management documentation](https://github.com/features/project-management/).

Each issue should clearly state the purpose and definition of completion of the task, as well as any other relevant information - **your goal is to leave enough information so that someone can hop into an issue and know exactly what is going on and what to do**.

One way to do this is to liberally use issue references! On GitHub, each issue and pull request is assigned a number, using `#IssueNumber` (for example, `#13`) anywhere on GitHub will automatically create a link from one issue to another (and this works for pull requests as well!). This helps keep relevant information connected to each issue.

Some examples of good tasks recorded as GitHub Issues:

* [`ubclaunchpad/ubclaunchpad.com#14`](https://github.com/ubclaunchpad/ubclaunchpad.com/issues/14)
  * ✅ Description includes a clear set of functionality that an implementation must achieve (the definition of completion)
  * ✅ Discussion includes ideas, a (literal) sketch of the implementation, and links to relevant resources
* [`ubclaunchpad/rocket2#207`](https://github.com/ubclaunchpad/rocket2/issues/207)
  * ✅ Description includes a clear purpose ("the current implementation is unsustainable") and a clear definition of completion ("a new command to do x")
  * ✅ Discussion questions the specifics of the feature, how it will work, and links to relevant issues
* [`ubclaunchpad/inertia#133`](https://github.com/ubclaunchpad/inertia/issues/133)
  * ✅ Description includes clear goals of the task, as well as a sketch of what an implementation might look like
  * ✅ Discussion links relevant documentation to dependencies
* [`ubclaunchpad/inertia#626`](https://github.com/ubclaunchpad/inertia/issues/626)
  * ✅ Description includes a full error log and reproduction steps - this is useful for anyone trying to fix the problem!
  * ✅ Discussion involves more logs, abundant links to relevant issues, and a full record of the exact steps taken to resolve the problem

You can also attach [labels](https://help.github.com/en/github/managing-your-work-on-github/applying-labels-to-issues-and-pull-requests) and [milestones](https://help.github.com/en/github/managing-your-work-on-github/viewing-your-milestones-progress) to each issue, and for those familiar with Kanban Boards, you can use [GitHub Projects](https://help.github.com/en/github/managing-your-work-on-github/about-project-boards) to help manage your issues. Feel free to pick a workflow that feels the most natural for your team!
