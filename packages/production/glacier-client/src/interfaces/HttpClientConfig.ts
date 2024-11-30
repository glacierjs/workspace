import type { OutgoingHttpHeaders, Agent } from 'node:http';

export interface HttpClientConfig {
  baseUrl: URL;
  agent?: Agent;
  headers?: OutgoingHttpHeaders;
  timeout?: number;
  responseEncoding?: string;
}
