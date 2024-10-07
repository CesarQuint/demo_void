import HomeView from "./components/Home/HomePage";
import { getProjectsData } from "./Strapi/RestAPI/ProjectsProvider";

export default async function HomeServer() {
    const PROJECTS = await getProjectsData();

    return <HomeView data={{ projects: PROJECTS.data }} />;
}
