# 🏃 Sprints

Launch Pad uses agile software development, as is common in industry. In
particular, Launch Pad uses a mixture of the Scrum and Kanban methodologies.
This allows teams to manage small, achievable milestones and adjust projects as
needed quickly and effectively.

An important part of the Scrum development methodology is sprint planning, where
the team decides what issues they will work on for the next week or two.
This document explains Launch Pad's sprint planning guidelines.

## Backlog

Before development on a project begins, the backlog should contain Epics that
describe the project's requirements. As needed, these Epics should be broken
down into smaller issues that build toward completing the Epic. Issues should
be as small as possible but still contain enough information for
**anyone on the team** to understand. Issues in the backlog should be ordered
by priority.

## Estimation

Every issue created during sprint planning should have an estimate before work
on it starts. Estimates for issues should be in terms of **relative complexity**,
not time. The magnitude of estimates doesn't matter, so long as two issues that
have the same estimate have approximately the same complexity.

The smaller in scope an issue is, the more accurately it can be estimated, so
try to break down larger issues into several smaller-scoped ones.

Before beginning a project, teams should decide on some guidelines for estimation.
For instance, an estimate of 1 is about as much work as adding an extra button
in a navigation bar, and an estimate of 5 is about as much work as fetching and
parsing data from GitHub's API.

## Scrum Meeting

Every week, each team should have a Scrum meeting from 11AM-12PM. At these
meetings, teams should:

* Conduct a standup, where each member discusses what they accomplished during
  the previous week and if anything is preventing them from completing their
  currently assigned tasks ("blockers"). If there are blockers, add the
  dependency relationship in ZenHub.
* Update the ZenHub board as needed based on completed tasks. If the backlog is
  small or empty, create new issues for unimplemented components from the
  requirements.
* Create a milestone for the sprint. Select issues from the backlog to
  incorporate into the next sprint, assign them to the member with relevant
  interest, experience, and/or bandwidth, and add them to the milestone.
  Since every issue has an estimate, teams will discover their "weekly
  bandwidth", measured in estimate points (or story points), after a few sprints.
* If tasks require design work, make sure to note them alongside the task and
  communicate the requirements to your team's designer(s).
