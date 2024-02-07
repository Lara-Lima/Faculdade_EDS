"use client";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import IconNameUser from "./IconNameUser";
import Collapse from "@mui/material/Collapse";
import { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQueryState } from "next-usequerystate";

export type ProductProps = {
  id: number;
  nome: string;
  proprietario?: string;
  imagem: string;
  data: string;
  icon?: React.ReactNode;
  anotherIcon?: React.ReactNode;
  actionCard?: React.ReactNode;
  detailsProduct?: React.ReactNode;
  tabKey?: string;
};

export const ProductExperience: FC<ProductProps> = ({
  id,
  nome,
  proprietario,
  imagem,
  data,
  icon,
  anotherIcon,
  actionCard,
  detailsProduct,
  tabKey = "experience",
}) => {
  const [expanded, setExpanded] = useState(false);

  const [, setExperienceSelected] = useQueryState(tabKey);

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

  return (
    <Card
      sx={{
        cursor: "pointer",
      }}
      onClick={() => setExperienceSelected(id.toString())}
    >
      <CardHeader title={nome} subheader={data} action={actionCard} />

      <CardMedia
        component="img"
        style={{ objectFit: "cover", height: "300px" }}
        image={imagem}
        alt="Paella dish"
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
