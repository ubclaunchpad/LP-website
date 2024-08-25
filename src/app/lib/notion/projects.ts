import fs from "fs";
import path from "path";

async function getProjects() {
  const projectsFilePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "data",
    "projects.json",
  );
  const notionDatabaseId = process.env.NOTION_DB_ID;
  const notionApiKey = process.env.NOTION_DB_SECRET;
  const projectsData = JSON.parse(fs.readFileSync(projectsFilePath, "utf8"));

  const cacheValidFor = 30 * 24 * 60 * 60 * 1000; // 1 month
  const now = Date.now();

  if (projectsData.timestamp && now - projectsData.timestamp < cacheValidFor) {
    return projectsData.projects;
  }

  // Fetch starred projects from Notion
  const filter = {
    filter: {
      property: "Starred",
      checkbox: {
        equals: true,
      },
    },
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(filter),
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch data");
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const formattedData = data.results.map((item: any) => ({
    title: item.properties.Name.title[0].text.content,
    description:
      item.properties.Oneliner.rich_text?.[0]?.text?.content ??
      `This was one of Launch Pad's previous projects. This description is just to fill space for testing`,
    imageSrc:
      item.properties["Files & media"]?.files?.[0]?.file?.url ??
      "/images/launchpadTeam.png",
    alt: "Mock",
    width: 372,
    height: 213,
    url: item.public_url,
  }));

  const cacheData = {
    timestamp: now,
    projects: formattedData,
  };

  fs.writeFileSync(
    projectsFilePath,
    JSON.stringify(cacheData, null, 2),
    "utf8",
  );
  return formattedData;
}

export default getProjects;
