import { notFound } from "next/navigation";
import { getProjectDetails, getProjectsByCategory } from "../../Strapi/RestAPI/ProjectsProvider";
import ProjectCaseStudy from "../../components/projects/ProjectCaseStudy";

export default async function Page({ params }: { params: { slug: string } }) {
    const PROJECT = await getProjectDetails({ slug: params.slug });

    if (!PROJECT || !PROJECT.data.length) return notFound();

    const RELATED = await getProjectsByCategory({
        slug: PROJECT.data[0].attributes.Category.data.attributes.slug
    }).then(({ data }) => data.filter((project) => project.id !== PROJECT.data[0].id));

    return <ProjectCaseStudy data={{ project: PROJECT.data[0], related: RELATED }} />
};
