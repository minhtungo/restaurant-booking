import { type FC } from "react";
import { ImSpinner2 } from "react-icons/im";

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = ({}) => {
  return <ImSpinner2 className="h-12 w-12 animate-spin text-blue-500" />;
};

export default Spinner;
