import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 EDROH. All Rights Reserved.</p>
      <div className="footer__links">
        {["About", "Contact", "Privacy Policy", "Terms of Service"].map(
          (link) => (
            <Link scroll={false}
              key={link}
              href={`/${link.toLowerCase().replace(" ", "-")}`}
              className="footer__link"
            >
              {link}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Footer;
