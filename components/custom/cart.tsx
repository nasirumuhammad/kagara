"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LuShoppingCart, LuCupSoda } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { fetchPurchase } from "@/src/purchase";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { purchase } from "@/lib/types";
export default function Cart() {
  let { userId } = useAuth();
  let [cart, setCart] = useState<purchase[]>();
  let [refreshContent, setRefreshContent] = useState(false);
  useEffect(() => {
    fetchPurchase(userId!).then((purchase) => {
      setCart(purchase);
    });
  }, [refreshContent]);
  return (
    <Sheet>
      <SheetTrigger
        onClick={() => {
          setRefreshContent(!refreshContent);
        }}
      >
        <LuShoppingCart size={30} title="cart" />
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cart?.map((item) => (
              <>
                <div className="item flex justify-between mt-5 items-center mb-4">
                  <div
                    className={cn(
                      {
                        "text-green-300": item.confirmed === true,
                        "text-red-300": item.confirmed === false,
                      },
                      "w-[10%]"
                    )}
                  >
                    <LuCupSoda size={40} />
                  </div>
                  <div>
                    <p className="font-bold">&#8358;{item.price}</p>
                    <span>{item.createdAt}</span>
                  </div>
                  <p
                    className={cn(
                      {
                        "bg-green-300": item.confirmed === true,
                        "bg-red-300": item.confirmed === false,
                      },
                      "text-white p-1 rounded-full"
                    )}
                  >
                    {item.confirmed === true ? "delivered" : "pending"}
                  </p>
                </div>
                <Separator />
              </>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
