import fs from 'fs';
import path from 'path';

async function getProjects() {
  
  const projectsFilePath = path.join(process.cwd(),'src', 'lib', 'data', 'projects.json');
  const notionDatabaseId = process.env.NOTION_DB_ID;
  const notionApiKey = process.env.NOTION_DB_SECRET;
  const projectsData = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
  if (projectsData.length > 0) {
    return projectsData;
  }

  // Fetch data from notion if not cached
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
  };

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
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const formattedData = data.results.map((item: any) => ({
    title: item.properties.Name.title[0].text.content,
    description: item.properties.Oneliner.rollup.array[0].rich_text[0].text.content,
    imageSrc: item.properties["Files & media"]?.files?.[0]?.file?.url ?? "/images/launchpadTeam.png",
    alt: "Mock",
    width: 372,
    height: 213,
  }));

  fs.writeFileSync(projectsFilePath, JSON.stringify(formattedData, null, 2), 'utf8');

  return formattedData;
}

export default getProjects