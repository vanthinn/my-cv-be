-- CreateTable
CREATE TABLE "job_bookmark" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "jobId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "pk_job_bookmarks" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_bookmark" ADD CONSTRAINT "fk_job_to_job_bookmarks" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_bookmark" ADD CONSTRAINT "fk_user_to_job_bookmarks" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
