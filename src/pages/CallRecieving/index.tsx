import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";

import {
  Container,
  Content,
  UserName,
  SubText,
  Controllers,
  Button,
  ButtonText,
} from "./styles";

interface RouteParams {
  roomId: string;
  deviceName: string;
}

const CallRecieving: React.FC = () => {
  const { navigate } = useNavigation();
  const { deviceName, roomId } = useRoute().params as RouteParams;
  const handleDenied = () => {
    // Return home and send socket canceling
    navigate("Home");
  };

  const handleAnswer = () => {
    navigate("Call", { roomId: "roomId" });
  };

  return (
    <Container>
      <Content>
        <UserName>{deviceName}</UserName>
        <SubText>is Calling</SubText>
      </Content>
      <Controllers>
        <Button onPress={handleDenied}>
          <ButtonText>Recusar</ButtonText>
        </Button>
        <Button onPress={handleAnswer} style={{ backgroundColor: "#00bf7c" }}>
          <ButtonText>Atender</ButtonText>
        </Button>
      </Controllers>
    </Container>
  );
};

export default CallRecieving;
