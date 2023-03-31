import { s3 } from "@/lib/s3";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

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
  getCartItems: publicProcedure
    .input(z.array(z.object({ id: z.string(), quantity: z.number() })))
    .query(async ({ ctx, input }) => {
      const menuItems = await ctx.prisma.menuItem.findMany({
        where: {
          id: {
            in: input.map((item) => item.id),
          },
        },
      });

      // Each menu items only contains its AWS key. Extend all items with their actual img url
      const withUrls = await Promise.all(
        menuItems.map(async (menuItem) => {
          return {
            ...menuItem,
            url: await s3.getSignedUrlPromise("getObject", {
              Bucket: "restaurant-booking",
              Key: menuItem.imageKey,
            }),
            quantity: input.find((item) => item.id === menuItem.id)?.quantity,
          };
        })
      );

      return withUrls;
    }),
});
