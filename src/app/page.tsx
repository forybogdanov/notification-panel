"use client";

import { BellIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Grid,
  Popover,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { CreateNotificationButton } from "@/components/Form";
import NotificationCard from "@/components/NotificationCard";
import { INotification, NotificationType } from "@/types/notification";

const exampleNotifications: INotification[] = [
  {
    type: NotificationType.PLATFORM_UPDATE,
    avatar_link: "",
    read: false,
    personName: null,
    releaseNumber: null,
    update: "New feature release",
    createdAt: new Date(),
  },
  {
    type: NotificationType.COMMENT_TAG,
    avatar_link: "",
    read: false,
    personName: "John Doe",
    releaseNumber: null,
    update: null,
    createdAt: new Date(),
  }
];

export default function Home() {
  const [openNotificationsDropdown, setOpenNotificationsDropdown] =
    useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    setNotifications(exampleNotifications);
  }, []);

  return (
    <Grid
      width="100vw"
      className="bg-neutral-200 flex justify-center items-center"
    >
      <Grid className="w-full flex flex-col justify-start items-center p-4">
        <Flex direction="row" width="100%" gap="4" justify="between">
          <Text>Notifications app</Text>
          <Popover.Root>
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
                  <Text>{notifications.length} unread notifications</Text>
                  <CreateNotificationButton />
                </Flex>
                <Flex direction="column" gap="2">
                  {notifications.map((notification, index) => (
                    <NotificationCard key={`notification-${index}`} notification={notification} />
                  ))}
                </Flex>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </Grid>
    </Grid>
  );
}
