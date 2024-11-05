export type purchase = {
  id: string;
  userId: string | null;
  quantity: number | null;
  price: number | null;
  address: string | null;
  phone: string | null;
  confirmed: boolean | null;
  createdAt: string | null;
};

export type selectProp = { value: string; status: "pending" | "confirm"; purchaseId: string };
