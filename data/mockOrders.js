export const ORDERS = [
  {
    id: "ORD001",
    date: "2026-01-01",
    total: 259.97,
    status: "Delivered",
    items: [
      { id: 1, title: "Wireless Headphones", quantity: 1, price: 99.99 },
      { id: 2, title: "Smart Watch", quantity: 2, price: 79.99 },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  },
  {
    id: "ORD002",
    date: "2025-12-28",
    total: 59.99,
    status: "Shipped",
    items: [{ id: 3, title: "Bluetooth Speaker", quantity: 1, price: 59.99 }],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  },
];
