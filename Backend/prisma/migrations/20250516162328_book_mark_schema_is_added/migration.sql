-- CreateTable
CREATE TABLE "BookMark" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemInBookMark" (
    "id" TEXT NOT NULL,
    "BookMarkId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemInBookMark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookMark_name_userId_key" ON "BookMark"("name", "userId");

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInBookMark" ADD CONSTRAINT "ProblemInBookMark_BookMarkId_fkey" FOREIGN KEY ("BookMarkId") REFERENCES "BookMark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInBookMark" ADD CONSTRAINT "ProblemInBookMark_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
