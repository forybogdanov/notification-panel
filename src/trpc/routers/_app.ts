import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { INotification, NotificationType } from '@/types/notification';
import { getVoiceNotifications } from '../voice';
import { prisma } from '../../../prisma/prisma';

export const appRouter = createTRPCRouter({
  createNotification: baseProcedure
    .input(
      z.object({
        type: z.nativeEnum(NotificationType),
        releaseNumber: z.number().optional(),
        update: z.string().optional(),
        personName: z.string().optional(),
      })
      .refine(data => {
        if (data.type === NotificationType.PLATFORM_UPDATE) {
            return data.releaseNumber !== undefined && data.update !== undefined;
        } else {
            return data.personName !== undefined;
        }
    }, {
        message: "Either releaseNumber and update should not be empty for PLATFORM_UPDATE, or personName for other types"
    }),
    )
    .mutation(async (opts) => {
      try {
        // const transformedData = notificationSchema.parse(opts);
          await prisma.notification.create({
              data: opts.input
          });
          return { message: "Notification created" };
      } catch (error) {
          console.error(error);
          return { error: `Failed to create notification: ${error}` };
      }
    }),
    getNotifications: baseProcedure
    .query(async () => {
      const notifications = await prisma.notification.findMany({where: {read: false}});
      const mappedNotifications = notifications.map(notification => (
        {
          ...Object.fromEntries(
            Object.entries(notification).filter(([_, value]) => value !== null)
          ),
          type: notification.type as NotificationType,
        }
      ));
      return mappedNotifications as INotification[];
    }),
    readNotification: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      await prisma.notification.update({where: {id}, data: {read: true}});
      return { message: "Notification read" };
    }),
    getVoiceNotifications: getVoiceNotifications,
});
// export type definition of API
export type AppRouter = typeof appRouter;
