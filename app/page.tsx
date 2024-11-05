"use client";
import Dialog from "@/components/custom/Dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { systemConfig } from "@/lib/system.config";

let price = systemConfig.price;
export default function Home() {
  const [quantity, setQuantity] = useState(1);
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <main className="flex justify-between">
        <div className="hero-image w-[40%]">
          <Image src="/assets/sachetwater.png" height={960} width={700} alt="sachet water image" className="w-[100%]" />
        </div>
        <div className="hero-text w-[60%] mt-20">
          <div className="product-info flex justify-between w-[100%] font-bold text-xl uppercase">
            <h1 className="product-header">sachet water</h1>
            <div className="product-price">&#8358;{price} per bag</div>
          </div>
          <p className="product-desription mt-5 text-justify leading-loose">{systemConfig.heroText}</p>
          <div className="order-info flex justify-between items-center ">
            <ul className="details list-disc list-inside mt-5">
              <li>Boosts Physical Performance</li>
              <li>Aids in Digestion</li>
              <li>Regulates Body Temperature</li>
              <li>Supports Kidney Function</li>
            </ul>
            <div className="quantity">
              <label className="text-xl font-bold" htmlFor="quantity">
                Quantity
              </label>
              <Input
                type="number"
                id="quantity"
                placeholder="1"
                className="mt-2"
                onChange={(value) => {
                  let quantity = Number.parseInt(value.target.value);
                  if (!quantity) {
                    quantity = 1;
                  }
                  setQuantity(quantity);
                }}
              />
            </div>
          </div>
          <Dialog qauntity={quantity} price={price} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </main>
    </div>
  );
}
