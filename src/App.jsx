import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import CapacityPlanning from "./components/CapacityPlanning";
import { useCapacity } from "./context/CapacityContext";

function App() {
  const { toggleSidebar } = useCapacity();

  return (
    <div
      className="min-h-screen flex flex-column"
      style={{ backgroundColor: "var(--gray-100)" }}
    >
      {/* Header */}
      {/* <header className="app-header shadow-1">
        <div className="flex align-items-center">
          <button
            className="sidebar-toggle md:hidden p-2"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="pi pi-bars"></i>
          </button>
          <div className="app-logo ml-2">
            <img
              src="/src/assets/logo.svg"
              alt="RMO Logo"
              className="app-logo-image"
            />
            <span>Capacity Planning</span>
          </div>
        </div>

        <div className="flex align-items-center gap-3">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <input className="p-inputtext p-component" placeholder="Search" />
          </span>
          <Button
            icon="pi pi-bell"
            className="p-button-rounded p-button-text p-button-plain"
            badge="3"
            badgeClassName="p-badge-danger"
          />
          <Avatar
            icon="pi pi-user"
            shape="circle"
            size="normal"
            style={{
              backgroundColor: "var(--primary-light)",
              color: "var(--primary-color)",
            }}
          />
        </div>
      </header> */}

      {/* Main content */}
      <div className="main-container">
        {/* <Toolbar
          start={
            <h2 className="text-xl font-semibold m-0">Capacity Planning</h2>
          }
          end={
            <div className="flex gap-3">
              <Button
                label="Revert"
                icon="pi pi-undo"
                className="p-button-outlined"
              />
              <Button label="Submit" icon="pi pi-check" />
            </div>
          }
          className="mb-4"
        /> */}

        <CapacityPlanning />
      </div>
    </div>
  );
}

export default App;