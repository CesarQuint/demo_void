import { getProjectDetails } from "../../Strapi/RestAPI/ProjectsProvider";
import Horizontal from "../../horizontal/page";

export default async function ProjectView({ params }: { params: { slug: string } }) {
  const PROJECT = await getProjectDetails({ slug: params.slug });

  return <Horizontal data={{ project: [PROJECT.data].flat() }} />
};
