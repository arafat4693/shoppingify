import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { protectedProcedure, router } from "../trpc"

const itemRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        note: z.string().optional(),
        image: z.string(),
        categoryName: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      try {
        const { name, note, image, categoryName } = input
        const createdItem = await prisma.item.create({
          data: {
            name,
            note,
            image,
            User: {
              connect: {
                id: session.user.id,
              },
            },
            category: {
              connectOrCreate: {
                where: {
                  name: categoryName,
                },
                create: {
                  name: categoryName,
                  User: {
                    connect: {
                      id: session?.user?.id,
                    },
                  },
                },
              },
            },
          },
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })

        return createdItem
      } catch (err) {
        console.log(err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: err,
        })
      }
    }),

  all: protectedProcedure.query(({ ctx: { prisma, session } }) => {
    try {
      const allItems = prisma.category.findMany({
        where: {
          User: {
            id: session.user.id,
          },
        },
        include: {
          items: true,
        },
      })
      return allItems
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: err,
      })
    }
  }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma, session }, input: itemId }) => {
      try {
        const deleteItem = await prisma.item.delete({
          where: { id: itemId },
        })
        return deleteItem
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: err,
        })
      }
    }),
  updateQuantity: protectedProcedure
    .input(z.object({ itemID: z.string(), qty: z.number() }))
    .mutation(async ({ input: { itemID, qty }, ctx: { prisma } }) => {
      try {
        const updateQuantity = await prisma.item.update({
          where: {
            id: itemID,
          },
          data: {
            quantity: qty,
          },
        })
        return { itemID: updateQuantity.id, qty: updateQuantity.quantity }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: err,
        })
      }
    }),
  updateDone: protectedProcedure
    .input(
      z.object({ trueIDs: z.string().array(), falseIDs: z.string().array() })
    )
    .mutation(async ({ input: { trueIDs, falseIDs }, ctx: { prisma } }) => {
      function updateIsDoneStatus(ids: string[], status: boolean) {
        return prisma.item.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            isDone: status,
          },
        })
      }
      try {
        await Promise.all([
          updateIsDoneStatus(trueIDs, true),
          updateIsDoneStatus(falseIDs, false),
        ])
        return { trueIDs, falseIDs }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: err,
        })
      }
    }),
})

export default itemRouter
