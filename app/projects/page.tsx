import { ProjectsView } from '../components/projects/ProjectsView';
import { getCategoriesData } from "../Strapi/RestAPI/ProjectsProvider";

export default async function Page() {
  const CATEGORIES = await getCategoriesData();

  if (!CATEGORIES) return { notFound: true };

  return <ProjectsView data={{ categories: CATEGORIES.data }} />;
};
