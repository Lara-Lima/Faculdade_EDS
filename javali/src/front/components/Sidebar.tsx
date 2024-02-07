import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { parseAsString, useQueryState } from "next-usequerystate";

type SidebarProps = {
  listItems: ListItemProps[];
  hasButton?: boolean;
  modalChildren?: React.ReactNode;
  modalTitle?: string;
  open?: boolean | any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>> | any;
  tabKey?: string;
};

type ListItemProps = {
  icon: React.ReactNode;
  text: string;
  key: string;
};

const Sidebar: React.FC<SidebarProps> = ({
  listItems,
  hasButton,
  modalChildren,
  modalTitle,
  open,
  setOpen,
  tabKey = "tab",
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tab, setTab] = useQueryState(
    tabKey,
    parseAsString.withDefault(listItems[0].key)
  );
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <List>
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className={tab === item.key ? "bg-gray-200" : ""}
          >
            <ListItemButton onClick={() => setTab(item.key)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {hasButton && (
        <Box sx={{ marginTop: "52vh" }}>
          <Fab color="primary" onClick={handleClickOpen} aria-label="add">
            <AddCircle />
          </Fab>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle id="alert-dialog-title">
              Cadastrar Produtos
            </DialogTitle>
            <DialogContent>{modalChildren}</DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
