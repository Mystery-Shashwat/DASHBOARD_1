import * as React from "react";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  title: string;
  isActive?: boolean;
}

const NavItem = ({ icon: Icon, title, isActive }: NavItemProps) => (
  <Button
    variant="ghost"
    className={cn("w-full justify-start gap-2", isActive && "bg-muted")}
  >
    <Icon className="h-4 w-4" />
    <span>{title}</span>
  </Button>
);

interface SidebarGroupProps {
  icon: LucideIcon;
  title: string;
  items: string[];
}

const SidebarGroup = ({ icon: Icon, title, items }: SidebarGroupProps) => (
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
          <Button key={item} variant="ghost" className="justify-start">
            {item}
          </Button>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background p-4">
      {/* <div className="mb-8 px-2">
        <h1 className="text-xl font-bold">FinTech CRM</h1>
      </div> */}

      <nav className="flex-1">
        <div className="mb-2">
          <NavItem icon={BarChart4} title="Dashboard" isActive />
        </div>

        <Accordion type="multiple" className="space-y-2">
          <SidebarGroup
            icon={Users}
            title="Clients"
            items={["All Clients", "VIP Accounts", "Prospects"]}
          />

          <SidebarGroup
            icon={Wallet}
            title="Transactions"
            items={["Recent", "Pending", "Reports"]}
          />

          <SidebarGroup
            icon={DollarSign}
            title="Products"
            items={["Investments", "Loans", "Insurance"]}
          />
        </Accordion>

        <div className="space-y-2 mt-2">
          <NavItem icon={PieChart} title="Analytics" />
          <NavItem icon={Clock} title="History" />
          <NavItem icon={MessageSquare} title="Messages" />
          <NavItem icon={Bell} title="Notifications" />
          <NavItem icon={FileText} title="Documents" />
        </div>
      </nav>

      <div className="border-t pt-4">
        <NavItem icon={Settings} title="Settings" />
      </div>
    </div>
  );
}

export default Sidebar;
