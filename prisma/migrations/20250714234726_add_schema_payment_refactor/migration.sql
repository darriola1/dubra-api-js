/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `balance` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `balance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `orderId` on the `shipping` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `shippingstatushistory` table. All the data in the column will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mpPaymentId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movementId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amountAfter` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingId` to the `ShippingStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance` DROP FOREIGN KEY `Balance_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `shipping` DROP FOREIGN KEY `Shipping_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `shippingstatushistory` DROP FOREIGN KEY `ShippingStatusHistory_orderId_fkey`;

-- DropIndex
DROP INDEX `Balance_invoiceId_fkey` ON `balance`;

-- DropIndex
DROP INDEX `Shipping_orderId_fkey` ON `shipping`;

-- DropIndex
DROP INDEX `ShippingStatusHistory_orderId_fkey` ON `shippingstatushistory`;

-- AlterTable
ALTER TABLE `balance` DROP COLUMN `invoiceId`,
    ADD COLUMN `amountAfter` DOUBLE NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NULL,
    ADD COLUMN `metodo` VARCHAR(191) NULL,
    ADD COLUMN `mpPaymentId` VARCHAR(191) NULL,
    MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `movementId` INTEGER NULL,
    MODIFY `fileBase64` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `shipping` DROP COLUMN `orderId`,
    ADD COLUMN `invoiceId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `shippingstatushistory` DROP COLUMN `orderId`,
    ADD COLUMN `shippingId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `order`;

-- CreateIndex
CREATE UNIQUE INDEX `Balance_mpPaymentId_key` ON `Balance`(`mpPaymentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_movementId_key` ON `Invoice`(`movementId`);

-- AddForeignKey
ALTER TABLE `Shipping` ADD CONSTRAINT `Shipping_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipping` ADD CONSTRAINT `Shipping_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingStatusHistory` ADD CONSTRAINT `ShippingStatusHistory_shippingId_fkey` FOREIGN KEY (`shippingId`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_movementId_fkey` FOREIGN KEY (`movementId`) REFERENCES `Balance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
