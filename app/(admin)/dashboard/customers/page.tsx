import { columns } from "@/components/admin/column/customer";
import { DataTable } from "@/components/admin/data-table";
import { Separator } from "@/components/ui/separator";
import connectToMongoDB from "@/lib/db";
import Customer from "@/lib/db/models/customer";

const getCustomers = async () => {
  await connectToMongoDB();

  const customers = await Customer.find({}).sort({ createdAt: "desc" });

  return { customers };
};

export default async function CutomerPage() {
  const { customers } = await getCustomers();

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>

      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
}
