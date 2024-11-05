import { useAuth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createPurchase } from "@/src/purchase";
import { SetStateAction } from "react";

export default function CartDialog({
  qauntity,
  price,
  setIsOpen,
  isOpen,
}: {
  qauntity: number;
  price: number;
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded || !userId) {
    return <></>;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-[100%] p-5 text-xl mt-5 bg-black text-white rounded">Buy</DialogTrigger>
      <DialogContent className="bg-white">
        <form action={createPurchase}>
          <h1 className="font-bold">Order summary</h1>
          <div className="flex justify-between mt-2">
            <p>Quantity</p>
            <p className="font-bold">{qauntity}</p>
          </div>
          <div className="flex justify-between my-2">
            <p>Total</p>
            <p className="font-bold">&#8358;{price * qauntity}</p>
          </div>
          <Separator />
          <div className="form-element">
            <label htmlFor="address">Address</label>
            <Input name="address" required />
          </div>
          <div className="form-element">
            <label htmlFor="phone">Phone</label>
            <Input type="tel" name="phone" required />
          </div>
          <input type="hidden" name="quantity" value={qauntity} />
          <input type="hidden" name="price" value={price * qauntity} />
          <input type="hidden" name="userId" value={userId} />
          <Button
            className="w-[100%] p-3 mt-5"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Purchase
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
