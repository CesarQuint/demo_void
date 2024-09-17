import { getProjectDetails, getProjectsByCategory } from "../../Strapi/RestAPI/ProjectsProvider";
import Horizontal from "../../horizontal/page";

export default async function ProjectView({ params }: { params: { slug: string } }) {
    const PROJECT = await getProjectDetails({ slug: params.slug });
    const RELATED = await getProjectsByCategory({
        slug: PROJECT.data[0].attributes.Category.data.attributes.slug
    }).then((data) => data.data.filter((project) => project.id !== PROJECT.data[0].id));

    return <Horizontal data={{ project: PROJECT.data[0], related: RELATED }} />
};
