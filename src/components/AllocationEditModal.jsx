import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useCapacity } from "../context/CapacityContext";

const AllocationEditModal = ({ 
  visible, 
  onHide, 
  resource, 
  monthId, 
  projects,
}) => {
  const { updateResourceAllocation } = useCapacity();
  const [allocations, setAllocations] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newAllocation, setNewAllocation] = useState(0);
  const [totalAllocation, setTotalAllocation] = useState(0);

  // Initialize allocations when the modal opens
  useEffect(() => {
    if (resource && monthId) {
      const currentAllocations = resource.allocations[monthId].projectAllocations || [];
      setAllocations([...currentAllocations]);
      calculateTotal([...currentAllocations]);
    }
  }, [resource, monthId, visible]);

  // Calculate total allocation
  const calculateTotal = (allocs) => {
    const total = allocs.reduce((sum, alloc) => sum + (alloc.allocation || 0), 0);
    setTotalAllocation(total);
    return total;
  };

  // Update allocation for a project
  const updateAllocation = (index, value) => {
    const newAllocations = [...allocations];
    newAllocations[index].allocation = value;
    setAllocations(newAllocations);
    calculateTotal(newAllocations);
  };

  // Remove a project allocation
  const removeAllocation = (index) => {
    const newAllocations = allocations.filter((_, i) => i !== index);
    setAllocations(newAllocations);
    calculateTotal(newAllocations);
  };

  // Add a new project allocation
  const addAllocation = () => {
    if (!selectedProject || newAllocation <= 0) return;

    // Check if project already exists
    const existing = allocations.find(a => a.projectId === selectedProject.id);
    if (existing) {
      // Update existing allocation
      const newAllocations = allocations.map(a => 
        a.projectId === selectedProject.id 
          ? { ...a, allocation: a.allocation + newAllocation }
          : a
      );
      setAllocations(newAllocations);
      calculateTotal(newAllocations);
    } else {
      // Add new allocation
      const newAllocations = [
        ...allocations,
        {
          projectId: selectedProject.id,
          projectName: selectedProject.name,
          allocation: newAllocation
        }
      ];
      setAllocations(newAllocations);
      calculateTotal(newAllocations);
    }
    
    // Reset selection
    setSelectedProject(null);
    setNewAllocation(0);
  };

  // Save all changes
  const saveChanges = () => {
    if (resource && monthId) {
      updateResourceAllocation(
        resource.id,
        monthId,
        allocations,
        totalAllocation
      );
      onHide();
    }
  };

  // Filter out projects that are already allocated
  const availableProjects = projects.filter(
    project => !allocations.some(a => a.projectId === project.id)
  );

  return (
    <Dialog
      header={`Edit Allocations: ${resource?.name || ''} - ${monthId || ''}`}
      visible={visible}
      onHide={onHide}
      style={{ width: '500px' }}
      modal
      footer={
        <div>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onHide} />
          <Button label="Save" icon="pi pi-check" onClick={saveChanges} />
        </div>
      }
    >
      <div className="allocation-edit-container">
        {/* Current allocations */}
        <div className="current-allocations">
          <h3>Current Allocations</h3>
          {allocations.length > 0 ? (
            allocations.map((allocation, index) => (
              <div key={index} className="allocation-row">
                <span className="project-name">{allocation.projectName}</span>
                <div className="allocation-controls">
                  <InputNumber
                    value={allocation.allocation}
                    onValueChange={(e) => updateAllocation(index, e.value)}
                    min={0}
                    max={100}
                    suffix="%"
                    style={{ width: '100px' }}
                  />
                  <Button 
                    icon="pi pi-trash" 
                    className="p-button-danger p-button-text"
                    onClick={() => removeAllocation(index)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No allocations yet</p>
          )}

          <div className="allocation-total">
            <span>Total:</span>
            <span className={totalAllocation > 100 ? 'over-allocated' : ''}>
              {totalAllocation}%
              {totalAllocation > 100 && (
                <i className="pi pi-exclamation-triangle ml-2" title="Over allocated"></i>
              )}
            </span>
          </div>
        </div>

        {/* Add new allocation */}
        <div className="add-allocation">
          <h3>Add Allocation</h3>
          <div className="add-allocation-form">
            <Dropdown
              value={selectedProject}
              options={availableProjects}
              onChange={(e) => setSelectedProject(e.value)}
              optionLabel="name"
              placeholder="Select a project"
              className="w-full mb-2"
            />
            <div className="flex align-items-center">
              <InputNumber
                value={newAllocation}
                onValueChange={(e) => setNewAllocation(e.value)}
                min={0}
                max={100}
                suffix="%"
                style={{ width: '100px' }}
              />
              <Button 
                label="Add" 
                icon="pi pi-plus" 
                onClick={addAllocation}
                disabled={!selectedProject || newAllocation <= 0}
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AllocationEditModal;