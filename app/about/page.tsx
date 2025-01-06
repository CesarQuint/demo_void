import { getCategoriesData } from "../Strapi/RestAPI/ProjectsProvider";
import { notFound } from "next/navigation";
import { AboutView } from "./AboutView";

export default async function Page() {
    const categories = await getCategoriesData();
    if (!categories) return notFound();
    return <AboutView categories={categories.data} />;
}
