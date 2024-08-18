import HomePage from '../components/Home/HomePage';
import { Project } from '../Strapi/interfaces/Entities/Project';
import { Response } from '../Strapi/interfaces/Responses/Response';
import { StrapiRequest } from '../Strapi/RestAPI/Request';

async function fetchProjectsData(): Promise<Response<Project[]>> {
  const req = new StrapiRequest({
    url: '/api/projects',
    parameters: {
      fields: ['Title', 'EventDate', 'Subtitle'],
      populate: ['Cover', 'Category']
    }
  });

  return fetch(req.url, { method: 'GET', cache: 'no-store' }).then((res) => res.json()).catch(console.error);
};

export default async function HomeServer() {
  const PROJECTS = await fetchProjectsData();

  return (
    <HomePage
      data={{
        strapiBaseUrl: process.env.STRAPI_BASE_URL,
        projects: PROJECTS.data,
      }}
    />
  );
};
