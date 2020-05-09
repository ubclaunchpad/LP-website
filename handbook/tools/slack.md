# Slack

We use Slack for team-wide communication, announcements, and project-specific
coordination. The workspace can be found [here](https://ubclaunchpad.slack.com).
You should receive an invite in your email to join the workspace - if you haven't,
please reach out to your lead or one of the presidents.

## Slack Best Practices

* Install Slack on your devices and enable notifications so you don't miss
  discussions and annoucements!
* Name channels after our naming scheme (detailed in the next section).
* [Use threads](https://slackhq.com/getting-the-most-out-of-threads) for
  conversations, especially in large channels! This helps prevent spam and makes
  it easier to catch up on missed conversations.
* If it is important, **do not leave it in Slack**! We are on the free tier of
  Slack, so messages eventually expire. Anything important or permanent should
  be in a GitHub issue, version-controlled document, or wiki page.

## Finding Channels

We use a channel naming scheme to make channels easier to find (based on this
proposal: [ideas#13](https://github.com/ubclaunchpad/ideas/issues/13)) that
leverages the following prefixes:

* `#ot-` for "off-topic" discussions, such as those related to a particular hobby
* `#cop-` for "community of practice" discussions, such as those related to a
  skill or technology
* `#ask-` for question channels, mostly for questions aimed at teams to Launch
  Pad members that aren't a part of a team a space to ask questions
* `#tm-` for teams
* `#nt-` for notifications (some Slack bots and integrations can send updates
  to specific channels)

All channels should be named using this scheme.

Some channels are featured in this document, but you can easily find a full list
of each category of channel by searching for a prefix!

### Community of Practice (`#cop-`) Channels

* [`#cop-tech-talks`](https://ubclaunchpad.slack.com/messages/C9VGF4V8C/): Talk
  about and sign up to do tech talks!
* [`#cop-programming-langs`](https://ubclaunchpad.slack.com/messages/CAA45KZU6/):
  General discussion of programming languages and related topics
* [`#cop-graphics`](https://ubclaunchpad.slack.com/messages/CEHRAF0MD/):
  General discussion of computer graphics and animation
* [`#cop-interview-prep`](https://ubclaunchpad.slack.com/messages/CD71Y6TP1/):
  General interview prep discussion and practice
* [`#cop-hackathons`](https://ubclaunchpad.slack.com/messages/C8WT5DV1C/): Find
  hackathons and teams

### Off-Topic (`#ot-`) Channels

* [`#ot-buy-and-sell`](https://ubclaunchpad.slack.com/messages/CJVFFGYUT/): UBC
  Launch Pad buy and sell!
* [`#ot-memes`](https://ubclaunchpad.slack.com/messages/CFBN3BX8Q/): What's life
  without some dank memes to spice it up?
* [`#ot-rock-it-beats`](https://ubclaunchpad.slack.com/messages/CC2JK7677/):
  Music to code to!
* [`#ot-alumni`](https://ubclaunchpad.slack.com/messages/CAQ457K7H): Reach out to
  past LaunchPals
* [`#ot-bubble-tea`](https://ubclaunchpad.slack.com/messages/CK0HDCUV7): Talk
  about everyone's favourite drink
* [`#ot-gym`](https://ubclaunchpad.slack.com/messages/CG8GUAEPK): Get big and
  work off those BBT calories!

### Ask Leadership and Teams (`#ask-`) Channels

* [`#ask-for-help`](https://ubclaunchpad.slack.com/messages/CJXM08QBB): An open
  space for all questions!
* [`#ask-leads`](https://ubclaunchpad.slack.com/messages/CK935RD3Q/): Questions
  for Launch Pad leadership
* [`#ask-design`](https://ubclaunchpad.slack.com/messages/C747550BD): Questions
  for Launch Pad's design teams
* [`#ask-rocket`](https://ubclaunchpad.slack.com/messages/CK93HTYQN): If rocket isn't working, use it to express your frustrations
* [`#ask-strategy`](https://ubclaunchpad.slack.com/messages/CJVF0FQHG): Questions
  for Launch Pad's strategy team
* [`#ask-swag`](https://ubclaunchpad.slack.com/messages/C7Z1K8XNE): Swag requests
  and questions regarding Launch Pad merchandise!

## Bots & Apps

### Rocket

[Rocket 2](https://github.com/ubclaunchpad/rocket2) is our very own Slack bot,
used for managing our roster across Slack and GitHub. Members use it mainly to
automatically add themselves to the GitHub organization.

You can get started by editing your profile to include your GitHub username
with `/rocket user add` and `/rocket user edit --github <username>`. The first
command will add your Slack account into the system and the second will link
your account to GitHub and send an invitation for the UBC Launch Pad
organization.

For more commands, type `/rocket help`. If you are interested in how it works,
check out the [documentation page](https://rocket2.readthedocs.io/en/latest/).

### Pull Reminders

[Pull Reminders](https://pullreminders.com/) is an awesome way to stay up to date
on your team's project through notifications and pull request review reminders
delivered straight to your Slack account. The website also features some slick
graphs and leaderboards to help visualize your hard work and compare against
your peers.

You can configure Pull Reminders for your account through the website of the
Slack bot - just shoot `@Pull Reminders` a message in the Launch Pad Slack
workspace!
