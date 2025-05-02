import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { useCapacity } from "../context/CapacityContext";

const CapacityTable = () => {
  const {
    resources,
    filteredMonths,
    viewMode,
    updateResourceAllocation,
  } = useCapacity();

  const [currentResource, setCurrentResource] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editValues, setEditValues] = useState([]);

  const op = React.useRef(null);

  // Prepare header row with months
  const dynamicColumns = filteredMonths.map((month) => (
    <Column
      key={month.id}
      field={`allocations.${month.id}.totalAllocation`}
      header={month.label}
      body={(rowData) => allocationCellTemplate(rowData, month.id)}
      style={{ width: "120px", textAlign: "center" }}
    />
  ));

  // Template for allocation cells
  const allocationCellTemplate = (rowData, monthId) => {
    const allocation = rowData.allocations[monthId];
    const allocationClass = allocation.allocationClass || "allocation-0";
    const allocationPercent = allocation.totalAllocation || 0;

    // Format the displayed value based on view mode
    let displayValue;
    switch (viewMode) {
      case "days":
        displayValue = ((allocationPercent / 100) * 20).toFixed(1); // Assuming 20 working days per month
        break;
      case "hours":
        displayValue = ((allocationPercent / 100) * 160).toFixed(0); // Assuming 160 working hours per month
        break;
      case "percentage":
      default:
        displayValue = `${allocationPercent}%`;
    }

    return (
      <div
        className={`allocation-cell ${allocationClass}`}
        onClick={(e) => showProjectAllocations(e, rowData, monthId)}
      >
        <Tooltip
          target={`.${allocationClass}`}
          mouseTrack
          mouseTrackLeft={10}
        >
          <div>
            <strong>{rowData.name}</strong>
            <br />
            Allocation: {allocationPercent}%
            <br />
            {viewMode === "days" && `${displayValue} days`}
            {viewMode === "hours" && `${displayValue} hours`}
          </div>
        </Tooltip>
        <span>{displayValue}</span>
      </div>
    );
  };

  // Show project allocations in overlay panel
  const showProjectAllocations = (event, resource, monthId) => {
    setCurrentResource(resource);
    setCurrentMonth(monthId);
    op.current.toggle(event);
  };

  // Open edit dialog
  const openEditDialog = () => {
    if (!currentResource || !currentMonth) return;

    const projectAllocations = currentResource.allocations[currentMonth].projectAllocations || [];
    
    // Initialize edit values with current allocations
    setEditValues([...projectAllocations]);
    setEditDialogVisible(true);
    op.current.hide();
  };

  // Save allocation changes
  const saveAllocationChanges = () => {
    if (!currentResource || !currentMonth) return;

    // Calculate total allocation
    const totalAllocation = editValues.reduce(
      (sum, item) => sum + (item.allocation || 0),
      0
    );

    // Update resource allocation
    updateResourceAllocation(
      currentResource.id,
      currentMonth,
      editValues,
      totalAllocation
    );

    setEditDialogVisible(false);
  };

  // Handler for allocation input change
  const handleAllocationChange = (index, value) => {
    const newValues = [...editValues];
    newValues[index] = { ...newValues[index], allocation: value || 0 };
    setEditValues(newValues);
  };

  // Project allocations panel content
  const projectAllocationsContent = () => {
    if (!currentResource || !currentMonth) return null;

    const allocations = currentResource.allocations[currentMonth];
    const projectAllocations = allocations.projectAllocations || [];
    const totalAllocation = allocations.totalAllocation || 0;

    return (
      <div className="project-allocations-panel">
        <h3>
          {currentResource.name} - {currentMonth.toUpperCase()}
        </h3>
        <div className="panel-content">
          {projectAllocations.length > 0 ? (
            <div>
              <div className="allocations-list">
                {projectAllocations.map((allocation, index) => (
                  <div className="allocation-item" key={index}>
                    <span className="project-name">
                      {allocation.projectName}:
                    </span>
                    <span className="allocation-value">
                      {allocation.allocation}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="allocation-total">
                <span className="total-label">Total:</span>
                <span className="total-value">{totalAllocation}%</span>
              </div>
            </div>
          ) : (
            <div className="no-allocations">No project allocations</div>
          )}
        </div>
        <div className="panel-footer">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            onClick={openEditDialog}
            className="p-button-sm"
          />
        </div>
      </div>
    );
  };

  // Footer for the edit dialog that shows total allocation
  const editDialogFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setEditDialogVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={saveAllocationChanges}
        autoFocus
      />
    </div>
  );

  // Calculate total allocation for the edit dialog
  const calculateTotalAllocation = () => {
    return editValues.reduce((sum, item) => sum + (item.allocation || 0), 0);
  };

  return (
    <div className="capacity-table">
      <DataTable
        value={resources}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        scrollHeight="flex"
        className="resource-table"
      >
        <Column
          field="name"
          header="Resource Name"
          frozen
          style={{ width: "200px", fontWeight: "bold" }}
        />
        <Column
          field="category"
          header="Role"
          frozen
          style={{ width: "200px" }}
        />
        {dynamicColumns}
      </DataTable>

      {/* Overlay panel for allocations */}
      <OverlayPanel ref={op} style={{ width: "300px" }}>
        {projectAllocationsContent()}
      </OverlayPanel>

      {/* Edit allocations dialog */}
      <Dialog
        header="Edit Allocations"
        visible={editDialogVisible}
        style={{ width: "400px" }}
        modal
        onHide={() => setEditDialogVisible(false)}
        footer={editDialogFooter}
      >
        <div className="edit-allocations-container">
          {editValues.map((project, index) => (
            <div className="edit-allocation-item" key={index}>
              <label htmlFor={`project-${index}`}>{project.projectName}:</label>
              <InputNumber
                id={`project-${index}`}
                value={project.allocation}
                onValueChange={(e) => handleAllocationChange(index, e.value)}
                suffix="%"
                min={0}
                max={100}
              />
            </div>
          ))}

          <div className="allocation-total edit-total">
            <span className="total-label">Total Allocation:</span>
            <span
              className={`total-value ${
                calculateTotalAllocation() > 100 ? "over-allocated" : ""
              }`}
            >
              {calculateTotalAllocation()}%
              {calculateTotalAllocation() > 100 && (
                <i
                  className="pi pi-exclamation-triangle ml-2"
                  title="Resource is over-allocated"
                ></i>
              )}
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CapacityTable;