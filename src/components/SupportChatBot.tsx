import { useState } from "react";
import { X } from "lucide-react";
const chatFlow = {
  start: {
    message: "Hello! How can we help you?",
    options: ["Billing Issue", "Technical Issue"],
  },
  "Billing Issue": {
    message: "Please select a specific issue:",
    options: ["Payment Failed", "Subscription Cancellation"],
  },
  "Technical Issue": {
    message: "What issue are you facing?",
    options: ["Login Problem", "Feature Not Working"],
  },
  "Payment Failed": { message: "Please enter your name.", input: true },
  "Subscription Cancellation": {
    message: "Please enter your name.",
    input: true,
  },
  "Login Problem": { message: "Please enter your name.", input: true },
  "Feature Not Working": { message: "Please enter your name.", input: true },
};

const SupportChatbot = ({ closeChat }: { closeChat: () => void }) => {
  const [chat, setChat] = useState([
    { role: "bot", text: chatFlow.start.message },
  ]);
  const [currentStep, setCurrentStep] = useState("start");
  const [userName, setUserName] = useState("");

  const handleOptionClick = (option: string) => {
    setChat([
      ...chat,
      { role: "user", text: option },
      { role: "bot", text: chatFlow[option].message },
    ]);
    setCurrentStep(option);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === "") return;

    setChat([
      ...chat,
      { role: "user", text: userName },
      {
        role: "bot",
        text: `Ticket raised for ${userName}! Support will contact you within 24 hours.`,
      },
    ]);
    setCurrentStep("end");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg border rounded-lg p-4 z-50 ">
      {/* Close Button */}
      <button
        onClick={closeChat}
        className="absolute top-2 right-2 text-xl font-bold text-textsecondary hover:text-textsecondary"
      >
        <X />
      </button>

      <h3 className="text-lg font-bold text-center">Support Chat</h3>
      <div className="h-64 overflow-y-auto p-2 chat-scrollBar">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`my-1 p-2 rounded ${
              msg.role === "bot"
                ? "bg-gray-200"
                : "bg-textsecondary text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {chatFlow[currentStep]?.options && (
        <div className="flex flex-col gap-2">
          {chatFlow[currentStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="bg-textsecondary text-white px-3 py-1 rounded"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {chatFlow[currentStep]?.input && (
        <form onSubmit={handleNameSubmit} className="mt-2 flex">
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-1 flex-grow"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-textsecondary text-white px-3 py-1 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SupportChatbot;
