import { notFound } from "next/navigation";
import { ProjectsView } from "../../components/projects/ProjectsView";
import {
    getProjectsData,
    getCategoriesData,
    getProjectsByCategory,
} from "../../Strapi/RestAPI/ProjectsProvider";
import { Response } from "@/app/Strapi/interfaces/Responses/Response";
import { Project } from "@/app/Strapi/interfaces/Entities/Project";

const getProjects = (slug: string): Promise<Response<Project[]>> =>
    slug === "todo" ? getProjectsData() : getProjectsByCategory({ slug });

export default async function Page({ params }: { params: { slug: string } }) {
    const categories = await getCategoriesData();
    if (!categories) return notFound();

    const projects = await getProjects(params.slug);
    if (!projects) return notFound();

    return (
        <ProjectsView
            data={{
                currentCategory: params.slug,
                categories: categories.data,
                projects: projects.data,
            }}
        />
    );
}
