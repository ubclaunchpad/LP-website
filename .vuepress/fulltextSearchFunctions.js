import * as Fathom from 'fathom-client';

// This function extends suggestions provided by the fulltext-search plugin
export async function processSuggestions(suggestions, queryString) {
  if (queryString) {
    // these suggestions help users quickly jump to search on other relevant platforms
    suggestions.push({
      path: 'https://sourcegraph.com/search?patternType=literal&q=repo:^github.com/ubclaunchpad/*+',
      slug: queryString,
      parentPageTitle: 'Other',
      title: 'Content and code',
      contentStr: 'Search our repositories',
      external: true,
    }, {
      path: 'https://github.com/search?q=org%3Aubclaunchpad+type%3Aissue+',
      slug: queryString,
      title: 'Issues and pull requests',
      contentStr: 'Search our GitHub organization',
      external: true,
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
