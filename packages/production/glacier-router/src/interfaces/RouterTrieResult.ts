export interface RouterTrieResult<T> {
  values: T[];
  variables: Record<string, string>;
}
