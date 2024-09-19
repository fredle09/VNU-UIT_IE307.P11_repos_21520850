import { Redirect, Stack } from "expo-router"
import { useContext } from "react";
import { AuthContext } from "~/provider/auth-provider"

export default function () {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect href="/index" />;
  }

  return <Stack />
}