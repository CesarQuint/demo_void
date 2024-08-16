type Fields = [string, ...string[]];

type Populate = [string, ...string[]];

type StrapiRequestParameters = {
  url: string;
  parameters: {
    fields?: Fields,
    populate?: Populate,
  },
}

/**
  * Generates a `Request` instance, compliant to the Strapi API.
  *
  */
export class StrapiRequest {
  private attributes: StrapiRequestParameters;
  private queryParameters: string;

  constructor(params: StrapiRequestParameters) {
    this.attributes = params;
    this.queryParameters = this.stringifyQueryParameters(this.attributes.parameters);
  }

  private stringifyQueryParameters(params: StrapiRequestParameters['parameters']): string {
    const query_params: string[][] = [];

    params.fields && query_params.push(this.stringifyFieldsParameters(params.fields));
    params.populate && query_params.push(this.stringifyPopulateParameters(params.populate));

    return '?' + query_params.flat().join('&');
  }

  private stringifyFieldsParameters(fields: Fields): string[] {
    return fields.map((val, idx) => `fields[${idx}]=${val}`);
  }

  private stringifyPopulateParameters(populate: Populate): string[] {
    return populate.map((val, idx) => `populate[${idx}]=${val}`);
  }

  get url() {
    return process.env.STRAPI_BASE_URL + this.attributes.url + this.queryParameters;
  }
}
