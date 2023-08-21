import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.73:3000/'}),
    endpoints: builder => ({
        getIngredients: builder.query({
            query: () => '/'
        }),
        getSales: builder.query({
            query: date => `/posts/${date}`
        })
    })
})

export const { useGetIngredientsQuery, useGetSalesQuery } = apiSlice