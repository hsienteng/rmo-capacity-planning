import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Chart } from "primereact/chart";
import { useCapacity } from "../context/CapacityContext";

const ProjectsList = ({ excluded }) => {
  const {
    projects,
    excludedProjects,
    projectDemands,
    filteredMonths,
    toggleProjectExclusion,
  } = useCapacity();

  const [selectedProject, setSelectedProject] = useState(null);
  const menuRef = React.useRef(null);

  // Get the appropriate list of projects based on the excluded prop
  const projectsList = excluded ? excludedProjects : projects;

  // Prepare priority tag template
  const priorityTemplate = (rowData) => {
    let severity = "success";
    if (rowData.priority === "high") severity = "danger";
    else if (rowData.priority === "medium") severity = "warning";

    return (
      <Tag
        value={rowData.priority.toUpperCase()}
        severity={severity}
        style={{ textTransform: "capitalize" }}
      />
    );
  };

  // Prepare status tag template
  const statusTemplate = (rowData) => {
    let severity = "info";
    if (rowData.status === "active") severity = "success";
    else if (rowData.status === "planned") severity = "warning";
    else if (rowData.status === "completed") severity = "secondary";

    return (
      <Tag
        value={rowData.status.toUpperCase()}
        severity={severity}
        style={{ textTransform: "capitalize" }}
      />
    );
  };

  // Format date template
  const dateTemplate = (rowData, field) => {
    const date = new Date(rowData[field]);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Menu items for actions
  const menuItems = [
    {
      label: excluded ? "Include Project" : "Exclude Project",
      icon: excluded ? "pi pi-plus" : "pi pi-minus",
      command: () => {
        if (selectedProject) {
          toggleProjectExclusion(selectedProject.id, excluded);
        }
      },
    },
    {
      label: "View Details",
      icon: "pi pi-eye",
      command: () => {
        // Placeholder for view action
        console.log("View project", selectedProject?.name);
      },
    },
  ];

  // Actions column template
  const actionsTemplate = (rowData) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-ellipsis-v"
          className="p-button-rounded p-button-text"
          onClick={(e) => {
            setSelectedProject(rowData);
            menuRef.current.toggle(e);
          }}
          aria-haspopup
          aria-controls="project-actions-menu"
        />
      </div>
    );
  };

  // Demand visualization column
  const demandVisualizationTemplate = (rowData) => {
    // Find the project demand data
    const projectDemand = projectDemands.find((d) => d.id === rowData.id);
    if (!projectDemand) return <div>No data</div>;

    // Prepare data for chart
    const labels = filteredMonths.map((month) => month.label);
    const data = filteredMonths.map(
      (month) => projectDemand.monthlyDemand[month.id] || 0
    );

    const chartData = {
      labels,
      datasets: [
        {
          label: "Resource Demand",
          data,
          backgroundColor: "rgba(0, 89, 219, 0.2)",
          borderColor: "rgba(0, 89, 219, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...data) * 1.2 || 5, // Add 20% headroom or default to 5 if all zeros
          ticks: {
            precision: 1,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.4, // Curved lines
        },
      },
    };

    return (
      <div style={{ height: "60px" }}>
        <Chart type="line" data={chartData} options={options} />
      </div>
    );
  };

  // Calculate total demand for each project
  const totalDemandTemplate = (rowData) => {
    const projectDemand = projectDemands.find((d) => d.id === rowData.id);
    if (!projectDemand) return "0";

    const totalDemand = filteredMonths.reduce(
      (sum, month) => sum + (projectDemand.monthlyDemand[month.id] || 0),
      0
    );

    return totalDemand.toFixed(1);
  };

  return (
    <div className="projects-list">
      <DataTable
        value={projectsList}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        className="projects-table"
      >
        <Column
          field="name"
          header="Project Name"
          style={{ width: "200px", fontWeight: "bold" }}
        />
        <Column
          field="priority"
          header="Priority"
          body={priorityTemplate}
          style={{ width: "120px" }}
        />
        <Column
          field="status"
          header="Status"
          body={statusTemplate}
          style={{ width: "120px" }}
        />
        <Column
          field="startDate"
          header="Start Date"
          body={(rowData) => dateTemplate(rowData, "startDate")}
          style={{ width: "120px" }}
        />
        <Column
          field="endDate"
          header="End Date"
          body={(rowData) => dateTemplate(rowData, "endDate")}
          style={{ width: "120px" }}
        />
        <Column
          field="demand"
          header="Total Demand"
          body={totalDemandTemplate}
          style={{ width: "100px", textAlign: "center" }}
        />
        <Column
          field="visualization"
          header="Demand Over Time"
          body={demandVisualizationTemplate}
          style={{ width: "300px" }}
        />
        <Column
          body={actionsTemplate}
          exportable={false}
          style={{ width: "50px" }}
        />
      </DataTable>

      <Menu model={menuItems} popup ref={menuRef} id="project-actions-menu" />
    </div>
  );
};

export default ProjectsList;