import { ReactNode } from "react"
import { AppSidebar } from "./App-Sidebar"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"

export const Provider = ({children}:{children:ReactNode}) => {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <main>
            <SidebarTrigger/>
            {children}
        </main>
    </SidebarProvider>
  )
}
