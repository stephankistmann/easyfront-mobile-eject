import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth, IUser } from "../../hooks/auth";
import * as Yup from "yup";
import Input from "../../components/Input";

import getValidationErrors from "../../utils/getValidationErrors";

import {
  Container,
  Title,
  TitleText,
  Line,
  UserAvatarButton,
  UserAvatar,
  AvatarPlaceholder,
  AvatarPlaceholderText,
  UserName,
  SelectContainer,
  SelectText,
  ChevronDown,
  StyledSelectIOS,
  SaveButton,
  SaveButtonText,
  SaveButtonIconView,
} from "./styles";
import Header from "../../components/Header";
import Feather from "react-native-vector-icons/Feather";
import api from "../../services/api";
import Select from "../../components/Select/index.android";
import * as ImagePicker from "react-native-image-picker";

interface ProfileFormData {
  name: string;
  phone: string;
  nature: string;
  gender: string;
  rg?: string;
  cpf: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const initials = useMemo(() => user.name.slice(0, 2).toUpperCase(), [user]);
  const [userData, setUserData] = useState<IUser>(user);
  const [userAvatar, setUserAvatar] = useState<string>("");

  const handleChangeUserField = useCallback((field: string, value: any) => {
    setUserData((oldUser) => ({ ...oldUser, [field]: value }));
  }, []);

  const handleUpdateAvatar = (avatar: any) => {
    setUserAvatar(avatar.uri);

    const data = new FormData();

    const parsedData = JSON.parse(
      JSON.stringify({
        uri: userAvatar,
        type: "image/jpg",
        name: `${user.id}.jpg`,
      })
    );

    data.append("avatar", parsedData);

    api.patch("/users/avatar", data).then((response) => {
      updateUser(response.data);
    });
  };

  const genders = [
    {
      label: "Masculino",
      id: "male",
    },
    {
      label: "Feminino",
      id: "female",
    },
  ];

  const natures = [
    {
      label: "F??sico",
      id: "physic",
    },
    {
      label: "Jur??dico",
      id: "juridic",
    },
  ];

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        data.phone = data.phone.replace(/[\(\)\s-]/g, "");

        data.cpf = data.cpf.replace(/[\.-]/g, "");

        const { name, phone, cpf, gender, nature, rg } = data;

        const formData = {
          name,
          phone,
          cpf,
          rg,
          gender,
          nature,
        };

        const response = await api.put("/users", formData);

        updateUser(response.data);

        Alert.alert("Perfil atualizado com sucesso!");

        navigation.navigate("Home");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          return;
        }
      }
    },
    [updateUser, navigation]
  );

  const handleMaskChange = (field: string, value: string) => {
    setUserData((oldData) => ({ ...oldData, [field]: value }));
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
      <Header hasBackButton />
      <Container>
        <Title>
          <Feather name="user" size={20} color="#0e0e2c" />
          <TitleText>Editar Perfil</TitleText>
        </Title>
        <Line />
        <UserAvatarButton
          onPress={() =>
            ImagePicker.launchImageLibrary(
              { mediaType: "photo" },
              handleUpdateAvatar
            )
          }
        >
          <Feather name="camera" size={18} color="#fff" />
        </UserAvatarButton>
        {user.avatar_url ? (
          <UserAvatar source={{ uri: user.avatar_url }} />
        ) : (
          <AvatarPlaceholder>
            <AvatarPlaceholderText>{initials}</AvatarPlaceholderText>
          </AvatarPlaceholder>
        )}
        <UserName>{user.name}</UserName>
        <Input
          isCustom={false}
          name="name"
          autoCapitalize="words"
          icon="user"
          placeholder="Nome"
          returnKeyType="next"
          defaultValue={userData.name}
          onChangeText={(name: string) => handleChangeUserField("name", name)}
          onSubmitEditing={() => {}}
        />

        <Input
          isCustom={false}
          mask="phone"
          defaultValue={String(userData.phone)
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d{4})$/, "$1-$2")}
          inputMaskChange={(phone: string) => handleMaskChange("phone", phone)}
          onChangeText={(phone: string) =>
            handleChangeUserField("phone", phone)
          }
          keyboardType="number-pad"
          name="phone"
          icon="smartphone"
          maxLength={15}
          placeholder="Telefone"
          returnKeyType="next"
        />

        <Input
          isCustom={false}
          defaultValue={userData.rg}
          keyboardType="number-pad"
          name="rg"
          icon="file"
          placeholder="RG"
          returnKeyType="next"
          maxLength={10}
          onChangeText={(rg: string) => handleChangeUserField("rg", rg)}
        />

        <Input
          isCustom={false}
          mask="cpf"
          defaultValue={userData.cpf.replace(
            /^(\d{3})(\d{3})(\d{3})/,
            "$1.$2.$3-"
          )}
          inputMaskChange={(cpf: string) => handleMaskChange("cpf", cpf)}
          keyboardType="number-pad"
          name="cpf"
          icon="file"
          maxLength={14}
          placeholder="CPF"
          returnKeyType="next"
        />

        <SelectContainer>
          <SelectText>
            {userData.gender &&
              userData.gender
                .replace("female", "Feminino")
                .replace("male", "Masculino")
                .replace("not-informed", "N??o-informado")}
          </SelectText>

          {Platform.OS === "android" ? (
            <>
              <Select
                value={userData.gender}
                onChange={(gender: string) =>
                  handleChangeUserField("gender", gender)
                }
                options={genders}
              />
              <ChevronDown name="chevron-down" size={20} color="#383850" />
            </>
          ) : (
            <StyledSelectIOS
              value={userData.nature}
              onChange={(nature: string) =>
                handleChangeUserField("nature", nature)
              }
              options={natures}
            />
          )}
        </SelectContainer>

        <SelectContainer>
          <SelectText>
            {userData.nature &&
              userData.nature
                .replace("juridic", "Jur??dico")
                .replace("physic", "F??sico")
                .replace("not-informed", "N??o-informado")}
          </SelectText>

          {Platform.OS === "android" ? (
            <>
              <Select
                value={userData.nature}
                onChange={(nature: string) =>
                  handleChangeUserField("nature", nature)
                }
                options={natures}
              />
              <ChevronDown name="chevron-down" size={20} color="#383850" />
            </>
          ) : (
            <StyledSelectIOS
              value={userData.nature}
              onChange={(nature: string) =>
                handleChangeUserField("nature", nature)
              }
              options={natures}
            />
          )}
        </SelectContainer>

        <SaveButton onPress={() => handleSubmit(userData)}>
          <SaveButtonText>Salvar</SaveButtonText>
          <SaveButtonIconView>
            <Feather name="save" size={24} color="#fff" />
          </SaveButtonIconView>
        </SaveButton>
      </Container>
    </ScrollView>
  );
};

export default Profile;
