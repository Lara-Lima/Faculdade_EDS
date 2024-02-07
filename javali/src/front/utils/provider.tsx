"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeRegistry from "@/lib/ThemeRegistry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { UserProvider } from "@/components/context/UserContext";
import { CartProvider } from "@/components/context/CartContext";
function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: 1,
          staleTime: 5 * 1000,
        },
      },
    })
  );

  return (
    <ThemeRegistry>
      <UserProvider>
        <CartProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <QueryClientProvider client={client}>
              {children}
              {/* <ReactQueryDevtools
              buttonPosition="bottom-left"
              initialIsOpen={false}

            /> */}
            </QueryClientProvider>
          </LocalizationProvider>
        </CartProvider>
      </UserProvider>
    </ThemeRegistry>
  );
}

export default Providers;
