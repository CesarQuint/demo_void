import { ProjectsView } from '../components/projects/ProjectsView';
import { getCategoriesData } from "../Strapi/RestAPI/ProjectsProvider";

export default async function ProjectsViewServer() {
  const CATEGORIES = await getCategoriesData();

  return <ProjectsView
    data={{ categories: CATEGORIES.data }}
  />;
};
