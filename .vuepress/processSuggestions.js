// This function extends suggestions provided by the fulltext-search plugin
export default async function(suggestions, queryString, queryTerms) {
  if (queryString) {
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
