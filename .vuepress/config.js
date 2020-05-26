const vuepressUtils = require('@vuepress/shared-utils');
const emojiRegex = require('emoji-regex')();

// custom slugify function to extend the default one by stripping out leading emoji
const slugify = (s) => {
  return vuepressUtils.slugify(s)
    .replace(emojiRegex, '')
    .replace(/^(\-)/, '');
}

module.exports = {
  // header properties
  title: 'UBC Launch Pad Documentation',
  description: '📚 The official UBC Launch Pad knowledge base',
  head: [
    ['meta', { property: 'og:image', content: 'https://ubclaunchpad.com/share.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  // https://vuepress-theme-yuu.netlify.app/ for dark theme
  // TODO: we should switch if this ever gets merged: https://github.com/vuejs/vuepress/pull/2301
  theme: 'yuu',

  themeConfig: {
    // navbar properties
    logo: 'https://raw.githubusercontent.com/ubclaunchpad/ubclaunchpad.com/master/src/assets/rocket.png',
    nav: [
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Resources', link: '/resources/' },
      {
        text: 'Quick Links',
        items: [
          { text: 'About Us', link: 'https://ubclaunchpad.com' },
          {
            text: 'GitHub Repositories',
            items: [
              { text: 'Docs', link: 'https://github.com/ubclaunchpad/docs' },
              { text: 'Ideas', link: 'https://github.com/ubclaunchpad/ideas/issues' },
              { text: 'Design', link: 'https://github.com/ubclaunchpad/design' },
              { text: 'Strategy', link: 'https://github.com/ubclaunchpad/strategy' },
              { text: 'Leads', link: 'https://github.com/ubclaunchpad/leads' },
              { text: 'Exec', link: 'https://github.com/ubclaunchpad/exec' },
            ]
          },
          {
            text: 'Google Drive',
            items: [
              { text: 'Projects', link: 'https://drive.google.com/drive/u/0/folders/18piFDBdAUuZAOf9xOgpf2_HBUuVNae0S' },
              { text: 'Design', link: 'https://drive.google.com/drive/u/0/folders/1Zfe25r3D77hGdyMkj0tlxHNa-r7fAq1d' },
              { text: 'Strategy', link: 'https://drive.google.com/drive/u/0/folders/0BwdNv1PZjDeXMkc1eDVNY1ZHT00' },
              { text: 'Leads', link: 'https://drive.google.com/drive/u/0/folders/1hgPcUC_DrFMmzZ04pBSlZFig4v9AbTuv' },
              { text: 'Exec', link: 'https://drive.google.com/drive/u/0/folders/10b_2H5EhPpJtdgNi7QizRhWC9Qtivr8L' },
            ]
          },
          {
            text: 'Miscellaneous',
            items: [
              { text: 'GitHub', link: 'https://ubclaunchpad.com/github' },
              { text: 'Slack', link: 'https://ubclaunchpad.com/slack' },
              { text: 'Facebook', link: 'https://ubclaunchpad.com/facebook' },
              { text: 'Medium', link: 'https://ubclaunchpad.com/medium' },
            ]
          }
        ]
      },
    ],
    searchPlaceholder: 'Search...',

    // automatically generate a sidebar for each page
    sidebar: 'auto',
    sidebarDepth: 2,
    smoothScroll: true,

    // contribution CTA for each page
    docsRepo: 'ubclaunchpad/docs',
    lastUpdated: true,
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    
    // see theme
    yuu: {
      colorThemes: [],
      disableThemeIgnore: true,
    },
  },

  // markdown features
  markdown: {
    slugify,
    anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#', slugify }
  },

  plugins: [
    // fulltext search for site content - https://github.com/leo-buneev/vuepress-plugin-fulltext-search
    'fulltext-search',

    // remove trailing .html for example - https://vuepress.github.io/en/plugins/clean-urls
    'vuepress-plugin-clean-urls',

    // link to scroll back to top - https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html
    '@vuepress/back-to-top',

    // analytics are under team@ubclaunchpad.com, property docs.ubclaunchpad.com
    ['@vuepress/google-analytics', {
      'ga': 'UA-63529563-2',
    }],

    // analytics are under team@ubclaunchpad.com, property docs.ubclaunchpad.com
    // dashboard: https://app.usefathom.com/share/oemmhhle/docs.ubclaunchpad.com
    ['@ubclaunchpad/fathom', {
      'siteID': 'OEMMHHLE',
    }],
  ],
}
