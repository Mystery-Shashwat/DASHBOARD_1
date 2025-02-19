import React from "react";
import { DashboardIcon, LockClosedIcon, ReloadIcon, GearIcon } from "@radix-ui/react-icons";

const features = [
  {
    icon: <DashboardIcon className="w-10 h-10 mx-auto text-white" />,
    title: "Unified Dashboard",
    description: "Manage multiple escrow accounts from one place.",
  },
  {
    icon: <LockClosedIcon className="w-10 h-10 mx-auto text-white" />,
    title: "Secure Transactions",
    description: "Multi-Factor Authentication (MFA) enabled for enhanced security.",
  },
  {
    icon: <ReloadIcon className="w-10 h-10 mx-auto text-white" />,
    title: "Real-Time Balance",
    description: "Stay updated on your account balance instantly.",
  },
  {
    icon: <GearIcon className="w-10 h-10 mx-auto text-white" />,
    title: "Customizable Workflow",
    description: "Split payments and automate your workflow seamlessly.",
  },
];

const SidePart: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-backgroundprimary to-backgroundsecondary flex flex-col justify-center items-center gap-8 px-8 py-12">
      {features.map((feature, index) => (
        <div key={index} className="text-center space-y-2">
          {feature.icon}
          <h1 className="text-2xl font-extrabold text-white">{feature.title}</h1>
          <p className="text-base font-medium text-gray-200">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SidePart;
