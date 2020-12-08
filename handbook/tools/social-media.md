# 📋 Social Media

Launch Pad maintains a variety of social media accounts to help us reach out to students and the wider world. This page documents each account and some tips on using each.

## Contributing Content

Any Launch Pad original content could make good social media posts to help us showcase what we do! Just post it in [`#cop-sharing`](https://ubclaunchpad.slack.com/archives/C01622TSU9W) to get started. You can also use this channel to request to have your Launch Pad project featured or shared!

## Accounts

You can find direct links to our accounts in the [`ubclaunchpad.com` site configuration](https://sourcegraph.com/search?q=repo:%5Egithub%5C.com/ubclaunchpad/ubclaunchpad%5C.com%24+file:config.ts+socials%28.*%3F%29%5C%7B%28.%7C%5Cn%29*%3F%7D&patternType=regexp&case=yes). Accounts can easily be linked via [redirects](https://ubclaunchpad.com/config/#adding-a-custom-redirect) (this can also be used to add short links for other things), for example:

* [https://ubclaunchpad.com/facebook](https://ubclaunchpad.com/facebook)
* [https://ubclaunchpad.com/instagram](https://ubclaunchpad.com/instagram)
* [https://ubclaunchpad.com/medium](https://ubclaunchpad.com/medium)

Credentials for accounts are available in the [Exec repository](https://github.com/ubclaunchpad/exec) - please reach out to [`#ask-leads`](https://ubclaunchpad.slack.com/archives/CK935RD3Q) to get in touch with one of the presidents if you are interested in helping us run our social media accounts!

Please reach out to the presidents to create accounts for social media or third-party services so that we can keep track of them. Also see our [email documentation](./email.md).

## Analytics

Analytics are a great way to track the impact of social media posts and campaigns - learn more about the tooling we have in the [analytics documentation](analytics.md)!

## Social Media Campaigns

Outside of occasionally sharing miscellaneous tidbits from [`#cop-sharing`](https://ubclaunchpad.slack.com/archives/C01622TSU9W), we should focus on creating social media posts as part of campaigns, each centered around a long-form article. This helps us have consistent messaging and (hopefully) higher-quality, more engaging content.

::: tip
All content prepared for social media campaigns should be stored or linked to in the [Social Media](https://drive.google.com/drive/folders/1tRSa-obWwr_JU57tpscqmxIUZPlfqckQ?usp=sharing) folder (under Strategy).
:::

::: warning
This is just a guideline for a potential format for social media usage.
Evaluate on a case-by-case basis (particularly with things like the [mini-posts](#mini-posts), which had mixed results when we trialed it in 2020), but if we come up with a new standard or process, please update this document!
:::

### Preparation

Decide on a start date and topic for the social media campaign. A preparation workflow could look like:

1. Create a [Medium article](#medium-articles) (finish 5 days before start date)
2. Split the article into [mini-posts](#mini-posts) (start after creating the Medium article, finish 1 day before start date)
3. Write a [newsletter issue](#newsletter-issues) (start after creating the Medium article, finish 3 days before start date)

#### Medium Articles

Articles should start off as a Google Document in the Launch Pad drive, where the author can collaborate with members of Launch Pad to write a draft. Once the draft is finalized, the author should create a [draft Medium post](https://help.medium.com/hc/en-us/articles/214874698-Your-drafts-posts) under their own account, where final copy edits should take place. Just reach out to get your Medium account added as an editor, and we will be able to submit drafts under our [shared publication](https://ubclaunchpad.com/medium).

Each article should have a footer section copied from our other posts with links to our social media - for example, see the end of [this Medium article](https://medium.com/ubc-launch-pad-software-engineering-blog/what-is-ubc-launch-pad-d3bbfe6322dc).

#### Mini-posts

Once the article is prepared, segment it out into a series of mini-posts that can be adapted to work as Facebook and Instagram posts.

Each of these should generally target a specific section of the article, with:

* A brief blurb for the relevant section of the article
* Some relevant image
* Link to article
  * For Facebook, the link could just be in the body of the post
  * For Instagram, the link could be set in the profile, with a note in the post

#### Newsletter Issues

We currently use [Buttondown](https://buttondown.email/) as our newsletter provider. Newsletter issues have to be written in [Markdown](github.md#markdown), and should contain the following sections:

* High-level summary of what Launch Pad has been up to
* Short blurb for the article and link to it
* Feature other content - this could be old articles, past projects, updates on current projects (like milestones, links to pull requests, etc.)
* Brief summary of what's coming up next

A good tool for drafting newsletter issues in Markdown is [hackmd.io](https://hackmd.io/) - you can log in using the UBC Launch Pad Google account.

#### Short Links

In lieu of a link shortener, we use [redirects (short links)](https://ubclaunchpad.com/config/#adding-a-custom-redirect) for paths on `ubclaunchpad.com` (for example, `ubclaunchpad.com/medium`). We maintain a redirect, `ubclaunchpad.com/latest`, that should always point to the latest campaign's [Medium article](#medium-articles).

::: warning
The `ubclaunchpad.com/latest` short link **should only be used in the Instagram profile's website field and for sharing directly with people** - we don't want links in longer-standing content (for example, Facebook/LinkedIn/newsletter posts) to become outdated over time!
:::

### Publishing

On the start date, a publishing schedule could look like:

1. Publish the [Medium article](#medium-articles)
2. Share the Medium article with a brief blurb on LinkedIn (this should be the only LinkedIn post)
3. Send out the [newsletter issue](#newsletter-issues)
4. Update the [`/latest` short link](#short-links)
5. Post an update in [`#ot-random`](https://ubclaunchpad.slack.com/archives/C061Q5328) about the new campaign
6. On 2-day intervals, publish the [mini-posts](#mini-posts) as Facebook and Instagram posts - for example, at +0 days, +2 days, +4 days, etc. Optionally share the posts as stories as well.
