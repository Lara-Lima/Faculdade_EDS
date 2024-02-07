"use client";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import { IconButtonProps } from "@mui/material/IconButton";
import { useQueryState } from "next-usequerystate";

export type ProductProps = {
  id: number;
  nome: string;
  proprietario?: string;
  imagem: string;
  data?: string;
  valor?: string;
  cidade?: string;
  estado?: string;
  icon?: React.ReactNode;
  anotherIcon?: React.ReactNode;
  actionCard?: React.ReactNode;
  detailsProduct?: React.ReactNode;
  tabKey?: string;
};

export const Product: FC<ProductProps> = ({
  id,
  nome,
  imagem,
  valor,
  icon,
  anotherIcon,
  actionCard,
  cidade,
  estado,
  detailsProduct,
  tabKey = "accommodation",
}) => {
  const [expanded, setExpanded] = useState(false);

  const [, setAccommodationSelected] = useQueryState(tabKey);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const regiao = `${cidade}-${estado}`;

  return (
    <Card
      sx={{
        cursor: "pointer",
      }}
      onClick={() => setAccommodationSelected(id.toString())}
    >
      <CardHeader title={nome} subheader={regiao} action={actionCard} />
      <Typography variant="h6" color="text.secondary">
        {valor?.toString()}
      </Typography>

      <CardMedia
        component="img"
        image={imagem}
        alt="Paella dish"
        style={{ objectFit: "cover", height: "300px" }}
      />

      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {icon && (
            <IconButton aria-label="delete" size="large">
              {icon}
            </IconButton>
          )}

          {anotherIcon && (
            <IconButton aria-label="delete" size="large">
              {anotherIcon}
            </IconButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
