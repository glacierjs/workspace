import type { HttpResponse } from '@glacier/http';

import type { HttpClientConfig } from './interfaces/HttpClientConfig';
import type { HttpRequestOptions } from './interfaces/HttpRequestOptions';

export class HttpClient {
  public constructor(private readonly config: HttpClientConfig) {}

  public async request(options: HttpRequestOptions): Promise<HttpResponse> {}
  public async requestJson<T>(options: HttpRequestOptions): Promise<HttpResponse<T>> {}
  public async requestText(options: HttpRequestOptions): Promise<HttpResponse<string>> {}
}

const elasticClient = new HttpClient({
  baseUrl: new URL('https://elastic.com')
});

const x = await elasticClient.requestJson<{ username: string }>({});
