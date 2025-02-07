import { Path, PathIndex } from '../common/types/utils';
import { Config } from './types';

export class ConfigService {
  constructor(private config: Config) {}

  get<P extends Path<Config>>(path: P): PathIndex<Config, P> {
    const parts = path.split('.');
    let current: any = this.config;
    while (parts.length) {
      const part = parts.shift()!;
      current = current[part];
    }
    return current;
  }
}
