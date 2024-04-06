import { columns } from "@/components/admin/column/order-item";
import { DataTable } from "@/components/admin/data-table";
import axiosInstance from "@/lib/axios";
import React from "react";

type shippingAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type OrderDetailsType = {
  _id: string;
  shippingAddress: shippingAddress;
  shippingRate: string;
  totalAmmount: number;
  products: OrderItemType[];
};

type CustomerType = {
  customerId: string;
  name: string;
  email: string;
};

type GetOrderDetailsResponseType = {
  orderDetails: OrderDetailsType;
  customer: CustomerType;
};

const getOrderDetails = async (
  params: string
): Promise<GetOrderDetailsResponseType> => {
  const { data } = await axiosInstance.get<GetOrderDetailsResponseType>(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params}`
  );

  return data;
};

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderDetails, customer } = await getOrderDetails(params.orderId);

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name :{" "}
        <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping address :{" "}
        <span className="text-base-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">${orderDetails.totalAmmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID:{" "}
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
}
