import { useState, useEffect } from "react";
import {
  X,
  Send,
  CreditCard,
  Shield,
  HelpCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

type ChatFlow = {
  [key: string]: {
    message: string;
    options?: string[];
    input?: boolean;
    description?: string;
  };
};

type TicketData = {
  id: string;
  issue: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
};

const chatFlow: ChatFlow = {
  start: {
    message: "Welcome to FinSecure Support. How can we assist you today?",
    options: [
      "Payment Issue",
      "Account Security",
      "Transaction Help",
      "Service Upgrade",
      "View My Tickets",
    ],
    description: "Our team is ready to help with any financial matters.",
  },
  "Payment Issue": {
    message: "What type of payment issue are you experiencing?",
    options: [
      "Failed Transaction",
      "Recurring Payment",
      "Refund Status",
      "Payment Limit",
    ],
  },
  "Account Security": {
    message: "What security concern can we help with?",
    options: [
      "Suspicious Activity",
      "Multi-Factor Authentication",
      "Password Reset",
    ],
  },
  "Transaction Help": {
    message: "What transaction assistance do you need?",
    options: [
      "Transfer Delays",
      "International Payments",
      "Transaction History",
    ],
  },
  "Service Upgrade": {
    message: "Interested in upgrading your service?",
    options: ["Premium Features", "Business Account", "Investment Services"],
  },
  "View My Tickets": {
    message: "Here are your recent support tickets:",
    description: "You can view the status of all your open tickets below.",
  },
  "Failed Transaction": {
    message:
      "Please provide your transaction ID or the last 4 digits of your card.",
    input: true,
  },
  "Recurring Payment": {
    message: "Please provide your subscription ID or the service name.",
    input: true,
  },
  "Refund Status": {
    message: "Please enter your refund reference number.",
    input: true,
  },
  "Payment Limit": {
    message: "Please confirm your account number or username.",
    input: true,
  },
  "Suspicious Activity": {
    message: "Please provide your account username for verification.",
    input: true,
  },
  "Multi-Factor Authentication": {
    message: "Please enter your registered email address.",
    input: true,
  },
  "Password Reset": {
    message: "Please enter your registered email address.",
    input: true,
  },
  "Transfer Delays": {
    message: "Please provide your transfer reference number.",
    input: true,
  },
  "International Payments": {
    message: "Please provide the destination country and transfer ID.",
    input: true,
  },
  "Transaction History": {
    message: "Please confirm your account username.",
    input: true,
  },
  "Premium Features": {
    message: "Please enter your current account type.",
    input: true,
  },
  "Business Account": {
    message: "Please enter your business name.",
    input: true,
  },
  "Investment Services": {
    message: "Please enter your investment interests (stocks, bonds, etc).",
    input: true,
  },
};

// Sample ticket data
const sampleTickets: TicketData[] = [
  {
    id: "FIN-734291",
    issue: "Failed Transaction",
    status: "Open",
    createdAt: "2025-02-24 14:32:45",
  },
  {
    id: "FIN-652187",
    issue: "Password Reset",
    status: "In Progress",
    createdAt: "2025-02-23 09:15:22",
  },
  {
    id: "FIN-587423",
    issue: "Refund Status",
    status: "Resolved",
    createdAt: "2025-02-21 11:42:33",
  },
];

const SupportChatbot = ({ closeChat }: { closeChat: () => void }) => {
  const [chat, setChat] = useState<
    { role: string; text: string; description?: string }[]
  >([
    {
      role: "bot",
      text: chatFlow.start.message,
      description: chatFlow.start.description,
    },
  ]);
  const [currentStep, setCurrentStep] = useState("start");
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tickets, setTickets] = useState<TicketData[]>(sampleTickets);
  const [showTicketTable, setShowTicketTable] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "View My Tickets") {
      setShowTicketTable(true);
    } else {
      setShowTicketTable(false);
    }

    setChat([...chat, { role: "user", text: option }]);

    setIsTyping(true);

    // Simulate typing delay for a more natural feel
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: chatFlow[option].message,
          description: chatFlow[option].description,
        },
      ]);
      setCurrentStep(option);
      setIsTyping(false);
    }, 600);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const inputValue = userInput;
    setUserInput("");

    setChat([...chat, { role: "user", text: inputValue }]);

    setIsTyping(true);

    // Generate new ticket ID
    const newTicketId = `FIN-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create new ticket
    const newTicket: TicketData = {
      id: newTicketId,
      issue: currentStep,
      status: "Open",
      createdAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    };

    // Add ticket to state
    setTickets((prev) => [newTicket, ...prev]);

    // Simulate typing delay
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Thank you for providing your information. Your case has been assigned to a financial specialist who will contact you within 4 business hours. Your ticket ID is #${newTicketId}.`,
        },
      ]);
      setCurrentStep("end");
      setIsTyping(false);
    }, 1000);
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chat]);

  const getIconForOption = (option: string) => {
    if (
      option.includes("Payment") ||
      option.includes("Transaction") ||
      option.includes("Refund")
    ) {
      return <CreditCard className="w-4 h-4 mr-2" />;
    } else if (
      option.includes("Security") ||
      option.includes("Password") ||
      option.includes("Authentication")
    ) {
      return <Shield className="w-4 h-4 mr-2" />;
    } else if (
      option.includes("Upgrade") ||
      option.includes("Premium") ||
      option.includes("Business")
    ) {
      return <Clock className="w-4 h-4 mr-2" />;
    } else if (option.includes("View")) {
      return <ExternalLink className="w-4 h-4 mr-2" />;
    } else {
      return <HelpCircle className="w-4 h-4 mr-2" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="  fixed  bottom-5 chatbot-container right-5 w-96 bg-white shadow-lg border rounded-lg overflow-hidden z-50">
      {/* Header */}
      <div className="bg-textsecondary   text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-bold">FinSecure Support</h3>
        </div>
        <button
          onClick={closeChat}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div
        id="chat-container"
        className="h-80 overflow-y-auto p-3 bg-gray-50 chat-scrollBar"
        style={{ scrollBehavior: "smooth" }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 max-w-4/5 ${
              msg.role === "bot" ? "mr-auto" : "ml-auto"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.role === "bot"
                  ? "bg-gray-200"
                  : "bg-textsecondary text-white"
              }`}
            >
              {msg.text}
              {msg.description && (
                <div className="text-xs mt-1 text-gray-600">
                  {msg.description}
                </div>
              )}
            </div>
            <div
              className={`text-xs mt-1 ${
                msg.role === "bot"
                  ? "text-gray-500"
                  : "text-gray-500 text-right"
              }`}
            >
              {msg.role === "bot" ? "FinSecure Support" : "You"} •{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}

        {/* Token Table */}
        {showTicketTable && (
          <div className="my-4 bg-white rounded-lg border  overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ticket ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Issue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textsecondary">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.issue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isTyping && (
          <div className="flex items-center mb-3">
            <div className="bg-gray-200 px-3 py-2 rounded-full">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
            <div className="text-xs ml-2 text-gray-500">
              FinSecure is typing...
            </div>
          </div>
        )}
      </div>

      {/* Options Buttons */}
      {chatFlow[currentStep]?.options && (
        <div className="p-3 bg-white border-t">
          <div className="flex flex-col gap-2">
            {chatFlow[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="flex items-center bg-textsecondary text-white px-3 py-2 rounded"
              >
                {getIconForOption(option)}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      {chatFlow[currentStep]?.input && (
        <form
          onSubmit={handleInputSubmit}
          className="p-3 bg-white border-t flex items-center"
        >
          <input
            type="text"
            placeholder="Type your response here..."
            className="border p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-textsecondary focus:border-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-textsecondary text-white px-4 py-2 ml-2 rounded hover:bg-opacity-90 focus:outline-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* End State */}
      {currentStep === "end" && (
        <div className="p-3 bg-white border-t">
          <button
            onClick={() => {
              setChat([
                {
                  role: "bot",
                  text: chatFlow.start.message,
                  description: chatFlow.start.description,
                },
              ]);
              setCurrentStep("start");
              setShowTicketTable(false);
            }}
            className="w-full bg-textsecondary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Start New Conversation
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportChatbot;
