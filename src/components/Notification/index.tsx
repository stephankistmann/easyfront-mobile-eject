import React, { useEffect } from "react";
import OneSignal, { OpenedEventAction } from "react-native-onesignal";
import { navigate } from "../../../RootNavigation";
import { useAuth } from "../../hooks/auth";

interface IAction extends OpenedEventAction {
  actionId?: string;
}

const Notification = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      console.log("Notification initialized");

      OneSignal.setAppId("66fd6f02-0d9a-46bd-ba2a-2f1ce93060e3");

      OneSignal.setNotificationOpenedHandler((event) => {
        const { action, notification } = event;

        const id = notification.notificationId;
        const data: any = notification.additionalData;
        const { actionId = "default" }: IAction = action;

        navigate("CallRecieving", {
          roomId: data.roomId,
          deviceName: data.deviceName,
        });
        // navigate("Call", { roomId: "defaultRoom" });
      });

      // Set id used on backend to direct messages
      OneSignal.setExternalUserId(user.id, (results) => {
        console.log(results);
      });
    }
  }, [user]);

  return null;
};

export default Notification;
