import { Home, Search, PlusCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // for navigation after logout

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add book",
    url: "/addbook",
    icon: PlusCircle,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token"); 
    alert("You have logged out successfully");
    navigate("/login"); 
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  
                    {item.title === "Logout" ? (
                      <button onClick={handleLogout} className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-200">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a href={item.url} className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-200">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
