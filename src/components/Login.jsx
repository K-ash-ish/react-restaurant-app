import foodImg from "../login-food-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

function Login() {
  return (
    <div className="login-container w-11/12 border-2  flex flex-col md:flex-row md:justify-around items-center justify-center my-0 mx-auto ">
      <div className="left-container md:w-1/3 hidden md:flex md:justify-center">
        <img className=" rounded-lg object-contain" src={foodImg} alt="" />
      </div>
      <div className="right-container md:w-1/3 w-11/12 flex flex-col items-center justify-evenly ">
        <h1 className=" text-xl">
          {" "}
          Treat Yourself With Tasty Food{" "}
          <FontAwesomeIcon
            className="md:hidden text-orange-500 ml-1 "
            icon={faUtensils}
          />
        </h1>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log("form submitted");
          }}
          className="login-form   flex flex-col justify-center items-center h-1/2  "
        >
          <label htmlFor="phone-number ">
            <input
              type="text"
              className="w-60 h-14  border-2  focus:outline-gray-300 px-2 text-sm"
              id="phone-number"
              placeholder="Phone Number"
              required
            />
          </label>
          <div className="flex flex-col justify-start items-baseline w-full">
            <input
              type="submit"
              className="border-2 border-red-300 w-20 h-10 my-6 cursor-pointer hover:text-white hover:bg-red-500 hover:border-none transition-colors ease-in duration-300 "
              value="Login"
            />
            <button className="create-acc text-sm ">Create an Account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
