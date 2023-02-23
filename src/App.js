import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  return (
    <div className=" flex flex-col justify-between min-h-screen md:min-h-screen">
      <Header />
      <Login />
      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default App;
