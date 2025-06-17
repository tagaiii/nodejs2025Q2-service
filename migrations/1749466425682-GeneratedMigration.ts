import { MigrationInterface, QueryRunner } from 'typeorm';

export class GeneratedMigration1749466425682 implements MigrationInterface {
  name = 'GeneratedMigration1749466425682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "login" character varying(50) NOT NULL, "password" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
