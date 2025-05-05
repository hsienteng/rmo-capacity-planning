import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import CapacityPlanning from "./components/CapacityPlanning";
import Header from "./components/Header";
import { useCapacity } from "./context/CapacityContext";

function App() {
  const { toggleSidebar } = useCapacity();

  return (
    <div
      className="min-h-screen flex flex-column"
      style={{ backgroundColor: "var(--gray-100)" }}
    >
      {/* Header */}
      <Header />

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