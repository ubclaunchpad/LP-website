module.exports = {
  title: 'UBC Launch Pad Documentation',
  description: '📚 The official UBC Launch Pad knowledge base',
  themeConfig: {
    logo: 'https://raw.githubusercontent.com/ubclaunchpad/ubclaunchpad.com/master/src/assets/rocket.png',
    nav: [
      { text: 'GitHub', link: 'https://github.com/ubclaunchpad', target:'_blank' },
      { text: 'UBC Launch Pad', link: 'https://ubclaunchpad.com', target:'_blank' },
    ],
    sidebar: 'auto',
    lastUpdated: true,
    smoothScroll: true,
    docsRepo: 'ubclaunchpad/docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!'
  },
}
