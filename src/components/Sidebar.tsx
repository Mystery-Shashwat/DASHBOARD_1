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
  IndianRupee,
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
}

const NavItem = ({ icon: Icon, title, isActive, to }: NavItemProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2", isActive && "bg-muted")}
      onClick={() => to && navigate(to)}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Button>
  );
};
const SidebarGroup = ({ icon: Icon, title, items }: SidebarGroupProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger className="py-2 hover:bg-muted hover:text-black rounded-lg px-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-6 pt-1">
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "justify-start",
                location.pathname === item.path && "bg-muted"
              )}
              className="justify-start"
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
  const navigate = useNavigate();

  const transactionItems = [
    { name: "Recent", path: "/transactions/recent" },
    { name: "Pending", path: "/transactions/pending" },
    { name: "Reports", path: "/transactions/reports" },
  ];

  const clientItems = [
    { name: "All Clients", path: "/clients/all" },
    { name: "VIP Accounts", path: "/clients/vip" },
    { name: "Prospects", path: "/clients/prospects" },
  ];

  const productItems = [
    { name: "Investments", path: "/products/investments" },
    { name: "Loans", path: "/products/loans" },
    { name: "Insurance", path: "/products/insurance" },
  ];

  // Individual navigation items
  const navItems = [
    { icon: BarChart4, title: "Dashboard", path: "/dashboard" },
    { icon: PieChart, title: "Analytics", path: "/analytics" },
    { icon: Clock, title: "History", path: "/history" },
    { icon: MessageSquare, title: "Messages", path: "/messages" },
    { icon: Bell, title: "Notifications", path: "/notifications" },
    { icon: FileText, title: "Documents", path: "/documents" },
    { icon: Settings, title: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-backgroundsidebar p-4 text-white  ">
      <nav className="flex-1">
        <div className="mb-2 hover:text-black">
          <NavItem
            icon={BarChart4}
            title="Dashboard"
            isActive={location.pathname === "/dashboard"}
            to="/dashboard"
          ></NavItem>
        </div>

        <Accordion type="multiple" className="space-y-2">
          <SidebarGroup icon={Users} title="Clients" items={clientItems} />

          <SidebarGroup
            icon={Wallet}
            title="Transactions"
            items={transactionItems}
          />

          <SidebarGroup
            icon={IndianRupee}
            title="Products"
            items={productItems}
          />
        </Accordion>

        <div className="space-y-2 mt-2">
          {navItems.slice(1, -1).map((item) => (
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

      <div className="border-t pt-4">
        <NavItem
          icon={Settings}
          title="Settings"
          isActive={location.pathname === "/settings"}
          to="/settings"
        />
      </div>
    </div>
  );
}

export default Sidebar;
