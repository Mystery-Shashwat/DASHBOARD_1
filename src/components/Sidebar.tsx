import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart4,
  Users,
  Wallet,
  Clock,
  Settings,
  MessageSquare,
  Bell,
  FileText,
  PieChart,
  type LucideIcon,
} from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  title: string;
  isActive?: boolean;
  to?: string;
}

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarGroupProps {
  icon: LucideIcon;
  title: string;
  items: Array<{ name: string; path: string }>;
  openAccordion: string | null;
  setOpenAccordion: (title: string | null) => void;
}

const NavItem = ({ icon: Icon, title, isActive, to }: NavItemProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 text-sidebar-foreground hover:bg-[var(--bg-sidebar)] hover:text-white transition-all duration-200",
        isActive && "bg-[var(--bg-sidebar)] text-white"
      )}
      onClick={() => to && navigate(to)}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Button>
  );
};

const SidebarGroup = ({
  icon: Icon,
  title,
  items,
  openAccordion,
  setOpenAccordion,
}: SidebarGroupProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger
        className={cn(
          "py-2 text-sidebar-foreground hover:bg-[var(--bg-sidebar)] hover:text-white rounded-lg px-2",
          "transition-all duration-200"
        )}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent
        className={cn(
          "pl-6 pt-1 transition-all duration-300 ease-in-out",
          openAccordion === title
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "justify-start text-sidebar-foreground hover:bg-[var(--bg-sidebar)] hover:text-white",
                "transition-all duration-200",
                location.pathname === item.path &&
                  "bg-[var(--bg-sidebar)] text-white"
              )}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export function Sidebar({ isOpen }: SidebarProps) {
  if (!isOpen) return null;

  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("user");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const transactionItems = [
    { name: "Recent", path: "/transactions/recent" },
    { name: "Reports", path: "/transactions/reports" },
  ];

  const clientItems = [
    { name: "All Merchants", path: "/clients/all" },
    { name: "Add Merchant", path: "/clients/form" },
  ];

  const baseNavItems = [
    {
      icon: BarChart4,
      title: "Dashboard",
      path: "/dashboard",
      roles: ["user", "admin"],
    // },
    // {
    //   icon: PieChart,
    //   title: "Analytics",
    //   path: "/analytics",
    //   roles: ["user", "admin"],
    },
     
    { icon: Clock, title: "History", path: "/history", roles: ["admin"] },
    {
      icon: MessageSquare,
      title: userRole === "admin" ? "All Tickets" : "Tickets",
      path: "/tickets",
      roles: ["user", "admin"],
    },
    {
      icon: Bell,
      title: "Notifications",
      path: "/notifications",
      roles: ["user", "admin"],
    },
    {
      icon: FileText,
      title: userRole === "admin" ? "Doc Verification" : "Documents",
      path: userRole === "admin" ? "/doc-verification" : "/documents",
      roles: ["user", "admin"],
    },
    {
      icon: Settings,
      title: "Settings",
      path: userRole === "admin" ? "/setting" : "/settings",
      roles: ["user", "admin"],
    },
  ];

  const filteredNavItems = baseNavItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <NavItem
            icon={BarChart4}
            title="Dashboard"
            isActive={location.pathname === "/dashboard"}
            to="/dashboard"
          />

          {userRole === "admin" && (
            <Accordion type="single" collapsible className="space-y-2">
              <SidebarGroup
                icon={Users}
                title="Clients"
                items={clientItems}
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
              />
              <SidebarGroup
                icon={Wallet}
                title="Transactions"
                items={transactionItems}
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
              />
            </Accordion>
          )}

          {userRole === "user" && (
            <Accordion type="single" collapsible className="space-y-2">
              <SidebarGroup
                icon={Wallet}
                title="Transactions"
                items={transactionItems}
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
              />
            </Accordion>
          )}

          <div className="space-y-2 pt-2">
            {filteredNavItems.slice(1).map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                title={item.title}
                isActive={location.pathname === item.path}
                to={item.path}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
