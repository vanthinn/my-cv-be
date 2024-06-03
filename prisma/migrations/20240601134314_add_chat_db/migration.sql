-- CreateTable
CREATE TABLE "conversation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "display_name" VARCHAR(50),
    "avatar_url" TEXT,
    "last_message_id" UUID,

    CONSTRAINT "pk_conversation" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_conversation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "conversation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "display_name" VARCHAR(50),
    "last_read_message_id" UUID,

    CONSTRAINT "pk_user_to_conversation" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "conversation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'TEXT',

    CONSTRAINT "pk_message" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_last_message_id_key" ON "conversation"("last_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_to_conversation_conversation_id_user_id_key" ON "user_to_conversation"("conversation_id", "user_id");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_conversation" ADD CONSTRAINT "user_to_conversation_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_conversation" ADD CONSTRAINT "user_to_conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_conversation" ADD CONSTRAINT "user_to_conversation_last_read_message_id_fkey" FOREIGN KEY ("last_read_message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_to_conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
