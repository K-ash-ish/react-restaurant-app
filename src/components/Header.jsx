import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex flex-col md:flex-row md:justify-around w-full items-center justify-around my-2 py-1 border-b-2 h-28">
      {" "}
      <h1 className="text-3xl tracking-wider font-bold">
        Eat<span className="text-rose-500 tracking-wider">Treat</span>
      </h1>
      <ul className="flex flex-row justify-around items-center text-lg  w-full md:w-1/3 h-14 ">
        <Link to="/">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/cart">
          <li className="nav-item ">
            Cart <span className="text-lg font-bold">{}</span>
          </li>
        </Link>
        <Link to="/login">
          <li className="nav-item ">Login</li>
        </Link>
      </ul>
    </nav>
  );
}
export default Header;
