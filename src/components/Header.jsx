import React from "react";
import { Button } from "primereact/button";
import temusLogo from "../assets/temus-logo.png";

const Header = () => {
  return (
    <div className="temus-header">
      <div className="header-content">
        <div className="header-brand">
          <img src={temusLogo} alt="Temus Logo" className="header-logo" />
        </div>
        <div className="header-actions">
          <Button
            icon="pi pi-bell"
            className="p-button-rounded p-button-text p-button-plain header-icon-button"
            aria-label="Notifications"
          />
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-text p-button-plain header-icon-button"
            aria-label="User account"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
