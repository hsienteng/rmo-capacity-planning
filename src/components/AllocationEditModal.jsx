import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useCapacity } from "../context/CapacityContext";

// Conversion constants
const WORK_DAYS_PER_WEEK = 5;
const WORK_HOURS_PER_WEEK = 40;

const AllocationEditModal = ({ visible, onHide, resourceId, monthId }) => {
  const {
    allResources,
    projects,
    excludedProjects,
    updateResourceAllocation,
    viewMode,
  } = useCapacity();

  const [currentProjects, setCurrentProjects] = useState([]);
  const [newProject, setNewProject] = useState(null);
  const [newAllocation, setNewAllocation] = useState(0);
  const [totalAllocation, setTotalAllocation] = useState(0);

  // Find the resource being edited
  const resource = allResources.find((r) => r.id === resourceId);

  // Reset state when the modal opens with new resource/month
  useEffect(() => {
    if (visible && resource && monthId) {
      const allocation = resource.allocations[monthId];

      if (allocation) {
        setCurrentProjects(allocation.projectAllocations || []);
        setTotalAllocation(allocation.totalAllocation || 0);
      } else {
        setCurrentProjects([]);
        setTotalAllocation(0);
      }

      setNewProject(null);
      setNewAllocation(0);
    }
  }, [visible, resource, monthId]);

  // Get list of available projects for dropdown
  const getAvailableProjects = () => {
    // Get all projects (active and excluded)
    const allProjects = [...projects, ...excludedProjects];

    // Filter out projects already allocated to this resource
    const usedProjectIds = currentProjects.map((p) => p.projectId);

    return allProjects
      .filter((p) => !usedProjectIds.includes(p.id))
      .map((p) => ({
        label: p.name,
        value: p.id,
      }));
  };

  // Handle adding a new project allocation
  const handleAddProject = () => {
    if (newProject && newAllocation > 0) {
      const projectToAdd = [...projects, ...excludedProjects].find(
        (p) => p.id === newProject
      );

      if (projectToAdd) {
        const updatedProjects = [
          ...currentProjects,
          {
            projectId: projectToAdd.id,
            projectName: projectToAdd.name,
            allocation: newAllocation,
          },
        ];

        setCurrentProjects(updatedProjects);

        // Update total allocation
        const newTotal = updatedProjects.reduce(
          (total, project) => total + project.allocation,
          0
        );
        setTotalAllocation(newTotal);

        // Reset new project fields
        setNewProject(null);
        setNewAllocation(0);
      }
    }
  };

  // Handle saving changes
  const handleSave = () => {
    if (resource && monthId) {
      updateResourceAllocation(
        resourceId,
        monthId,
        currentProjects,
        totalAllocation
      );
      onHide();
    }
  };

  const formatMonthId = (id) => {
    return id ? id.toUpperCase() : "";
  };

  const getAllocationClass = (percentage) => {
    if (percentage === 0) return "allocation-0";
    if (percentage < 50) return "allocation-1"; // Under-allocated
    if (percentage < 90) return "allocation-2"; // Partially allocated
    if (percentage <= 100) return "allocation-3"; // Fully allocated
    return "allocation-4"; // Over-allocated
  };

  return (
    <Dialog
      header={`Edit Allocation - ${
        resource ? resource.name : ""
      } (${formatMonthId(monthId)})`}
      visible={visible}
      onHide={onHide}
      style={{ width: "550px" }}
      modal
      className="p-fluid"
      dismissableMask
      headerClassName="p-4"
      contentClassName="p-4"
      blockScroll
    >
      <div className="p-grid">
        <div className="p-field mb-4">
          <h3>Current Projects</h3>
          {currentProjects.length === 0 ? (
            <div className="p-mt-2">No project allocations</div>
          ) : (
            currentProjects.map((project, index) => (
              <div
                key={index}
                className="p-d-flex p-ai-center p-mb-2 border-1 border-round p-3 mb-2"
              >
                <div className="flex align-items-center justify-content-between w-full">
                  <div>
                    <div className="font-medium">{project.projectName}</div>
                    <div>
                      Allocation:{" "}
                      {viewMode === "days"
                        ? `${(
                            (project.allocation / 100) *
                            WORK_DAYS_PER_WEEK
                          ).toFixed(1)}d`
                        : viewMode === "hours"
                        ? `${Math.round(
                            (project.allocation / 100) * WORK_HOURS_PER_WEEK
                          )}h`
                        : `${project.allocation}%`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Total Allocation */}
          <div className="p-field mt-4">
            <div className="flex align-items-center justify-content-between">
              <h3>Total Allocation:</h3>
              <div
                className={`text-lg font-bold ${
                  totalAllocation > 100 ? "text-red-500" : ""
                }`}
              >
                {viewMode === "days"
                  ? `${((totalAllocation / 100) * WORK_DAYS_PER_WEEK).toFixed(
                      1
                    )}d`
                  : viewMode === "hours"
                  ? `${Math.round(
                      (totalAllocation / 100) * WORK_HOURS_PER_WEEK
                    )}h`
                  : `${totalAllocation}%`}
              </div>
            </div>
            <div className="w-full mt-2">
              <div className="progress-bar-container w-full bg-gray-200 h-2rem border-round">
                <div
                  className={`progress-bar h-full border-round ${getAllocationClass(
                    totalAllocation
                  )}`}
                  style={{ width: `${Math.min(totalAllocation, 100)}%` }}
                />
              </div>
            </div>
            {totalAllocation > 100 && (
              <div className="text-red-500 text-sm mt-1">
                Warning: Resource is over-allocated
              </div>
            )}
          </div>
        </div>

        {/* Add Project */}
        {/* <div className="p-field mt-4">
          <h3>Add Project</h3>
          <div className="flex align-items-center gap-2 mb-2">
            <div className="flex-grow-1">
              <label htmlFor="project" className="block mb-1">
                Project
              </label>
              <Dropdown
                id="project"
                value={newProject}
                options={getAvailableProjects()}
                onChange={(e) => setNewProject(e.value)}
                placeholder="Select a project"
                className="w-full"
              />
            </div>
            <div className="w-6rem">
              <label htmlFor="percentage" className="block mb-1">
                Percentage
              </label>
              <InputNumber
                id="percentage"
                value={newAllocation}
                onValueChange={(e) => setNewAllocation(e.value)}
                suffix="%"
                min={0}
                max={100}
              />
            </div>
          </div>
          <Button
            label="Add Project Allocation"
            icon="pi pi-plus"
            onClick={handleAddProject}
            disabled={!newProject || newAllocation <= 0}
            className="mt-2"
          />
        </div> */}
      </div>
    </Dialog>
  );
};

export default AllocationEditModal;
