"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { selectProp } from "@/lib/types";
import { updataStatus } from "@/src/purchase";
export default function SelectComponent({ value, status, purchaseId }: selectProp) {
  console.log(status);
  return (
    <Select
      onValueChange={(value) => {
        value === "confirm" ? updataStatus(true, purchaseId) : updataStatus(false, purchaseId);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={status === "pending" ? "confirm" : "pending"}>
          {status === "pending" ? "confirm" : "pending"}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
