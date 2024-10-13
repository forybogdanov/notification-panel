"use client";

import { BellIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Grid,
  Popover,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { CreateNotificationButton } from "@/components/Form";
import NotificationCard from "@/components/NotificationCard";
import { INotification } from "@/types/notification";
import { notificationService } from "@/services/notification.service";

export default function Home() {
  const [openNotificationsDropdown, setOpenNotificationsDropdown] =useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const data = await notificationService.getAll();
    setNotifications(data);
    setLoading(false);
  };


  return (
    <Grid
      width="100vw"
      className="bg-neutral-200 flex justify-center items-center"
    >
      <Grid className="w-full flex flex-col justify-start items-center p-4">
        <Flex direction="row" width="100%" gap="4" justify="between">
          <Text>Notifications app</Text>
          <Popover.Root onOpenChange={fetchNotifications}>
            <Popover.Trigger>
              <Button
                onClick={() =>
                  setOpenNotificationsDropdown(!openNotificationsDropdown)
                }
              >
                <BellIcon />
              </Button>
            </Popover.Trigger>
            <Popover.Content width="360px">
              <Flex direction="column" gap="2">
                <Flex direction="row" justify="between" align="center">
                  {loading && (
                    <>
                      <Spinner />
                      <Text>loading notifications</Text>
                    </>
                  )}
                  {!loading && notifications.length === 0 && (
                    <Text>No unread notifications</Text>
                  )}
                  {!loading && notifications.length > 0 && (
                    <Text>{notifications.length} unread notifications</Text>
                  )}
                  <CreateNotificationButton open={openForm} setOpen={setOpenForm} fetchNotifications={fetchNotifications} />
                </Flex>
                {!loading && notifications.length > 0 && (
                  <Flex direction="column" gap="2" className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <NotificationCard fetchNotifications={fetchNotifications} key={`notification-${index}`} notification={notification} />
                    ))}
                  </Flex>
                )}
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </Grid>
    </Grid>
  );
}
