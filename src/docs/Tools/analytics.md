# 📊 Analytics

Analytics are a fantastic way to get some concrete feedback on what users are doing on your applications. Sometimes, you might be surprised to see that a project you think nobody uses actually gets a consistent trickle of traffic! This page documents some recommended ways you can set up analytics for your projects at Launch Pad.

## Web Projects

[Fathom Analytics](https://usefathom.com/) is a simple, lightweight web analytics service that we use in several Launch Pad projects. As a sponsor, they are currently providing us with a paid account to leverage for this purpose. Here are some dashboards for Launch Pad projects:

- [`ubclaunchpad.com`](https://app.usefathom.com/share/ftsspsgr/ubclaunchpad.com)
- [`docs.ubclaunchpad.com`](https://app.usefathom.com/share/oemmhhle/docs.ubclaunchpad.com)
- [`sync.ubclaunchpad.com`](https://app.usefathom.com/share/lpvlowxe/sync.ubclaunchpad.com)
- [`ubcsim2.ubclaunchpad.com`](https://app.usefathom.com/share/dymzbwsl/ubcsim2.ubclaunchpad.com)

To get started, reach out to [`#ask-leads`](https://ubclaunchpad.slack.com/messages/CK935RD3Q/) to get a site and dashboard set up in Fathom - we will provide you with a site code and public dashboard.

Using the site code, you can now set up analytics on your project! Note that we have a custom domain set up for our tracker script, `https://chinchilla.ubclaunchpad.com/script.js`, to avoid being blocked by adblockers (this is especially important given that Launch Pad projects are relatively low-traffic).

- Most projects can leverage the provided [code snippet](https://usefathom.com/support/tracking). Make sure you take a look at the [advanced options](https://usefathom.com/support/tracking-advanced) to make sure your snippet is configured correctly - for example, a good setup for a ReactJS project would be:
  ```html
  <script
  	src="https://chinchilla.ubclaunchpad.com/script.js"
  	site="XXXXXXXX"
  	spa="auto"
  	excluded-domains="localhost"
  	defer
  ></script>
  ```
  See [example usages in Launch Pad](https://sourcegraph.com/search?q=repo:%5Egithub.com/ubclaunchpad/*+lang:html+%3Cscript+src%3D%22https://chinchilla.ubclaunchpad.com/script.js%22&patternType=literal).
- If you need more granular control, you can use [`fathom-client`](https://github.com/derrickreimer/fathom-client) instead of the embedding the tracker script - see [example usages in Launch Pad](https://sourcegraph.com/search?q=repo:%5Egithub.com/ubclaunchpad/*+Fathom.load%28&patternType=literal).
  - for [Vue.js](https://vuejs.org/) projects, you can use [`@ubclanchpad/vue-fathom`](https://github.com/ubclaunchpad/vue-fathom)
  - for [Vuepress](https://vuepress.vuejs.org/) projects, you can use [`@ubclaunchpad/vuepress-plugin-fathom`](https://github.com/ubclaunchpad/vuepress-plugin-fathom)

## Social Media

[Facebook](https://www.facebook.com/ubclaunchpad/insights/), [Medium](https://medium.com/ubc-launch-pad-software-engineering-blog/stats/overview), and [Buttondown (newsletter)](https://buttondown.email/analytics) have built-in analytics. Instagram also has built-in analytics through the Insights tab on the mobile app (not available on web yet).

We also have analytics set up for a few UBC Launch Pad websites, linked above.
