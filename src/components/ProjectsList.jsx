import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useCapacity } from "../context/CapacityContext";

const ProjectsList = ({ excluded }) => {
  const {
    projects,
    excludedProjects,
    filteredMonths,
    projectDemands,
    toggleProjectExclusion,
  } = useCapacity();

  // Get the appropriate list based on the excluded prop
  const projectsList = excluded ? excludedProjects : projects;

  // Find project demand data for the displayed projects
  const getProjectWithDemand = (projectId) => {
    return (
      projectDemands.find((p) => p.id === projectId) || {
        monthlyDemand: {},
      }
    );
  };

  // Template for project name column
  const nameBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="project-name-column">{rowData.name}</div>
        <div className="text-sm text-gray-600">{rowData.category}</div>
      </div>
    );
  };

  // Template for priority column
  const priorityBodyTemplate = (rowData) => {
    const getSeverity = (priority) => {
      switch (priority.toLowerCase()) {
        case "low":
          return "info";
        case "medium":
          return "warning";
        case "high":
          return "danger";
        case "critical":
          return "danger";
        default:
          return "info";
      }
    };

    return (
      <Tag
        value={rowData.priority}
        severity={getSeverity(rowData.priority)}
        className="text-xs"
        rounded
      />
    );
  };

  // Template for action column (include/exclude buttons)
  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon={excluded ? "pi pi-plus" : "pi pi-minus"}
        tooltip={excluded ? "Include Project" : "Exclude Project"}
        tooltipOptions={{ position: "top" }}
        className={
          excluded
            ? "p-button-success p-button-sm"
            : "p-button-danger p-button-sm"
        }
        onClick={() => toggleProjectExclusion(rowData.id, excluded)}
      />
    );
  };

  // Template for monthly demand cells
  const demandBodyTemplate = (rowData, options) => {
    const monthId = options.field;
    const projectWithDemand = getProjectWithDemand(rowData.id);
    const demand = projectWithDemand.monthlyDemand[monthId] || 0;

    // Determine cell styling based on demand percentage
    let className = "";

    if (demand === 0) {
      className = "demand-cell demand-cell-empty";
    } else if (demand > 100) {
      className = "demand-cell demand-cell-over";
    } else if (demand >= 90) {
      className = "demand-cell demand-cell-high";
    } else if (demand >= 50) {
      className = "demand-cell demand-cell-medium";
    } else {
      className = "demand-cell demand-cell-low";
    }

    return <div className={className}>{demand > 0 ? `${demand}%` : "-"}</div>;
  };

  // Generate dynamic columns for months
  const monthColumns = filteredMonths.map((month) => {
    return (
      <Column
        key={month.id}
        field={month.id}
        header={month.label}
        body={demandBodyTemplate}
        style={{ minWidth: "100px", width: "100px" }}
        headerClassName="text-center"
      />
    );
  });

  return (
    <div className="projects-list">
      <DataTable
        value={projectsList}
        responsiveLayout="scroll"
        emptyMessage={`No ${excluded ? "excluded" : ""} projects found`}
        showGridlines
        rowHover
        className="project-datatable"
        scrollHeight="450px"
      >
        {/* Fixed columns */}
        <Column
          field="name"
          header="Project Name"
          body={nameBodyTemplate}
          style={{ minWidth: "300px" }}
          className="project-name-column"
          frozen
        />
        <Column
          field="priority"
          header="Priority"
          body={priorityBodyTemplate}
          style={{ minWidth: "120px", width: "120px" }}
          className="project-priority-column"
        />

        {/* Dynamic month columns */}
        {monthColumns}

        {/* Action column */}
        <Column
          body={actionBodyTemplate}
          style={{ width: "80px" }}
          frozen
          alignFrozen="right"
          className="action-column"
        />
      </DataTable>
    </div>
  );
};

export default ProjectsList;
