import { motion } from "framer-motion";

const approvers = [
  { role: "Employee", img: "/employee.jpg", active: true },
  { role: "Team Lead", img: "/teamlead.jpg", active: true },
  { role: "Project Lead", img: "/projectlead.jpg", active: false },
  { role: "HR", img: "/hr.jpg", active: false },
  { role: "CEO", img: "/ceo.jpg", active: false },
];

export default function LeaveApprovalFlow() {
  return (
    <div className="flex flex-col items-center space-y-10">
      {/* Flow Path */}
      <div className="flex justify-between w-full max-w-4xl relative">
        <svg className="absolute top-8 left-0 w-full h-32" fill="none">
          <path
            d="M 40 40 C 100 120, 200 0, 300 80 S 500 40, 600 100"
            strokeDasharray="6 6"
            className="stroke-gray-300"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>

        {approvers.map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-2 relative">
            <motion.div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-md 
                ${item.active ? "border-green-500 ring-2 ring-green-400" : "border-gray-300"}`}
              whileHover={{ scale: 1.1 }}
            >
              <img src={item.img} alt={item.role} className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-sm text-gray-700 font-medium">{item.role}</span>
          </div>
        ))}
      </div>

      {/* Instruction */}
      <p className="text-gray-500 text-sm">Check Details, Then Approve or Reject</p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md">
          Reject Leave
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md">
          Approve Leave
        </button>
      </div>
    </div>
  );
}
