# 🐹 Deployment

This page outlines tips, resources, and tools for getting your team's project
deployed and running!

::: warning
This section is a work in progress.
:::

## Inertia

Several Launch Pad projects in the past have utilized our in-house deployment
tool, [Inertia](https://github.com/ubclaunchpad/inertia), to kickstart their
projects.

A comprehensive usage guide is available in the [Inertia documentation](https://inertia.ubclaunchpad.com/).
A good place to start might be to look into leveraging
[Inertia's AWS integration](https://inertia.ubclaunchpad.com/#provisioning-a-remote)
that lets you easily provision a remote for deployment.

Feel free to swing by [#ask-inertia](https://ubclaunchpad.slack.com/messages/CJVF27QUS/)
if you have any questions!

## Heroku

[Heroku](https://www.heroku.com/what) is a cloud platform that allows you deploy a variety of applications. Heroku can be used as a [remote target](https://devcenter.heroku.com/articles/git), or you can have it [track a branch on a Github repository](https://devcenter.heroku.com/articles/github-integration) and auto-deploy whenever that branch is updated. You can find more information on [Heroku's documentation](https://devcenter.heroku.com/).

Heroku is typically a good option to quickly bootstrap applications, it also offers a [free option](https://www.heroku.com/free) with some limitations.
