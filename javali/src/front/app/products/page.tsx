"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@/components/context/UserContext";

export default function Products() {
  const { user } = useUser();
  return (
    <div>
      <Navbar />
      Usuario: {user?.name}
    </div>
  );
}
