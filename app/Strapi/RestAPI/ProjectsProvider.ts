import { StrapiRequest } from "./Request";
import { Category } from "../interfaces/Entities/Category";
import { Project } from "../interfaces/Entities/Project";
import { Response } from "../interfaces/Responses/Response";

const REVALIDATE = process.env.NODE_ENV === 'development' ? 0 : /* 24 hours in seconds */ 24 * 60 * 60;

const fetchDefaultOptions = (): RequestInit => ({
  method: 'GET',
  next: { revalidate: REVALIDATE }
});

const sendFetchCommand = async <T>(req: StrapiRequest): Promise<Response<T>> =>
  fetch(req.url, fetchDefaultOptions()).then((res) => res.json()).catch(console.error);

export async function getProjectsData(): Promise<Response<Project[]>> {
  const req = new StrapiRequest({
    path: '/api/projects',
    parameters: {
      sort: { property: 'EventDate', order: 'desc' },
      fields: ['Title', 'EventDate', 'Subtitle', 'slug'],
      populate: ['Cover', 'Category'],
    }
  });

  return sendFetchCommand<Project[]>(req);
};

export async function getProjectsByCategory({ slug }: { slug: string }): Promise<Response<Project[]>> {
  const req = new StrapiRequest({
    path: '/api/projects',
    parameters: {
      sort: { property: 'EventDate', order: 'desc' },
      fields: ['Title', 'EventDate', 'Subtitle', 'slug'],
      filters: [{ key: ['Category', 'slug'], value: slug, operator: '$eqi' }],
      populate: ['Cover', 'Category'],
    }
  });

  return sendFetchCommand<Project[]>(req);
}

export async function getProjectDetails({ slug }: { slug: string }): Promise<Response<Project[]>> {
  const req = new StrapiRequest({
    path: '/api/projects',
    parameters: {
      filters: [{ key: 'slug', value: slug, operator: '$eqi' }],
      populate: ['Cover', 'Category'],
    }
  });

  return sendFetchCommand<Project[]>(req);
}

export async function getCategoriesData(): Promise<Response<Category[]>> {
  const req = new StrapiRequest({ path: '/api/categories' });
  return sendFetchCommand<Category[]>(req);
};
