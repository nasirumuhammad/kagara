import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchAllPurchase } from "@/src/purchase";
import Select from "@/components/custom/select";
export default async function AdminPage() {
  let isAdmin = (await currentUser())?.publicMetadata.isAdmin === true;
  if (!isAdmin) {
    redirect("/");
  }
  let purchases = await fetchAllPurchase();
  return (
    <>
      <h1 className="my-5 text-2xl font-bold">Order's</h1>
      <ScrollArea className="h-[80vh] w-[100%] rounded-md border p-4">
        <table className="w-[100%]">
          <thead className="text-left p-5">
            <tr>
              <th>Id</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>status</th>
              <th>Phone</th>
              <th>Adress</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((item) => (
              <tr key={item.id} className="text-justify">
                <td>{item.id}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <Select
                    value={item.confirmed ? "confirm" : "pending"}
                    status={item.confirmed ? "confirm" : "pending"}
                    purchaseId={item.id}
                  />
                </td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </>
  );
}
