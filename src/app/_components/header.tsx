export function Header(props: { onClick: () => void }) {
  return (
    <h1
      className="text-2xl font-bold cursor-pointer flex"
      onClick={props.onClick}
    >
      PDF debugger
    </h1>
  );
}
