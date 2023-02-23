function Login() {
  return (
    <div className="login-container border-2 border-red-500 w-11/12 flex flex-col items-center  my-0 mx-auto ">
      <div className="left-container  border-2 h-1/2 w-10/12">
        Login and Treat Yourself with Tasty Food
      </div>
      <div className="right-container h-1/2 w-10/12 ">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log("form submitted");
          }}
          className="login-form flex flex-col items-center border-2 border-red-400 h-full  "
        >
          <label htmlFor="phone-number w-full">
            <input
              type="text"
              className="border-2 w-full h-16"
              id="phone-number"
              placeholder="Phone Number"
            />
          </label>
          <input type="submit" className="border-2" value="Login" />
        </form>
      </div>
    </div>
  );
}
export default Login;
