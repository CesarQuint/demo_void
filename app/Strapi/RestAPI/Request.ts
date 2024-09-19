type Sort = { property: string, order: 'asc' | 'desc' };
type Fields = [string, ...string[]];
type Filters = [Filter, ...Filter[]];
type Populate = [string, ...string[]];
type Filter = { key: string | string[], value: string, operator: FilterOperator };
type FilterOperator = '$eqi';

type StrapiRequestParameters = {
    path: string;
    parameters?: {
        sort?: Sort,
        fields?: Fields,
        filters?: Filters,
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

    private stringifyQueryParameters(params: StrapiRequestParameters['parameters'] = {}): string {
        const query_params: string[][] = [];

        params.sort && query_params.push(this.stringifySortParameters(params.sort));
        params.fields && query_params.push(this.stringifyFieldsParameters(params.fields));
        params.filters && query_params.push(this.stringifyFiltersParameters(params.filters));
        params.populate && query_params.push(this.stringifyPopulateParameters(params.populate));

        return '?' + query_params.flat().join('&');
    }

    private stringifySortParameters(sort: Sort): [string] {
        return [`sort=${sort.property}:${sort.order}`];
    }

    private stringifyFieldsParameters(fields: Fields): string[] {
        return fields.map((val, idx) => `fields[${idx}]=${val}`);
    }

    private stringifyFiltersParameters(filters: Filters): string[] {
        const stringify_key_params = (keys: Filter['key']) => Array.isArray(keys) ? stringify_array(keys) : `[${keys}]`;
        const stringify_array = (keys: string[]) => keys.map((key) => `[${key}]`).join('');

        return filters.map((filter) => `filters${stringify_key_params(filter.key)}[${filter.operator}]=${filter.value}`);
    }

    private stringifyPopulateParameters(populate: Populate): string[] {
        return populate.map((val, idx) => `populate[${idx}]=${val}`);
    }

    get url() {
        return process.env.NEXT_PUBLIC_STRAPI_BASE_URL + this.attributes.path + this.queryParameters;
    }
}
