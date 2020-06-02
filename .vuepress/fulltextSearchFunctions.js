import * as Fathom from 'fathom-client';

const EXTENDED_SUGGESTIONS_TITLE = 'Other';

// This function extends suggestions provided by the fulltext-search plugin
export async function processSuggestions(suggestions, queryString, queryTerms) {
  if (queryString) {
    suggestions.push({
      path: 'https://sourcegraph.com/search?patternType=literal&q=repo:^github.com/ubclaunchpad/*+',
      slug: queryString,
      parentPageTitle: EXTENDED_SUGGESTIONS_TITLE,
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
const GOAL_OTHERSEARCH = 'VMCQLNMK';

export async function onGoToSuggestion(i, suggestion) {
  console.log(suggestion);
  if (suggestion.parentPageTitle === EXTENDED_SUGGESTIONS_TITLE) {
    Fathom.trackGoal(GOAL_OTHERSEARCH, 0);
  } else {
    Fathom.trackGoal(GOAL_SITESEARCH, 0);
  }
}
