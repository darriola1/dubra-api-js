/*
  Warnings:

  - You are about to drop the column `carrier` on the `shipping` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `shipping` table. All the data in the column will be lost.
  - You are about to drop the column `sequence` on the `shipping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `shipping` DROP FOREIGN KEY `Shipping_invoiceId_fkey`;

-- DropIndex
DROP INDEX `Shipping_invoiceId_fkey` ON `shipping`;

-- AlterTable
ALTER TABLE `shipping` DROP COLUMN `carrier`,
    DROP COLUMN `invoiceId`,
    DROP COLUMN `sequence`;
