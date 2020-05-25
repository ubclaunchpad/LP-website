import fsvc from 'vuepress-plugin-fulltext-search/services/flexsearchSvc';

const matchOverride = async function(queryString, queryTerms, limit = 7) {
  const results = await fsvc.match(queryString, queryTerms, limit);
  if (queryString) {
    results.push({
      path: 'https://sourcegraph.com/search?patternType=literal&q=repo:ubclaunchpad/*+',
      slug: queryString,
      parentPageTitle: 'Sourcegraph',
      title: 'Search all',
      contentStr: `Search for '${queryString}' in Launch Pad's repositories`,
      external: true,
    });
  }
  return results;
}

export default {
  ...fsvc,
  match: matchOverride,
};
