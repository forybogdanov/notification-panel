"use client";
import { NotificationType } from "@/types/notification";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Text,
  Select,
  Dialog,
  Button,
  TextField,
} from "@radix-ui/themes";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface INotificationPlatformUpdateForm {
  avatarLink: string;
  releaseNumber: string;
  update: string;
}

interface INotificationOthersForm {
  avatarLink: string;
  personName: string;
}

const defaultValuesPlatformUpdate: INotificationPlatformUpdateForm = {
  avatarLink: "",
  releaseNumber: "",
  update: "",
};

const defaultValuesOthers: INotificationOthersForm = {
  avatarLink: "",
  personName: "",
};

export const CreateNotificationButton = () => {
  const {
    handleSubmit: handleSubmitPlatform,
    setValue: setValuePlatform,
    formState: { errors: errorsPlatform },
    register: registerPlatform,
  } = useForm<INotificationPlatformUpdateForm>({
    defaultValues: defaultValuesPlatformUpdate,
  });
  const {
    handleSubmit: handleSubmitOthers,
    setValue: setValueOthers,
    formState: { errors: errorsOthers },
    register: registerOthers,
  } = useForm<INotificationOthersForm>({ defaultValues: defaultValuesOthers });

  useEffect(() => {
    registerPlatform("update", {
      required: "Update is required",
      minLength: 5,
    });
    registerPlatform("avatarLink", { required: "Avatar link is required" });
    registerPlatform("releaseNumber", {
      required: "Release number is required",
    });
    registerOthers("personName", {
      required: "Your name is required",
      minLength: 2,
    });
    registerOthers("avatarLink", { required: "Avatar link is required" });
  }, [registerPlatform, registerOthers]);

  const onSubmitPlatform: SubmitHandler<INotificationPlatformUpdateForm> = (
    data,
  ) => console.log("submit platform", data);
  const onSubmitOthers: SubmitHandler<INotificationOthersForm> = (data) =>
    console.log("submit others", data);
  const [type, setType] = useState<NotificationType>(
    NotificationType.PLATFORM_UPDATE,
  );

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
            <Select.Root
              defaultValue={NotificationType.PLATFORM_UPDATE}
              onValueChange={(value) => setType(value as NotificationType)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Notification type</Select.Label>
                  {Object.values(NotificationType).map((type) => (
                    <Fragment key={`key-${type}`}>
                      <Select.Item key={type} value={type}>
                        {type}
                      </Select.Item>
                    </Fragment>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
          {type === NotificationType.PLATFORM_UPDATE && (
            <>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Release number
                </Text>
                <TextField.Root
                  onChange={(e) =>
                    setValuePlatform("releaseNumber", e.target.value)
                  }
                  defaultValue={
                    defaultValuesPlatformUpdate.releaseNumber?.toString() || ""
                  }
                  placeholder="Enter release number"
                />
                {errorsPlatform.releaseNumber && (
                  <Text color="red">Release number is required</Text>
                )}
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Update
                </Text>
                <TextField.Root
                  onChange={(e) => setValuePlatform("update", e.target.value)}
                  defaultValue={defaultValuesPlatformUpdate.update || ""}
                  placeholder="Enter update"
                />
                {errorsPlatform.update && (
                  <Text color="red">Update is required</Text>
                )}
              </label>
              <label>
                <Text>Avatar link</Text>
                <TextField.Root
                  onChange={(e) =>
                    setValuePlatform("avatarLink", e.target.value)
                  }
                  defaultValue={defaultValuesPlatformUpdate.avatarLink || ""}
                  placeholder="Enter avatar link"
                />
              </label>
            </>
          )}
          {type !== NotificationType.PLATFORM_UPDATE && (
            <>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Your name
                </Text>
                <TextField.Root
                  onChange={(e) => setValueOthers("personName", e.target.value)}
                  defaultValue={defaultValuesOthers.personName || ""}
                  placeholder="Enter your name"
                />
                {errorsOthers.personName && (
                  <Text color="red">Your name is required</Text>
                )}
              </label>
              <label>
                <Text>Avatar link</Text>
                <TextField.Root
                  onChange={(e) => setValueOthers("avatarLink", e.target.value)}
                  defaultValue={defaultValuesOthers.avatarLink || ""}
                  placeholder="Enter avatar link"
                />
              </label>
            </>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            onClick={() => {
              if (type === NotificationType.PLATFORM_UPDATE) {
                handleSubmitPlatform(onSubmitPlatform)();
              } else {
                handleSubmitOthers(onSubmitOthers)();
              }
            }}
          >
            Create
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
