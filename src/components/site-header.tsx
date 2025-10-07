import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PanelLeftIcon, PanelLeftCloseIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeSelector } from "./theme-selector";
import { ModeSwitcher } from "./mode-switcher";

export function SiteHeader() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" ? (
            <PanelLeftCloseIcon className="size-4" />
          ) : (
            <PanelLeftIcon className="size-4" />
          )}
        </Button>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSelector />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}