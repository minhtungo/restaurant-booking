import { s3 } from "@/lib/s3";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getMenuItems: publicProcedure.query(async ({ ctx }) => {
    const menuItems = await ctx.prisma.menuItem.findMany();

    const withUrls = await Promise.all(
      menuItems.map(async (item) => ({
        ...item,
        url: await s3.getSignedUrlPromise("getObject", {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: item.imageKey,
        }),
      }))
    );

    return withUrls;
  }),
  checkMenuStatus: publicProcedure.query(async () => {
    return { success: true };
  }),
});
