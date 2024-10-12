export enum NotificationType {
  PLATFORM_UPDATE = "Platform Update",
  COMMENT_TAG = "Comment Tag",
  ACCESS_GRANTED = "Access Granted",
  JOIN_WORKSPACE = "Join Workspace",
}
  
export interface INotification {
  type: NotificationType;
  avatar_link: string | null;
  read: boolean;
  personName: string | null;
  releaseNumber: number | null;
  update: string | null;
  createdAt: Date;
}
