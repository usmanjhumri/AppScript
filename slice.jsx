// api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace.jdfunnel.com/api' }),
  endpoints: (builder) => ({
    getHomepage: builder.query({
      query: () => 'homepage',
    }),
  }),
});

export const { useGetHomepageQuery } = api;
