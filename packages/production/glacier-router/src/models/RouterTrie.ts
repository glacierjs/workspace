import type { Optional } from '@glacier/utils';

import { RouterTrieNode } from './RouterTrieNode';
import type { RouterTrieResult } from '../interfaces/RouterTrieResult';

export class RouterTrie<T> {
  private root = new RouterTrieNode<T>('');

  public insert(path: string, value: T): this {
    let node = this.root;
    for (const part of this.splitPath(path)) {
      if (part.startsWith(':')) {
        node = node.append('*', part.slice(1));
      } else {
        node = node.append(part, part);
      }
    }
    node.values = node.values ?? [];
    node.values.push(value);
    return this;
  }

  public find(path: string): Optional<RouterTrieResult<T>> {
    let node = this.root;
    const variables: Record<string, string> = {};

    for (const part of this.splitPath(path)) {
      if (node.has(part)) {
        node = node.children[part];
        continue;
      }

      if (node.has('*')) {
        node = node.children['*'];
        variables[node.name] = part;
        continue;
      }

      return;
    }

    if (node.values === undefined) {
      return;
    }

    return {
      values: node.values,
      variables
    };
  }

  private splitPath(path: string): string[] {
    return path.slice(1).split('/');
  }
}
