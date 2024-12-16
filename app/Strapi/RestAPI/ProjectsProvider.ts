import { StrapiRequest } from "./Request";
import { Category } from "../interfaces/Entities/Category";
import { Project } from "../interfaces/Entities/Project";
import { Response } from "../interfaces/Responses/Response";

const REVALIDATE =
    process.env.CACHE_STRAPI_REQS !== "true"
        ? 0
        : /* 24 hours in seconds */ 24 * 60 * 60;

const fetchDefaultOptions = (): RequestInit => ({
    method: "GET",
    next: { revalidate: REVALIDATE },
});

const sendFetchCommand = async <T>(req: StrapiRequest): Promise<Response<T>> =>
    fetch(req.url, fetchDefaultOptions())
        .then((res) => res.json())
        .catch(console.error);

export async function getProjectsData(): Promise<Response<Project[]>> {
    const req = new StrapiRequest({
        path: "/api/projects",
        parameters: {
            sort: { property: "EventDate", order: "desc" },
            fields: [
                "Title",
                "EventDate",
                "Subtitle",
                "slug",
                "AsFullCaseStudy",
            ],
            populate: ["Cover", "Category"],
        },
    });

    return sendFetchCommand<Project[]>(req);
}

export async function getProjectsByCategory({
    slug,
}: {
    slug: string;
}): Promise<Response<Project[]>> {
    const req = new StrapiRequest({
        path: "/api/projects",
        parameters: {
            sort: { property: "EventDate", order: "desc" },
            fields: [
                "Title",
                "EventDate",
                "Subtitle",
                "slug",
                "AsFullCaseStudy",
            ],
            filters: [
                { key: ["Category", "slug"], value: slug, operator: "$eqi" },
            ],
            populate: ["Cover", "Category"],
        },
    });

    return sendFetchCommand<Project[]>(req);
}

export async function getProjectDetails({
    slug,
}: {
    slug: string;
}): Promise<Response<Project[]>> {
    const req = new StrapiRequest({
        path: "/api/projects",
        parameters: {
            filters: [{ key: "slug", value: slug, operator: "$eqi" }],
            populate: ["Cover", "Category", "Case_Study_Video"],
        },
    });

    return sendFetchCommand<Project[]>(req);
}

export async function getCategoriesData(): Promise<Response<Category[]>> {
    const req = new StrapiRequest({ path: "/api/categories" });
    return sendFetchCommand<Category[]>(req);
}
