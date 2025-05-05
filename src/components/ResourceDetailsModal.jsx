import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { TabView, TabPanel } from "primereact/tabview";
import { useCapacity } from "../context/CapacityContext";

// Conversion constants
const WORK_DAYS_PER_WEEK = 5;
const WORK_HOURS_PER_WEEK = 40;

const ResourceDetailsModal = ({ visible, onHide, resourceId }) => {
  const { allResources, projects, excludedProjects, selectedMonths, viewMode } =
    useCapacity();
  const [resource, setResource] = useState(null);
  const [resourceProjects, setResourceProjects] = useState([]);
  const [excludedResourceProjects, setExcludedResourceProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (resourceId && visible) {
      // Find the resource
      const foundResource = allResources.find((r) => r.id === resourceId);
      setResource(foundResource);

      if (foundResource) {
        // Get all projects assigned to this resource within the selected months
        const allProjects = [...projects, ...excludedProjects];
        const assignedProjectIds = new Set();
        const excludedProjectIds = new Set();

        // Collect all project IDs that the resource is allocated to
        Object.entries(foundResource.allocations).forEach(
          ([monthId, allocation]) => {
            // Only include allocations from selected months
            if (
              selectedMonths.includes(monthId) &&
              allocation.projectAllocations
            ) {
              allocation.projectAllocations.forEach((proj) => {
                if (excludedProjects.some((ep) => ep.id === proj.projectId)) {
                  excludedProjectIds.add(proj.projectId);
                } else {
                  assignedProjectIds.add(proj.projectId);
                }
              });
            }
          }
        );

        // Get full project details for assigned projects
        const assignedProjects = allProjects
          .filter((p) => assignedProjectIds.has(p.id))
          .map((p) => ({
            ...p,
            allocations: getProjectAllocations(foundResource, p.id),
          }));

        // Get full project details for excluded projects
        const resourceExcludedProjects = allProjects
          .filter((p) => excludedProjectIds.has(p.id))
          .map((p) => ({
            ...p,
            allocations: getProjectAllocations(foundResource, p.id),
          }));

        setResourceProjects(assignedProjects);
        setExcludedResourceProjects(resourceExcludedProjects);
      }
    }
  }, [
    resourceId,
    visible,
    allResources,
    projects,
    excludedProjects,
    selectedMonths,
  ]);

  // Get allocations for a specific project across all selected months
  const getProjectAllocations = (resource, projectId) => {
    const allocations = {};

    selectedMonths.forEach((monthId) => {
      const monthAllocation = resource.allocations[monthId];
      if (monthAllocation && monthAllocation.projectAllocations) {
        const projectAllocation = monthAllocation.projectAllocations.find(
          (pa) => pa.projectId === projectId
        );

        if (projectAllocation) {
          allocations[monthId] = projectAllocation.allocation;
        } else {
          allocations[monthId] = 0;
        }
      } else {
        allocations[monthId] = 0;
      }
    });

    return allocations;
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
      switch (priority?.toLowerCase()) {
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

    return rowData.priority ? (
      <Tag
        value={rowData.priority}
        severity={getSeverity(rowData.priority)}
        className="text-xs"
        rounded
      />
    ) : null;
  };

  // Template for allocation cells
  const allocationBodyTemplate = (rowData, options) => {
    const monthId = options.field;
    const allocation = rowData.allocations[monthId] || 0;

    // Format the allocation based on the view mode
    let displayValue;
    switch (viewMode) {
      case "days":
        // Convert percentage to days per week (out of 5 days)
        const days = ((allocation / 100) * WORK_DAYS_PER_WEEK).toFixed(1);
        displayValue = `${days}d`;
        break;
      case "hours":
        // Convert percentage to hours per week (out of 40 hours)
        const hours = Math.round((allocation / 100) * WORK_HOURS_PER_WEEK);
        displayValue = `${hours}h`;
        break;
      case "percentage":
      default:
        // Display as percentage
        displayValue = `${allocation}%`;
        break;
    }

    let className = "allocation-cell";
    if (allocation === 0) {
      className += " allocation-0";
    } else if (allocation < 50) {
      className += " allocation-1";
    } else if (allocation < 90) {
      className += " allocation-2";
    } else if (allocation <= 100) {
      className += " allocation-3";
    } else {
      className += " allocation-4";
    }

    return (
      <div className={className}>{allocation > 0 ? displayValue : "-"}</div>
    );
  };

  // Generate month columns for the tables
  const monthColumns = selectedMonths.map((monthId) => {
    const month = monthId.toUpperCase();
    return (
      <Column
        key={monthId}
        field={monthId}
        header={month}
        body={allocationBodyTemplate}
        style={{ minWidth: "100px", width: "100px", textAlign: "center" }}
        headerClassName="text-center"
      />
    );
  });

  // Get unit string based on view mode
  const getUnitString = () => {
    switch (viewMode) {
      case "days":
        return "days/week";
      case "hours":
        return "hours/week";
      case "percentage":
      default:
        return "allocation %";
    }
  };

  return (
    <Dialog
      header={`Resource Details - ${resource?.name || ""}`}
      visible={visible}
      onHide={onHide}
      style={{ width: "90%", maxWidth: "1200px" }}
      modal
      className="resource-details-modal"
      dismissableMask
      blockScroll
    >
      {resource && (
        <div>
          <div className="resource-details-header mb-4">
            <p className="text-gray-600 mt-1">
              <span className="font-medium mr-1">Role:</span>{" "}
              {resource.category}
            </p>
            <div className="resource-stats mt-3 flex gap-3">
              <div className="stat-item bg-gray-50 rounded-md">
                <span className="font-medium text-gray-700">
                  Active Projects:
                </span>{" "}
                {resourceProjects.length}
              </div>
              <div className="stat-item bg-gray-50 rounded-md">
                <span className="font-medium text-gray-700">
                  Excluded Projects:
                </span>{" "}
                {excludedResourceProjects.length}
              </div>
              <div className="stat-item bg-gray-50 rounded-md">
                <span className="font-medium text-gray-700">Showing:</span>{" "}
                {getUnitString()}
              </div>
            </div>
          </div>

          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Active Projects">
              <DataTable
                value={resourceProjects}
                emptyMessage="No projects assigned"
                showGridlines
                rowHover
                className="project-allocations-table"
                scrollable
                scrollHeight="400px"
                resizableColumns
                columnResizeMode="expand"
              >
                <Column
                  field="name"
                  header="Project Name"
                  body={nameBodyTemplate}
                  style={{ minWidth: "300px" }}
                  className="project-name-column"
                  frozen
                />
                {/* <Column
                  field="priority"
                  header="Priority"
                  body={priorityBodyTemplate}
                  style={{ minWidth: "120px", width: "120px" }}
                /> */}
                {monthColumns}
              </DataTable>
            </TabPanel>

            <TabPanel header="Excluded Projects">
              <DataTable
                value={excludedResourceProjects}
                emptyMessage="No excluded projects assigned"
                showGridlines
                rowHover
                className="excluded-project-allocations-table"
                scrollable
                scrollHeight="400px"
                resizableColumns
                columnResizeMode="expand"
              >
                <Column
                  field="name"
                  header="Project Name"
                  body={nameBodyTemplate}
                  style={{ minWidth: "300px" }}
                  className="project-name-column"
                  frozen
                />
                {/* <Column
                  field="priority"
                  header="Priority"
                  body={priorityBodyTemplate}
                  style={{ minWidth: "120px", width: "120px" }}
                /> */}
                {monthColumns}
              </DataTable>
            </TabPanel>
          </TabView>
        </div>
      )}
    </Dialog>
  );
};

export default ResourceDetailsModal;
