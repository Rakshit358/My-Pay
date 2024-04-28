import Button from "./Button";
export default function Users({ name, onClick }) {
  return (
    <div className="shadow p-4 flex justify-between">
      <div className="flex flex-col justify-center">
        <div>{name}</div>
      </div>
      <div>
        <Button onClick={onClick} buttonName={"Send"} />
      </div>
    </div>
  );
}
