"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { FormPurchase } from "./purchase-dialog"
import { getDefaults } from "@/api/purchase/request/request.api"
import type { RequestDefault } from "@/api/purchase/request/types"

const data: Purchase[] = [
  {
    id: "m5gr84i9",
    data: "2024-06-01",
    status: "Sim",
    situacao: "Aberta",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    data: "2024-06-02",
    status: "Sim",
    situacao: "Fechada",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    data: "2024-06-03",
    status: "Não",
    situacao: "Incompleta",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    data: "2024-06-04",
    status: "Sim",
    situacao: "Com ordem",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    data: "2024-06-05",
    status: "Não",
    situacao: "Aberta",
    email: "carmella@example.com",
  },
]

export type Purchase = {
  id: string
  data: string
  status: "Sim" | "Não"
  situacao: "Aberta" | "Incompleta" | "Fechada" | "Com ordem"
  email: string
}

export const columns: ColumnDef<Purchase>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Número",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "email",
    header: "Estabelecimento",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      return <div>{row.getValue("data")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Aprovado(a)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "situacao",
    header: "Situação",
    cell: ({ row }) => (
      <div>{row.getValue("situacao")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ação</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Adicionar Item</DropdownMenuItem>
            <DropdownMenuItem>Copiar Itens</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function TablePagination({
  pageIndex,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
}: {
  pageIndex: number
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  onPreviousPage: () => void
  onNextPage: () => void
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPreviousPage}
            aria-disabled={!canPreviousPage}
            tabIndex={canPreviousPage ? 0 : -1}
            style={{
              pointerEvents: canPreviousPage ? "auto" : "none",
              opacity: canPreviousPage ? 1 : 0.5,
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{pageIndex + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={onNextPage}
            aria-disabled={!canNextPage}
            tabIndex={canNextPage ? 0 : -1}
            style={{
              pointerEvents: canNextPage ? "auto" : "none",
              opacity: canNextPage ? 1 : 0.5,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function DataTablePurchase() {
  const [showDialog, setShowDialog] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [formData, setFormData] = React.useState<RequestDefault | null>(null)
  const [loading, setLoading] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  async function handleNewRequest() {
    setLoading(true)
    try {
      // Troque usuario/senha conforme necessário
      const res = await getDefaults("super", "super")
      const req = res.data.ttRequestDefault[0]
      setFormData(req)
      setShowDialog(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Nova Requisição</DialogTitle>
          <FormPurchase
            data={formData}
            loading={loading}
            onCancel={() => setShowDialog(false)}
          />
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-start mb-2 mt-4">
        <Button onClick={handleNewRequest} disabled={loading}>
          + Nova Requisição
        </Button>
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="estoque">
          <TabsList>
            <TabsTrigger value="estoque">Estoque</TabsTrigger>
            <TabsTrigger value="compra">Compra</TabsTrigger>
            <TabsTrigger value="cotacao">Cotação</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Procurar..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <TablePagination
          pageIndex={pagination.pageIndex}
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPreviousPage={() => table.setPageIndex(pagination.pageIndex - 1)}
          onNextPage={() => table.setPageIndex(pagination.pageIndex + 1)}
        />
      </div>
    </div>
  )
}
