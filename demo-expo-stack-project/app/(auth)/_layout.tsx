import { Redirect, Slot } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "~/provider/auth-provider";

export default function AuthLayout() {
  const { user } = useContext(AuthContext);

  if (user) {
    // console.log(">> Trigger AuthLayout!!!");
    return <Redirect href="/(user)/" />
  }

  return <Slot />
}