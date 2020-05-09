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
      { text: 'About', link: 'https://ubclaunchpad.com', target:'_blank' },
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

  plugins: [
    // fulltext search for site content - https://github.com/leo-buneev/vuepress-plugin-fulltext-search
    'fulltext-search',

    // remove trailing .html for example - https://vuepress.github.io/en/plugins/clean-urls
    ['vuepress-plugin-clean-urls', {
      normalSuffix: '',
    }],

    // link to scroll back to top - https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html
    '@vuepress/back-to-top',

    // analytics are under team@ubclaunchpad.com, property docs.ubclaunchpad.com
    ['@vuepress/google-analytics', {
      'ga': 'UA-63529563-2',
    }],
  ],
}
