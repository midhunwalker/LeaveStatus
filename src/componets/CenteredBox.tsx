import React from "react";
import LeaveApprovalFlow from "./LeaveApprovalFlow";

const CenteredBox: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6E6E6]">
      <div
        className="bg-[#FCFCFC] shadow-[0_0_2px_0_rgba(0,0,0,0.25)] rounded-[10px]"
        style={{
          width: "49.1vw",
          height: "60.2vh",
          opacity: 1,
          transform: "rotate(0deg)",
        }}
      >
        <h2 className=" absolute top-10 left-10
            font-poppins font-medium
            text-xl text-[#4D4D4D] sm:text-xl md:text-2xl
            leading-[16px]
            tracking-[8%]
            opacity-100">
          Leave Status
        </h2>

        <div
          className="absolute top-[81px] left-[40px] opacity-100"
          style={{
            width: "44.95vw",
            borderTop: "1px solid #43C8FF",
          }}
        ></div>

        <div
          className="absolute opacity-100 border-1"
          style={{
            width: "43.3vw",
            height: "43.9vh",
            top: "134px",
            left: "61px",
            transform: "rotate(0deg)",
          }}
        >
          <LeaveApprovalFlow/>
        </div>

        


        
      </div>
    </div>
  );
};

export default CenteredBox;
