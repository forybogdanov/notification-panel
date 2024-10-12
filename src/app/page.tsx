"use client";

import { BellIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Grid,
  Popover,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Notification, NotificationType } from "@/types/notification";
import { CreateNotificationButton } from "@/components/Form";

const exampleNotifications: Notification[] = [
  {
    title: "Notification 1",
    description: "This is the first notification",
    type: NotificationType.PLATFORM_UPDATE,
  },
  {
    title: "Notification 2",
    description: "This is the second notification",
    type: NotificationType.COMMENT_TAG,
  },
];

export default function Home() {
  const [openNotificationsDropdown, setOpenNotificationsDropdown] =
    useState(false);
  const [notifications, setNotifications] = useState(exampleNotifications);

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
              <Flex direction="row" justify="between" align="center">
                <Text>{notifications.length} unread notifications</Text>
                <CreateNotificationButton />
              </Flex>
              <Flex direction="column" gap="2">
                {notifications.map((notification) => (
                  <Flex direction="row" gap="2" key={`key-${notification.title}`}>
                    <Text>{notification.title}</Text>
                  </Flex>
                ))}
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </Grid>
    </Grid>
  );
}
