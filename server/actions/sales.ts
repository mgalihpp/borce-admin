"use server";

import connectToMongoDB from "@/lib/db";
import Customer from "@/lib/db/models/customer";
import Order from "@/lib/db/models/order";

export const getTotalSales = async () => {
  try {
    await connectToMongoDB();
    const orders = await Order.find({});

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.totalAmmount || 0),
      0
    );
    return { totalOrders, totalRevenue };
  } catch (error) {
    return {
      error: "Failed to get sales data.",
    };
  }
};

export const getTotalCustomers = async () => {
  try {
    await connectToMongoDB();
    const customers = await Customer.find({});
    const totalCustomer = customers.length;
    return { totalCustomer };
  } catch (error) {
    return {
      error: "Failed to get customers data.",
    };
  }
};

export const getSalesPerMonth = async () => {
  try {
    await connectToMongoDB();

    const orders = await Order.find();

    // Define a type for salesPerMonth
    type SalesPerMonth = {
      [monthIndex: number]: number;
    };

    // Reduce orders to calculate sales per month
    const salesPerMonth: SalesPerMonth = orders.reduce(
      (acc: SalesPerMonth, order) => {
        // Extract the month index from the order's createdAt date
        const monthIndex = new Date(order.createdAt).getMonth(); // 0 for January --> 11 for December
        // Update the sales amount for the corresponding month
        acc[monthIndex] = (acc[monthIndex] || 0) + (order.totalAmmount || 0);
        return acc;
      },
      {}
    );

    const graphData = Array.from({ length: 12 }, (_, index) => {
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        new Date(0, index)
      );

      // if index === 5 => month = 'Jun'

      return { name: month, sales: salesPerMonth[index] || 0 };
    });

    return { graphData };
  } catch (error) {
    return {
      error: "Failed to get sales per month data.",
    };
  }
};
