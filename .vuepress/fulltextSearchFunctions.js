import * as Fathom from 'fathom-client';

// This function extends suggestions provided by the fulltext-search plugin
export async function processSuggestions(suggestions, queryString) {
  if (queryString) {
    // render suggestions from ./quickLinks.js - variables are appended to the start
    // this file at build time
    let frstQuickLinkSuggestion = true;
    [
      quickLinkRepositories,
      quickLinkDrive,
      quickLinkMisc,
    ].forEach(group => {
      const results = group.items.filter(l => l.text.toLowerCase().startsWith(queryString.toLowerCase()));
      if (results && results.length > 0) {
        results.forEach(r => {
          suggestions.push({
            external: true,
            path: r.link,
            slug: '',
            // show parent for first result only
            parentPageTitle: frstQuickLinkSuggestion ? 'Quick Links' : undefined,
            title: group.text,
            contentStr: r.text,
          });
          frstQuickLinkSuggestion = false;
        });
      }
    });

    // these suggestions help users quickly jump to search on other relevant platforms
    suggestions.push({
      external: true,
      path: 'https://sourcegraph.com/search?q=repo:%5Egithub%5C.com/ubclaunchpad/.*+fork:no+',
      slug: queryString,
      // show parent for first result only
      parentPageTitle: 'Other',
      title: 'Content and code',
      contentStr: 'Search the content of our repositories',
    }, {
      external: true,
      path: 'https://github.com/search?type=Issues&q=org%3Aubclaunchpad+',
      slug: queryString,
      title: 'Issues and pull requests',
      contentStr: 'Search our GitHub discussions',
    }, {
      external: true,
      path: 'https://github.com/search?type=Repositories&q=org%3Aubclaunchpad+',
      slug: queryString,
      title: 'Repositories',
      contentStr: 'Find Launch Pad repositories',
    });
  }
  return suggestions;
}

// view these in fathom - https://app.usefathom.com/share/oemmhhle/docs.ubclaunchpad.com
const GOAL_SITESEARCH = 'SJ8NSKV1';
const GOAL_EXTENDEDSEARCH = 'VMCQLNMK';

export async function onGoToSuggestion(i, suggestion) {
  if (suggestion.external === true) {
    Fathom.trackGoal(GOAL_EXTENDEDSEARCH, 0);
  } else {
    Fathom.trackGoal(GOAL_SITESEARCH, 0);
  }
}
