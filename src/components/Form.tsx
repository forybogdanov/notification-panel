"use client";
import { Notification, NotificationType } from "@/types/notification";
import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, Text, Select, Dialog, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

export const CreateNotificationButton = () => {
  const { register, handleSubmit } = useForm();

  return (
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
  );
};
