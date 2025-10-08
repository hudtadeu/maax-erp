"use client"

import { useState } from "react"
import { type Icon, IconChevronDown, IconChevronUp } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    items?: { title: string; url: string }[]
  }[]
}) {
  const [comprasOpen, setComprasOpen] = useState(false)
  const [vendasOpen, setVendasOpen] = useState(false)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items
            .filter((item) => item.title === "Dashboard")
            .map((item) => (
              <SidebarMenuItem key={item.title} className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip={item.title}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  aria-current="page"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <SidebarMenu>
          {items
            .filter((item) => item.title !== "Dashboard")
            .map((item) => {
              if (item.title === "Compras") {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => setComprasOpen((open) => !open)}
                      aria-expanded={comprasOpen}
                      aria-controls="compras-submenu"
                      className="flex items-center justify-between w-full"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                      </span>
                      <span className="ml-auto">
                        {comprasOpen ? (
                          <IconChevronUp className="size-4" />
                        ) : (
                          <IconChevronDown className="size-4" />
                        )}
                      </span>
                    </SidebarMenuButton>
                    {comprasOpen && item.items && (
                      <SidebarMenu 
                        className="mt-1"
                      >
                        {item.items.map((subitem) => (
                          <SidebarMenuItem key={subitem.title}>
                            <SidebarMenuButton
                              tooltip={subitem.title}
                              className="w-full justify-start text-sm pl-8"
                            >
                              <span>{subitem.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                )
              }
              if (item.title === "Vendas") {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => setVendasOpen((open) => !open)}
                      aria-expanded={vendasOpen}
                      aria-controls="vendas-submenu"
                      className="flex items-center justify-between w-full"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                      </span>
                      <span className="ml-auto">
                        {vendasOpen ? (
                          <IconChevronUp className="size-4" />
                        ) : (
                          <IconChevronDown className="size-4" />
                        )}
                      </span>
                    </SidebarMenuButton>
                    {vendasOpen && item.items && (
                      <SidebarMenu 
                        className="mt-1"
                      >
                        {item.items.map((subitem) => (
                          <SidebarMenuItem key={subitem.title}>
                            <SidebarMenuButton
                              tooltip={subitem.title}
                              className="w-full justify-start text-sm pl-8"
                            >
                              <span>{subitem.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                )
              }
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
