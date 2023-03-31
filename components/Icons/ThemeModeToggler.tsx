import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import Moon from "./Moon";
import Sun from "./Sun";

type ThemeModeTogglerProps = Omit<IconButtonProps, "aria-label">;

export const ThemeModeToggler: React.FC<ThemeModeTogglerProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(Moon, Sun);

  return (
    <IconButton
      fontSize="4xl"
      variant="ghost"
      onClick={() => toggleColorMode()}
      icon={<SwitchIcon />}
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      style={{ boxShadow: "none" }}
      {...props}
    />
  );
};
