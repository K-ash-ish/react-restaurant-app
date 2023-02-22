import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex flex-row w-full items-center justify-around my-4">
      {" "}
      <h1 className="text-3xl font-bold">
        Eat<span className="text-rose-500 tracking-wider">Treat</span>
      </h1>
      <ul className="flex flex-row text-xl">
        {/* <Link></Link> */}
        <li className="px-2">Home</li>
        {/* <Link></Link> */}
        <li className="px-2 ">
          Cart <span className="text-lg font-bold">{}</span>
        </li>
        {/* <Link></Link> */}
        <li className="px-2 ">Login</li>
      </ul>
    </nav>
  );
}
export default Header;
