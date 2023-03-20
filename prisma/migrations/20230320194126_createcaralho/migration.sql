/*
  Warnings:

  - You are about to alter the column `retail_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `wholesale_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "retail_price" SET DATA TYPE INTEGER,
ALTER COLUMN "wholesale_price" SET DATA TYPE INTEGER;
