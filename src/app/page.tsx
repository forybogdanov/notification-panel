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

enum NotificationType {
  PLATFORM_UPDATE = "Platform Update",
  COMMENT_TAG = "Comment Tag",
  ACCESS_GRANTED = "Access Granted",
  JOIN_WORKSPACE = "Join Workspace",
}

interface Notification {
  title: string;
  description: string;
  type: NotificationType;
}

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
  const { register, handleSubmit } = useForm();

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
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button>
                      <PlusIcon />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Create new notification</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Create a new notification to send to users.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Type
                        </Text>
                        <Select.Root defaultValue={NotificationType.PLATFORM_UPDATE}>
                          <Select.Trigger />
                          <Select.Content>
                            <Select.Group>
                              <Select.Label>Notification type</Select.Label>
                              {Object.values(NotificationType).map((type) => (
                                <Select.Item key={type} value={type}>
                                  {type}
                                </Select.Item>
                              ))}
                            </Select.Group>
                          </Select.Content>
                        </Select.Root>
                      </label>
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Email
                        </Text>
                        <TextField.Root
                          defaultValue="freja@example.com"
                          placeholder="Enter your email"
                        />
                      </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button>Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
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
