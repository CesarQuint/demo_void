import { Meta } from "./Meta"

export type Response<T> = {
  data: T;
  meta: Meta;
}
