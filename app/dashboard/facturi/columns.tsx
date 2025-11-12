import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlanyviteInvoice } from "@/core/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<PlanyviteInvoice>[] = [
  {
    accessorKey: "customerName",
    header: "Nume",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Numar Factură",
  },
  {
    accessorKey: "amount",
    header: "Suma",
  },
  {
    accessorKey: "collected",
    header: "Status",
    cell: ({ row }) => {
      const invoice = row.original;
      if (invoice.stornoed === "1") {
        return "Anulată";
      }

      if (invoice.storno === "1") {
        return "Restituită";
      }
      if (invoice.collected === "1") {
        return "Platită";
      } else {
        return "Neplătită";
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoiceLink = row.original.invoiceLink;

      return (
        <Button
          variant="ghost"
          onClick={() => window.open(invoiceLink, "_blank")}
        >
          <Eye />
        </Button>
      );
    },
  },
];
