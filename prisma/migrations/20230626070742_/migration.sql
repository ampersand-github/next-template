/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Counter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Counter` DROP FOREIGN KEY `Counter_user_id_fkey`;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `Counter`;

-- CreateTable
CREATE TABLE `counters` (
    `user_id` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `user_id` VARCHAR(191) NOT NULL,
    `post_code` VARCHAR(191) NOT NULL,
    `prefecture` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `town` VARCHAR(191) NOT NULL,
    `block` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `address_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `counters` ADD CONSTRAINT `counters_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
