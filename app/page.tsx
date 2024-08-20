import HomeView from './components/Home/HomePage';
import { getProjectsData } from './Strapi/RestAPI/ProjectsProvider';

export default async function HomeServer() {
  const PROJECTS = await getProjectsData();

  return <HomeView
    data={{
      strapiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
      projects: PROJECTS.data,
    }}
  />;
}
