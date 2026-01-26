"use client";
import CustomDialog from "@/components/ui/CustomDialog/CustomDialog";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function CheckoutSuccessPage() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  return (
    <CustomDialog isOpen={isOpen}>
      <div className="text-center p-6 ">
        <Image
          className="m-auto"
          src="/gifs/check.gif"
          alt="Success"
          width={120}
          height={120}
          unoptimized // ⚠️ important for GIF animation
        />
        <h2 className="text-white">Payment Successful</h2>
        <p className="text-mygray-500">Thank you for your purchase!</p>
      </div>
    </CustomDialog>
  );
}
