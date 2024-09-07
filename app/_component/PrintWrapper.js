"use client";
import React from "react";
import { useReactToPrint } from "react-to-print";
import PrintButton from "../(dashboard)/cashbook/_component/PrintButton";

export default function PrintWrapper({ children }) {
  const printRef = React.useRef();
  const print = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <div>
      <PrintButton print={print} />
      <div className="p-4" ref={printRef}>
        {children}
      </div>
    </div>
  );
}
