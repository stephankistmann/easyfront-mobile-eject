import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideMenu from "../../components/SideMenu";
import Home from "../../pages/Home";
import InvitesStack from "./invites.routes";
import TagsStack from "./tags.routes";
import Profile from "../../pages/Profile";
import Events from "../../pages/EventsPage";
import Devices from "../../pages/Devices";
import DefaultError from "../../pages/DefaultError";
import CallRecieving from "../../pages/CallRecieving";

const Restricted = createDrawerNavigator();

const RestrictedRoutes: React.FC = () => (
  <Restricted.Navigator
    sceneContainerStyle={{
      backgroundColor: "#FFF",
    }}
    initialRouteName="Home"
    drawerContent={(props) => <SideMenu {...props} />}
  >
    <Restricted.Screen name="Home" component={Home} />
    <Restricted.Screen name="Profile" component={Profile} />
    <Restricted.Screen name="InvitesStack" component={InvitesStack} />
    <Restricted.Screen name="TagsStack" component={TagsStack} />
    <Restricted.Screen name="Events" component={Events} />
    <Restricted.Screen name="Devices" component={Devices} />
    <Restricted.Screen name="CallRecieving" component={CallRecieving} />

    <Restricted.Screen name="DefaultError" component={DefaultError} />
  </Restricted.Navigator>
);

export default RestrictedRoutes;
