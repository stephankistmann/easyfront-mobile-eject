import styled from "styled-components/native";
import { Picker } from "@react-native-community/picker";
import { Feather } from "@expo/vector-icons";
import SelectIOS from "../../components/Select/index.ios";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.View`
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 5%;
  margin-bottom: 5%;
  background: #bbb;
`;

export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  border-width: 3px;
  border-color: #fff;
  position: relative;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  top: 140px;
  left: 220px;
  background: #f66253;
  align-items: center;
  justify-content: center;
`;

export const CameraBackground = styled.View`
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const AvatarPlaceholder = styled.View`
  background-color: #c4c4c4;
  border-width: 3px;
  border-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const SelectGenderNature = styled(Picker)``;

export const SelectContainer = styled.View`
  background: #ffffff;
  border-width: 1px;
  border-color: #dfe9eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
  height: 54px;
  max-width: 340px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChevronDown = styled(Feather)`
  position: absolute;
  right: 20px;
`;

export const StyledSelectIOS = styled(SelectIOS)``;
