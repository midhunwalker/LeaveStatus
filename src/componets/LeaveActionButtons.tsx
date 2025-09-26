import React from "react";

interface LeaveActionButtonsProps {
  onApprove?: () => void;
  onReject?: () => void;
  className?: string;
}

const LeaveActionButtons: React.FC<LeaveActionButtonsProps> = ({
  onApprove,
  onReject,
  className,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-[1vw] ${className}`}
    >
        

      {/* Reject Button */}
      <button
        onClick={onReject}
        className="flex items-center justify-center text-white rounded-[5px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]"
        style={{
          width: "9vw",
          height: "3.98vh",
          background: "#F34040",
          opacity: 1,
        }}
      >
        Reject Leave
      </button>

      {/* Approve Button */}
      <button
        onClick={onApprove}
        className="flex items-center justify-center text-white rounded-[5px] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]"
        style={{
          width: "9vw",
          height: "3.98vh",
          background: "#28A745",
          opacity: 1,
        }}
      >
        Approve Leave
      </button>
    </div>
  );
};

export default LeaveActionButtons;
