import { Link } from "react-router-dom";

export default function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="flex justify-center text-sm">
      <div className="pr-2">{label}</div>
      <Link to={to} className="pointer underline cursor-pointer">
        {buttonText}
      </Link>
    </div>
  );
}
