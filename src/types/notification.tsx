export enum NotificationType {
    PLATFORM_UPDATE = "Platform Update",
    COMMENT_TAG = "Comment Tag",
    ACCESS_GRANTED = "Access Granted",
    JOIN_WORKSPACE = "Join Workspace",
  }
  
  export interface Notification {
    title: string;
    description: string;
    type: NotificationType;
  }