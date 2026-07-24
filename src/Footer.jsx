import { profile } from "./data/portfolio";

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {profile.name}. Frontend Developer portfolio.</p>
    </footer>
  );
}

export default Footer;
