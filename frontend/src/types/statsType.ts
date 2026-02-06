// src/types/statsType.ts

export interface IRevenueStats {
  totalRevenue: number;
  adminProfit: number;
  vendorCommission: number;
  websiteCommission: number;
  myCommission?: number;
}

export interface IProductStats {
  totalVendors: number;
  totalProducts: number;
  vendors: {
    vendor: string;
    products: number;
  }[];
}

export interface IServiceUserStats {
  totalUsers: number;
  users: {
    user: string;
    servicesTaken: number;
  }[];
}

export interface ICategoryRevenue {
  category: string;
  totalRevenue: number;
}

export interface IMonthlyStats {
  year: number;
  month: number;
  totalRevenue: number;
  totalUsers: number;
}

export interface IStatsResponse {
  stats: IRevenueStats;
  productStats: IProductStats;
  serviceUserStats: IServiceUserStats;
  categoryRevenue: ICategoryRevenue[];
  monthlyStats: IMonthlyStats[];
}

