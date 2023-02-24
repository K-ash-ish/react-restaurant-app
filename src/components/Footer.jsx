import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  // need to change button to link
  return (
    <footer className="border-t-2   py-4 w-full flex  justify-around items-center">
      <div className="social-links ">
        <a href="https://github.com/K-ash-ish" className="px-2">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://www.linkedin.com/in/kashish-sondhiya-969120198/"
          className="px-2"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://twitter.com/KashishSo" className="px-2">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
      <p>
        Made with ❤️ by <span className="underline font-semibold">Kashish</span>{" "}
      </p>
    </footer>
  );
}

export default Footer;
