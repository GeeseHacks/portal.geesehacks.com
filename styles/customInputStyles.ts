export const customInputStyles = {
  control: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    width: "100%",
    padding: "0.13rem",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "#6b7280" : "#6b7280",
    "&:hover": {
      borderColor: state.isFocused ? "#6b7280" : "#6b7280",
    },
    boxShadow: "none",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
    opacity: "90%",
  }),
};
