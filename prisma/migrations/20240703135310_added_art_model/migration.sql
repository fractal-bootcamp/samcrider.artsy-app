/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArtType" AS ENUM ('GeoTree', 'GravityShapes');

-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "art" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "artType" "ArtType" NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "art_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "art" ADD CONSTRAINT "art_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
