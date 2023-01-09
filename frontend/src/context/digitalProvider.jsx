import React, { useMemo, useState } from "react";
import DigitalBankContext from "./digitalContext";

export default function DigitalBankProvider({ children }) {
  const [updateValue, setUpdateValue] = useState(false);

  const updatedValues = () => {
    setUpdateValue((prevState) => !prevState);
  };

  const contextValue = useMemo(() => ({
    updateValue,
    updatedValues,
  }), [
    updateValue,
  ]);

  return (
    <DigitalBankContext.Provider value={contextValue}>
      {children}
    </DigitalBankContext.Provider>
  );
}