const quickLinkRepositories = {
  text: 'GitHub Repositories',
  items: [
    { text: 'Docs', link: 'https://github.com/ubclaunchpad/docs' },
    { text: 'Ideas', link: 'https://github.com/ubclaunchpad/ideas/issues' },
    { text: 'Design', link: 'https://github.com/ubclaunchpad/design' },
    { text: 'Strategy', link: 'https://github.com/ubclaunchpad/strategy' },
    { text: 'Leads', link: 'https://github.com/ubclaunchpad/leads' },
    { text: 'Exec', link: 'https://github.com/ubclaunchpad/exec' },
  ],
};

const quickLinkDrive = {
  text: 'Drive Folders',
  items: [
    { text: 'Projects', link: 'https://drive.google.com/drive/u/0/folders/18piFDBdAUuZAOf9xOgpf2_HBUuVNae0S' },
    { text: 'Design', link: 'https://drive.google.com/drive/u/0/folders/1Zfe25r3D77hGdyMkj0tlxHNa-r7fAq1d' },
    { text: 'Strategy', link: 'https://drive.google.com/drive/u/0/folders/0BwdNv1PZjDeXMkc1eDVNY1ZHT00' },
    { text: 'Leads', link: 'https://drive.google.com/drive/u/0/folders/1hgPcUC_DrFMmzZ04pBSlZFig4v9AbTuv' },
    { text: 'Exec', link: 'https://drive.google.com/drive/u/0/folders/10b_2H5EhPpJtdgNi7QizRhWC9Qtivr8L' },
  ],
};

const quickLinkMisc = {
  text: 'Miscellaneous',
  items: [
    { text: 'GitHub', link: 'https://ubclaunchpad.com/github' },
    { text: 'Slack', link: 'https://ubclaunchpad.com/slack' },
    { text: 'Facebook', link: 'https://ubclaunchpad.com/facebook' },
    { text: 'Medium', link: 'https://ubclaunchpad.com/medium' },
  ],  
};

if (typeof module === 'object' && module.exports) {
  module.exports = {
    quickLinkRepositories,
    quickLinkDrive,
    quickLinkMisc,
  }
}
