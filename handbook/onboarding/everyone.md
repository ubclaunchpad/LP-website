# 🚀 Onboarding for Everyone

Welcome to UBC Launch Pad! This page takes you through some important items you need to get started 💪

## Checklist

::: tip
If you don't have access to anything, or if you can't complete any of these steps for whatever reason, or if you have any questions, drop a message in [`#ask-leads`](https://ubclaunchpad.slack.com/messages/CK935RD3Q/)!
:::

### Slack Access

Make sure you are part of the [UBC Launch Pad Slack workspace](https://ubclaunchpad.slack.com/).

* Make sure you install the Slack app on your phone and laptop so you don't miss anything!
* Read our [Slack](/handbook/tools/slack) guide, which will tell you how to make the most of Slack, how to find and meet people, and any noteworthy channels you should join off the bat!
  * Don't forget to add your full name and a photo of yourself in your Slack profile to help everyone get to know you!

### Rocket Setup

[Rocket](https://github.com/ubclaunchpad/rocket2) is our Slack bot and team management tool - make sure you help Rocket get to know you! In any Slack channel, write the following:

```
/rocket user add
```

Then, you can give it some information about you - the following are particularly important, since it is how you will be granted access to the correct [GitHub teams](#github-access) and [Google Drive folders](#drive-access):

```
/rocket user edit --github USERNAME
/rocket user edit --email EMAIL
```

For example, if your GitHub username is `JaneDoe` and your email is `janedoe@gmail.com`, you would write:

```
/rocket user edit --github JaneDoe
/rocket user edit --email janedoe@gmail.com
```

You can verify your information is correct by sending:

```
/rocket user view
```

Learn more about Rocket in our [Slack guide's Rocket section](/handbook/tools/slack#rocket)!

### GitHub Access

Make sure you are part of the [UBC Launch Pad GitHub organization](https://github.com/ubclaunchpad/). [Rocket](#rocket-setup) should do this for you - check your email for an invitation! Please do not ask to be added directly without checking with `#ask-rocket` if there is a problem.

* You should be able to access our private repositories, such as [`ubclaunchpad/ideas`](https://github.com/ubclaunchpad/ideas)
  * If you can't see the Ideas repository, check that you are in the GitHub team [`@ubclaunchpad/all`](https://github.com/orgs/ubclaunchpad/teams/all) - if not, make sure you've [set up your profile on Rocket](#rocket-setup)!
* Read our [Intro to GitHub](../tools/github.md) guide, which will help you get started on leveraging GitHub and setting up notifications.
  * Make sure you read the section on notifications for Slack - GitHub will be the primary way to manage tasks and have structured discussions, so you don't want to miss any updates!

### Drive Access

Make sure you have access to our [Projects Folder](https://drive.google.com/drive/u/0/folders/18piFDBdAUuZAOf9xOgpf2_HBUuVNae0S) on Google Drive - this is where your team's loose documents will live. [Rocket](#rocket-setup) should do this for you - check your email for an invitation! Please do not ask to be added directly without checking with `#ask-rocket` if there is a problem.

## Further Actions

If you've got everything set up, congratulations - you are pretty much good to go! Make sure you take some time to get to know this website - it should contain everything you need to know to kickstart your time with Launch Pad, and if anything is missing please [let us know](https://github.com/ubclaunchpad/docs/issues/new)!

* [Handbook](../README.md)
* [Resources](../../resources/README.md)

For some of you, there are additional things you should be aware of:

* [for Design](./design.md)
* [for Strategy](./strategy.md)
* [for Leads](./leads.md)

When project teams are formed, make sure your tech lead adds you to the appropriate [Rocket](/handbook/tools/slack#rocket) team!
