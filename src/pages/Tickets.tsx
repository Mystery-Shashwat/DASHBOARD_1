import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the Ticket interface (replace 'any' with proper types)
interface Ticket {
  id: string;
  issue: string;
  status?: string; // Optional since it was misspelled as 'staus' in your original
  createdAt: string;
}

interface RootState {
  ticket: Ticket[];
}

const Tickets = () => {
  const totalTickets = useSelector((state: RootState) => state.ticket);

  if (totalTickets.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-2xl px-5 w-3/4 mx-auto mt-10">
        <h1 className="text-center text-2xl pt-5 mb-8 font-medium">
          All Tickets
        </h1>
        <div className="text-center text-gray-500 text-lg py-10">
          No Tickets Available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl px-5 w-3/4 mx-auto mt-10">
      <h1 className="text-center text-2xl pt-5 mb-8 font-medium">
        All Tickets
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticket ID</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.issue}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tickets;
