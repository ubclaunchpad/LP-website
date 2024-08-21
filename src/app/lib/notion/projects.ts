const cache = new Map();
const cacheTTL = 0 //24 * 60 * 60 * 1000;

async function getProjects() {
  const cacheKey = 'notion_projects';
  const now = Date.now();
  const notionDatabaseId = process.env.NOTION_DB_ID
  const notionApiKey = process.env.NOTION_DB_SECRET
  
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (now - timestamp < cacheTTL) {
      return data;
    }
  }

  const filter = {
    "filter": {
      "or": [
      {
        "property": "Year",
        "multi_select": {
          "contains": "2023"
        }
      },
      {
        "property": "Year",
        "multi_select": {
          "contains": "2022"
        }
      }
    ]
    }
  }

  const res = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify(filter)
  });

  if (!res.ok) {
    console.error;
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  cache.set(cacheKey, { data, timestamp: now });

  return data.results.map((item: any) => ({
    title: item.properties.Name.title[0].text.content,
    description: item.properties.Oneliner.rollup.array[0].rich_text[0].text.content,
    imageSrc: item.properties["Files & media"]?.files?.[0]?.file?.url ?? "/images/launchpadTeam.png",
    alt: "Mock", 
    width: 372,
    height: 213,

  }))
}

export default getProjects