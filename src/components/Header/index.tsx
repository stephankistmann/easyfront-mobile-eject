import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  NavButton,
  UserContainer,
  UnitsContainer,
  Profile,
  Avatar,
  AvatarImage,
  AvatarPlaceholder,
  AvatarPlaceholderText,
  GreenDot,
} from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/auth";
import AccessSelect from "./AccessSelect";

interface IHeader {
  hasBackButton?: boolean;
}

const Header: React.FC<IHeader> = ({ hasBackButton }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const initials = useMemo(() => user.name.slice(0, 2).toUpperCase(), [user]);

  return (
    <Container>
      <NavButton onPress={() => navigation.openDrawer()}>
        {hasBackButton ? (
          <Feather
            name="chevron-left"
            size={28}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Feather name="menu" size={28} />
        )}
      </NavButton>
      <UserContainer>
        <UnitsContainer>
          <AccessSelect />
        </UnitsContainer>
        <Profile>
          <GreenDot />
          <Avatar onPress={() => navigation.navigate("Profile")}>
            {user.avatar_url ? (
              <AvatarImage source={{ uri: user.avatar_url }} />
            ) : (
              <AvatarPlaceholder>
                <AvatarPlaceholderText>{initials}</AvatarPlaceholderText>
              </AvatarPlaceholder>
            )}
          </Avatar>
        </Profile>
      </UserContainer>
    </Container>
  );
};

export default Header;
