import foodImg from "../login-food-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { Link, useNavigate } from "react-router-dom";
function InputField(props) {
  const { type, placeholder, htmlFor, setAccountInfo } = props;
  return (
    <label className="my-1" htmlFor={htmlFor}>
      <input
        type={type}
        className="w-60 h-14  border-2  focus:outline-gray-300 px-2 text-sm"
        id={htmlFor}
        placeholder={placeholder}
        required
        onChange={(e) => {
          htmlFor === "user-name"
            ? setAccountInfo((prevValue) => ({
                ...prevValue,
                email: e.target.value,
              }))
            : setAccountInfo((prevValue) => ({
                ...prevValue,
                password: e.target.value,
              }));
        }}
      />
    </label>
  );
}

function AuthType({ value, handleClick, error }) {
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    password: "",
  });
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleClick(accountInfo);
      }}
      className="login-form   flex flex-col justify-center items-center h-1/2  "
    >
      <InputField
        setAccountInfo={setAccountInfo}
        htmlFor={"user-name"}
        type={"email"}
        placeholder="UserName"
      />
      <InputField
        setAccountInfo={setAccountInfo}
        htmlFor={"password"}
        type={"password"}
        placeholder="Password"
      />

      <div className="flex flex-col justify-start items-baseline w-full">
        <input
          type="submit"
          className="border-2 border-red-300 w-20 h-10 my-6 capitalize cursor-pointer hover:text-white hover:bg-red-500 hover:border-none transition-colors ease-in duration-300 "
          value={value}
        />
      </div>
    </form>
  );
}

function AuthForm() {
  const [isUserPresent, setIsUserPresent] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.user) {
      navigate("/");
    }
  }, [firebase?.user]);
  return (
    <div className="login-container w-11/12 md:border-2  flex flex-col md:flex-row md:justify-around items-center justify-center my-0 mx-auto ">
      <div className="left-container md:w-1/3 hidden md:flex md:justify-center">
        <img className=" rounded-lg object-contain" src={foodImg} alt="" />
      </div>
      <div className="right-container border-2 md:w-1/3 w-11/12 flex flex-col items-center justify-evenly ">
        <div>
          <p className=" text-xl">
            {" "}
            Treat Yourself With Tasty Food{" "}
            <FontAwesomeIcon
              className="md:hidden text-orange-500 ml-1 "
              icon={faUtensils}
            />
          </p>
          <button
            onClick={() => {
              setIsUserPresent(!isUserPresent);
            }}
            className=" text-sm my-1  capitalize"
          >
            {isUserPresent ? "Login" : "Create an account"} ?
          </button>
          {firebase.error ? (
            <p className="text-red-500 capitalize ml-4 mt-1">
              {firebase.error}
            </p>
          ) : null}
        </div>
        {!isUserPresent ? (
          <AuthType
            handleClick={({ email, password }) => {
              firebase.signIn(email, password);
            }}
            value="Login"
            error={firebase.error}
          />
        ) : (
          <AuthType
            handleClick={({ email, password }) => {
              firebase.signUp(email, password);
            }}
            value="Create"
            error={firebase.error}
          />
        )}
      </div>
    </div>
  );
}
export default AuthForm;
