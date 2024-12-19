import React from "react";

const ResultContainerLayout: React.FC<ResultMeasurement> = ({ title, image, row, rack }) => {
  return (
    <div className="flex items-center gap-12 p-6">
      <img
        src={image}
        alt="Shirt"
        className="w-48 h-48 object-contain"
      />
      <div className="flex flex-col gap-2">
        {
          row && rack ? (
            <>
              <p className="text-[32px] font-bold mb-2">{title}</p>
              <p className="text-2xl">Row: <span className="font-semibold">{row}</span></p>
              <p className="text-2xl">Rack: <span className="font-semibold">{rack}</span></p>
            </>
          ) : (
            <p className="text-[32px] font-bold">No match found</p>
          )
        }
      </div>
    </div>
  );
};

export default ResultContainerLayout;
