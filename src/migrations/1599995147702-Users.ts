import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Users1599995147702 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isUnique: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'string',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'string',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'string',
        }
      ],
    }));

    await queryRunner.createIndex('users', new TableIndex({
      name: 'idx-email',
      columnNames: ['email'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
