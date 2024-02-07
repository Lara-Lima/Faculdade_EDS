import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function getInitials(name: string) {
  const nameParts = name.split(" ");
  let initials = "";

  for (const part of nameParts) {
    initials += part.charAt(0);
  }

  return initials.toUpperCase();
}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: getInitials(name),
  };
}

type BackgroundLetterAvatarsProps = {
  userName?: string;
  tam?: number;
};

function tamFonte(tam: number) {
  return tam / 2;
}

const IconNameUser = React.forwardRef<
  React.Ref<any>,
  BackgroundLetterAvatarsProps
>(({ tam, userName }, ref) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        {...stringAvatar(userName || "Sem Nome")}
        sx={{
          height: tam || 40,
          width: tam || 40,
          fontSize: tamFonte(tam || 40),
        }}
      />
    </Stack>
  );
});

IconNameUser.displayName = "IconNameUser";
export default IconNameUser;
