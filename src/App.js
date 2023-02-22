import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className=" flex flex-col justify-between min-h-screen md:min-h-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
