"use client"

import * as React from "react"
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconFileInvoice,
  IconFileText,
  IconHelp,
  IconInnerShadowLeftFilled,
  IconSettings,
  IconCertificate,
  IconFileSearch,
  IconShoppingCart,
  IconCash,      
} from "@tabler/icons-react"
import Link from "next/link";

import { NavMain } from "@/components/nav-main"
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SearchForm } from "./search-form";


const data = {
  user: {
    name: "maax",
    email: "maax@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Compras",
      url: "#",
      icon: IconShoppingCart,
      items: [
        { title: "Solicitações de Compras", url: "/solicitacao-de-compras" }, 
        { title: "Cotações", url: "#" },
        { title: "Ordens de Compra", url: "#" },
        { title: "Pedidos de Compra", url: "#" },
        { title: "Recebimentos", url: "#" },
        { title: "Contratos de Parceria", url: "#" },
        { title: "Aprovações Logísticas", url: "#" },
      ],
    },
    {
      title: "Vendas",
      url: "#",
      icon: IconCash,
       items: [
        { title: "Pedidos de Venda", url: "#" },
        { title: "Faturamento", url: "#" },
        { title: "Nota Fiscal de Saída", url: "#" },
        { title: "Gestão de Entregas", url: "#" },
        { title: "Fidelização de Clientes", url: "#" },
        { title: "Vendas Assistidas", url: "#" },
      ],
    },
  ],
  navClouds: [
    {
      title: "Captura",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Propostas Ativas",
          url: "#",
        },
        {
          title: "Arquivadas",
          url: "#",
        },
      ],
    },
    {
      title: "Proposta",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Propostas Ativas",
          url: "#",
        },
        {
          title: "Arquivadas",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Propostas Ativas",
          url: "#",
        },
        {
          title: "Arquivadas",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Notas Fiscais (Entrada/Saída)",
      url: "#",
      icon: IconFileInvoice,
    },
    {
      name: "Contratos de Fornecimento",
      url: "#",
      icon: IconFileDescription,
    },
    {
      name: "Propostas Comerciais",
      url: "#",
      icon: IconFileText,
    },
    {
      name: "Documentos de Aprovação",
      url: "#",
      icon: IconCertificate,
    },
    {
      name: "Arquivos de Auditoria",
      url: "#",
      icon: IconFileSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowLeftFilled className="!size-5" />
                <span className="text-base font-semibold">Maax Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm className="mt-2"/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}