# 🚢 Deployment

For general deployment advice, see [the Deployment page in Resources](/resources/deployment.md). This page specifically documents options available to Launch Pad projects.

## General

### Domains

The `ubclaunchpad.com` domain is managed through the GSuite Admin Console (along with [Drive](./drive.md) and [email](./mail.md)) by the co-presidents.
We can set up records (though typically you'll just want `CNAME`) for a `ubclaunchpad.com` subdomain (such as `docs.ubclaunchpad.com`) for you if needed - just reach out in `#ask-leads` for help!

Note that if you wish to deploy using Netlify _and_ you want a `ubclaunchpad.com` subdomain, you must use the UBC Launch Pad OSS account - see our [Netlify guide](#netlify) for more details.

## Frontends

### Netlify

[Netlify](https://www.netlify.com/) is a service for continuously building and deploying web applications from a GitHub repository. It also includes nice features such as branch previews.

There are two options for deploying your project using Netlify:

- **Deploy using your own Netlify account** - this means you must use the provided `netlify.app` domain, or buy another domain to use.
- **Deploy using the [UBC Launch Pad Sponsored OSS account](https://app.netlify.com/teams/launchpad-oss/sites)** - this is a paid account that Netlify has sponsored us with. You must use this account if you wish to deploy your Netlify app on a `ubclaunchpad.com` domain - for example, [ubclaunchpad.com](https://ubclaunchpad.com), [docs.ubclaunchpad.com](https://docs.ubclaunchpad.com), [design.ubclaunchpad.com](https://design.ubclaunchpad.com), and [sync.ubclaunchpad.com](https://sync.ubclaunchpad.com) are deployed using this account. To get set up, just reach out to [`#ask-leads`](https://ubclaunchpad.slack.com/archives/CK935RD3Q) once you have met the following [requirements for using the sponsored account](https://www.netlify.com/legal/open-source-policy/):
  - Made your project repository public (most teams will do this from the beginning anyway)
  - Add a [liberal license like MIT](https://opensource.org/licenses) or a [Creative Commons license](https://creativecommons.org/choose/) to your repository
  - Add some text linking to the [Netlify website](https://www.netlify.com/) saying `This project is powered by Netlify` or similar. You can also use [one of their badges](https://www.netlify.com/press/#badges).
  - Made sure your project is not a commercial project (most Launch Pad projects won't have this issue, but do keep this in mind)

We recommend using [Netlify's file-based configuration](https://docs.netlify.com/configure-builds/file-based-configuration) to make your site configuration visible and easier to redeploy in the future if we move accounts - take a look at [`netlify.toml` examples in Launch Pad](https://sourcegraph.com/search?patternType=literal&q=repo:^github.com/ubclaunchpad/*+file:netlify.toml) for reference.

## Backends

### Inertia

[Inertia](https://github.com/ubclaunchpad/inertia) is a UBC Launch Pad project designed to continuously build and deploy Docker-based projects from a GitHub repository to a cloud VPS instance. More details are available in [Resources](/resources/deployment.md#inertia), the [Inertia Usage Guide](https://inertia.ubclaunchpad.com/), or in the [`#ask-inertia`](https://ubclaunchpad.slack.com/archives/CJVF27QUS) channel on Slack.

[`ubclaunchpad/rocket2`](https://github.com/ubclaunchpad/rocket2) currently uses Inertia for deployment to an AWS EC2 instance.

### Heroku

[Heroku](/resources/deployment.md#heroku) is also a good option that UBC Launch Pad has used in the past. It is a cheap alternative to deploy simple applications. Heroku has a free option that is useful for demos or for applications that do not require to stay up all the time.

[`ubclaunchpad/sync`](https://github.com/ubclaunchpad/sync) uses Heroku to deploy its backend.

::: tip
As a student, you have access to [GitHub's student developer pack](https://education.github.com/pack), which includes a free Heroku [hobby dyno](https://devcenter.heroku.com/articles/dyno-types). The hobby dyno is a great deployment option for small scale applications, and unlike the free dyno, the application does not go to sleep.
:::
