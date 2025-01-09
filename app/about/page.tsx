import {
    getCategoriesData,
    getProjectsData,
} from "../Strapi/RestAPI/ProjectsProvider";
import { notFound } from "next/navigation";
import { AboutView } from "./AboutView";

export default async function Page() {
    const categories = await getCategoriesData();
    const projects = await getProjectsData();
    if (!categories || !projects) return notFound();
    return <AboutView categories={categories.data} projects={projects.data} />;
}
