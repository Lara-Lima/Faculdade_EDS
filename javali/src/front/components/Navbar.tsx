"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";
import IconNameUser from "./IconNameUser";
import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./context/CartContext";
import CheckboxListBuy from "@/app/explorer/checkboxListBuy";
import ContainerPix from "@/app/explorer/containerPix";
import { StepBuy } from "@/app/explorer/stepBuy";
import { Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

const settings = [
  { name: "Explorar", page: "/explorer" },
  { name: "Anunciar", page: "/announce" },
  { name: "Perfil", page: "/profile" },
  { name: "Dashboard", page: "/dashboard" },
  { name: "Sair", page: "/" },
];

function Navbar() {
  const { logout } = useUser();
  const { accommodations, experiences } = useCart();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (page: string) => {
    setAnchorElUser(null);
    if (typeof page === "string") {
      router.push(page);
      if (page === "/") {
        logout();
      }
    }
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.info}`,
      padding: "0 4px",
      color: theme.palette.info,
    },
  }));

  const steps = [
    {
      reactNode: <CheckboxListBuy />,
      label: "Selecione os itens que deseja comprar",
      descriptione: "Selecione os itens que deseja comprar",
    },
    {
      reactNode: <ContainerPix />,
      label: "Adicionar Cupons",
      description:
        "Insira seus cupons ou os cupons disponíceis para as hospedagens/experiências selecionadas",
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image src="/logo.png" width={40} height={40} alt={""} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JAVAli
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JAVAli
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", gap: "16px" }}>
              {" "}
              <IconButton aria-label="cart" onClick={() => setOpenCart(true)}>
                <StyledBadge
                  badgeContent={accommodations.length + experiences.length}
                  color="warning"
                >
                  <ShoppingCartIcon color="secondary" />
                </StyledBadge>
              </IconButton>
              <Tooltip title="Ver Mais">
                <IconButton onClick={handleOpenUserMenu}>
                  <IconNameUser userName={user?.name} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleCloseUserMenu(setting.page)}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                  <Divider />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={openCart}
        onClose={() => setOpenCart(false)}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="buy-modal">{"Carrinho de compras"}</DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {accommodations.length + experiences.length == 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gap: "16px",
                  opacity: 0.6,
                  justifyItems: "center",
                }}
              >
                <ShoppingCartOutlined sx={{ fontSize: "60px" }} />
                <Typography variant="h3">Seu carrinho está vazio</Typography>
                <Button
                  onClick={() => setOpenCart(false)}
                  sx={{ mt: 1, mr: 1 }}
                  variant="contained"
                >
                  Fechar Modal
                </Button>
              </Box>
            ) : (
              <StepBuy steps={steps} closeModal={() => setOpenCart(false)} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
export default Navbar;
