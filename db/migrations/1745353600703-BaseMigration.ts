import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1745353600703 implements MigrationInterface {
    name = 'BaseMigration1745353600703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "round" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "holeScores" integer array NOT NULL DEFAULT '{}', "total" integer NOT NULL DEFAULT '0', "adjustedTotal" integer NOT NULL DEFAULT '0', "isHome" boolean NOT NULL, "isNine" boolean NOT NULL DEFAULT false, "isComplete" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "courseId" integer, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "length" "public"."course_length_enum" NOT NULL, "difficulty" "public"."course_difficulty_enum" NOT NULL, "lng" double precision NOT NULL, "lat" double precision NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "handicap" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-favorited-courses" ("userId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_da4a07c91f058c33e45ed06df0b" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_184f65893743ee475537f3ddea" ON "user-favorited-courses" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_152e77f1cf211ddc2843b45584" ON "user-favorited-courses" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_ec27aa2ac080b5ed3ec7c8c3c8a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "round" ADD CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-favorited-courses" ADD CONSTRAINT "FK_184f65893743ee475537f3ddea2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user-favorited-courses" ADD CONSTRAINT "FK_152e77f1cf211ddc2843b45584a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-favorited-courses" DROP CONSTRAINT "FK_152e77f1cf211ddc2843b45584a"`);
        await queryRunner.query(`ALTER TABLE "user-favorited-courses" DROP CONSTRAINT "FK_184f65893743ee475537f3ddea2"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_8e2c07ec655ad4ebeeec9dc53b4"`);
        await queryRunner.query(`ALTER TABLE "round" DROP CONSTRAINT "FK_ec27aa2ac080b5ed3ec7c8c3c8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_152e77f1cf211ddc2843b45584"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_184f65893743ee475537f3ddea"`);
        await queryRunner.query(`DROP TABLE "user-favorited-courses"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "round"`);
    }

}
