import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export type CreateProduct = Omit<Product, 'productId'>;

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string; // ISO Date String
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string; // ISO Date String
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string; // ISO Date String
}

export interface ExpenseByCategory {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  date: string; // ISO Date String
  category: string;
  amount: string; // Stored as string to handle BigInt safely
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategory: ExpenseByCategory[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics', 'Products', 'Users', 'ExpensesByCategory'],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: '/products',
        params: search ? { search } : {},
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<Product, CreateProduct>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
    getUsers: build.query<User[], string | void>({
      query: (search) => ({
        url: '/users',
        params: search ? { search } : {},
      }),
      providesTags: ['Users'],
    }),
    createUser: build.mutation<User, CreateUser>({
      query: (newUser) => ({
        url: '/auth/signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),
    getExpensesByCategory: build.query<ExpenseByCategory[], void>({
      query: () => ({
        url: '/expenses',
      }),
      providesTags: ['ExpensesByCategory'],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetExpensesByCategoryQuery,
} = api;
