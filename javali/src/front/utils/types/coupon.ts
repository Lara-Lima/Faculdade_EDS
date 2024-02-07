export type Coupons = {
  cupons: Coupon[];
};

//ajustar nomes e tipos atributos
export type Coupon = {
  cupomId: number;
  userId: string;
  codDoCupom: string;
  titulo: string;
  disponivel: boolean;
  dataExpiracao: string;
  categoria: number;
  desconto: number;
  hostingId: number;
};
