"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useToast } from "@/hooks/use-toast";
import { logError } from "@/hooks/api/utils";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const { toast } = useToast();

  const [client] = React.useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => logError(error, toast)
      }),
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
