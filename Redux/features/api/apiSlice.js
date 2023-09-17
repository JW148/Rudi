import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://94.173.240.211:3000/" }),
  tagTypes: ["Sale"],
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => "/",
    }),
    getSales: builder.query({
      query: (date) => `/getSales/${date}`,
      providesTags: ["Sale"],
    }),
    addNewSale: builder.mutation({
      query: (sale) => ({
        url: "/createSale",
        method: "POST",
        body: sale,
      }),
      invalidatesTags: ["Sale"],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useGetSalesQuery,
  useAddNewSaleMutation,
} = apiSlice;
