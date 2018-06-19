import { Product } from "./product";

export class Order {
  _id: string;
  orderDate: string;
  total_price: string;
  quantity: string;
  product: Product;
}