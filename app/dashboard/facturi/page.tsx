"use client";

import { useAuth } from "@/core/context/authContext";
import { PlanyviteInvoice } from "@/core/types";
import { listDocuments } from "@/lib/oblio/oblioApi";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<PlanyviteInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAuth().userDetails;

  const getInvoices = async () => {
    setLoading(true);
    try {
      const response = listDocuments("invoice", {
        "client[email]": user?.email || "",
      });
      const data = await response;
      const mapedInvoices = mapInvoicesToInternalFormat(data.data);
      setInvoices(mapedInvoices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
      setLoading(false);
    }
  };

  const mapInvoicesToInternalFormat = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoices: Record<string, any>[]
  ): PlanyviteInvoice[] => {
    return invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNumber: invoice.seriesName + invoice.number,
      customerName: invoice.client?.name || "",
      amount: Number(invoice.total) || 0,
      cancelled: invoice.cancelled || "",
      collected: invoice.collected || "",
      invoiceLink: invoice.link || "",
      stornoed: invoice.stornoed || "",
      storno: invoice.storno || "",
      issueDate: invoice.issueDate,
    }));
  };

  useEffect(() => {
    if (!user?.email) {
      return;
    }
    getInvoices();
  }, []);

  return (
    <div className="bg-[#F6F6F6] min-h-screen p-6">
      <div className="container min-h-[300px] my-4 mx-auto p-4 bg-white rounded-md shadow-sm relative">
        <h1 className="text-2xl font-bold mb-6">Facturi</h1>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <span className="loader"></span>
          </div>
        ) : (
          <DataTable columns={columns} data={invoices} />
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
