import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

// import Recent from "@/pages/Recent";
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
  DollarSign,
  PieChart,
  type LucideIcon,
  IndianRupee,
} from "lucide-react";

interface NavItemProps {
  icon: LucideIcon
  title: string
  isActive?: boolean
  to?:string
}
interface SidebarProps {
  isOpen: boolean;
}

const NavItem = ({ icon: Icon, title, isActive, to }: NavItemProps) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-2",
      isActive && "bg-muted"
    )}
  >
    <Icon className="h-4 w-4" />
    <span>{title}</span>
  </Button>
)

interface SidebarGroupProps {
  icon: LucideIcon
  title: string
  items: Array<{ name: string; path: string }> 
}

const SidebarGroup = ({ icon: Icon, title, items }: SidebarGroupProps) => {
  const navigate = useNavigate();
  

  return (
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger className="py-2 hover:bg-muted rounded-lg px-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-6 pt-1">
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <Button key={item.path} variant="ghost" className="justify-start" onClick={() => navigate(item.path)}>
              {item.name}
            </Button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function Sidebar({ isOpen }: SidebarProps) {
  if (!isOpen) return null;
  const location = useLocation();

  const transactionItems = [
    { name: "Recent", path: "/transactions/recent" },
    { name: "Pending", path: "/transactions/pending" },
    { name: "Reports", path: "/transactions/reports" }
  ];

  const clientItems = [
    { name: "All Clients", path: "/clients/all" },
    { name: "VIP Accounts", path: "/clients/vip" },
    { name: "Prospects", path: "/clients/prospects" }
  ];

  const productItems = [
    { name: "Investments", path: "/products/investments" },
    { name: "Loans", path: "/products/loans" },
    { name: "Insurance", path: "/products/insurance" }
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background p-4">
      <nav className="flex-1">
        <div className="mb-2">
          <NavItem 
            icon={BarChart4} 
            title="Dashboard" 
            isActive={location.pathname === '/home'}
            to="/home"
          />
        </div>

        <Accordion type="multiple" className="space-y-2">
          <SidebarGroup
            icon={Users}
            title="Clients"
            items={clientItems}
          />
          
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
          <NavItem icon={PieChart} title="Analytics" to="/analytics" />
          <NavItem icon={Clock} title="History" to="/history" />
          <NavItem icon={MessageSquare} title="Messages" to="/messages" />
          <NavItem icon={Bell} title="Notifications" to="/notifications" />
          <NavItem icon={FileText} title="Documents" to="/documents" />
        </div>
      </nav>

      <div className="border-t pt-4">
        <NavItem icon={Settings} title="Settings" to="/settings" />
      </div>
    </div>
  );
}

export default Sidebar