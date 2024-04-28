export default function InputBox(props) {
  return (
    <div className="m-2">
      <div className="text-left text-sm pt-2 pb-2">{props.label}</div>
      <input
        onChange={props.onChange}
        className="border-2 w-full rounded-md outline-none p-1"
        placeholder={props.placeholder}
      ></input>
    </div>
  );
}
