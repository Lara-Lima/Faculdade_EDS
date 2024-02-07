import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { Product, ProductProps } from "./Product";
import { MapsHomeWork } from "@mui/icons-material";
import RangeDate from "./RangeDate";

type FeedProps = {
  produtos: ProductProps[];
};
export const Feed: FC<FeedProps> = ({ produtos }) => {
  return (
    <Box
      p={{ xs: 0, md: 2 }}
      height="88vh"
      overflow="auto"
      className={"bg-gray-200"}
    >
      {produtos.length > 0 ? (
        produtos?.map((produto, index) => (
          <Product
            key={index}
            proprietario={produto.proprietario}
            nome={produto.nome}
            imagem={produto.imagem}
            data={produto.data}
            icon={produto.icon}
            anotherIcon={produto.anotherIcon}
            actionCard={produto.actionCard}
            detailsProduct={produto.detailsProduct}
          />
        ))
      ) : (
        <Box
          sx={{
            height: "66%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            opacity: 0.35,
          }}
        >
          <MapsHomeWork sx={{ fontSize: "120px" }} />
          <Typography>Não há produtos para serem exibidos!</Typography>
        </Box>
      )}
    </Box>
  );
};
