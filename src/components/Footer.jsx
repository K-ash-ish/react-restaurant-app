function Footer() {
  return (
    <footer className="border-t-2   py-4 w-full flex  justify-around items-center">
      <div className="social-links ">
        <a href="#" className="px-2">
          Github
        </a>
        <a href="#" className="px-2">
          Linked
        </a>
        <a href="#" className="px-2">
          Twitter
        </a>
      </div>
      <p>
        Made with ❤️ by <span className="underline font-semibold">Kashish</span>{" "}
      </p>
    </footer>
  );
}

export default Footer;
