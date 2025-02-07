import { parse } from 'node:path';

import { FsMigrations } from 'knex/lib/migrations/migrate/sources/fs-migrations.js';

export class KnexMigrationSource extends FsMigrations {
  fsSource: FsMigrations;

  constructor(
    private extension: string,
    migrationDirectories: string | string[],
    sortDirsSeparately: boolean = false,
    loadExtensions: string[] | undefined = undefined,
  ) {
    super(migrationDirectories, sortDirsSeparately, loadExtensions);
    this.fsSource = new FsMigrations(migrationDirectories, sortDirsSeparately, loadExtensions);
  }

  async getMigrations() {
    return this.fsSource.getMigrations([this.extension]);
  }

  getMigration(migration: any) {
    return this.fsSource.getMigration(migration);
  }

  getMigrationName(migration: any) {
    return parse(migration.file as string).name;
  }
}
