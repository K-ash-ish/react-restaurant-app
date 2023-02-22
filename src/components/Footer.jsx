function Footer() {
  // need to change button to link
  return (
    <footer className="border-t-2   py-4 w-full flex  justify-around items-center">
      <div className="social-links ">
        <button href="#" className="px-2">
          Github
        </button>
        <button href="#" className="px-2">
          Linked
        </button>
        <button href="#" className="px-2">
          Twitter
        </button>
      </div>
      <p>
        Made with ❤️ by <span className="underline font-semibold">Kashish</span>{" "}
      </p>
    </footer>
  );
}

export default Footer;
