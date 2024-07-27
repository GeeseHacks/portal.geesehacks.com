// Used to wrap around InputField components in a form to create a two-column layout.
import React from "react";

interface ComplexInputWrapperProps {
  children: React.ReactNode;
}

const ComplexInputWrapper: React.FC<ComplexInputWrapperProps> = ({ children }) => (
  <div className="col-span-1 md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      {children}
    </div>
  </div>
);

export default ComplexInputWrapper;
