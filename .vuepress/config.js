module.exports = {
  title: 'UBC Launch Pad Documentation',
  description: '📚 The official UBC Launch Pad knowledge base',

  // https://vuepress-theme-yuu.netlify.app/ for dark theme
  // TODO: we should switch if this ever gets merged: https://github.com/vuejs/vuepress/pull/2301
  theme: 'yuu',

  themeConfig: {
    // navbar properties
    logo: 'https://raw.githubusercontent.com/ubclaunchpad/ubclaunchpad.com/master/src/assets/rocket.png',
    nav: [
      { text: 'GitHub', link: 'https://github.com/ubclaunchpad', target:'_blank' },
      { text: 'UBC Launch Pad', link: 'https://ubclaunchpad.com', target:'_blank' },
    ],
    searchPlaceholder: 'Search...',

    // automatically generate a sidebar for each page
    sidebar: 'auto',
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

    // analytics are under team@ubclaunchpad.com, property docs.ubclaunchpad.com
    ['@vuepress/google-analytics', {
      'ga': 'UA-63529563-2',
    }],
  ],
}
