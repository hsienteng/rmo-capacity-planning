import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCapacity } from "../context/CapacityContext";
import AllocationEditModal from "./AllocationEditModal";

// Conversion constants
const WORK_DAYS_PER_WEEK = 5;
const WORK_HOURS_PER_WEEK = 40;

const CapacityTable = () => {
  const {
    resources,
    filteredMonths,
    selectedCategory,
    selectedMainCategory,
    categories,
    viewMode,
  } = useCapacity();

  // State for the allocation edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Find the label for the selected category
  const findCategoryLabel = () => {
    if (selectedCategory) {
      // Find subcategory
      for (const mainCategory of categories) {
        for (const subCategory of mainCategory.children || []) {
          if (subCategory.key === selectedCategory) {
            return `${mainCategory.label} / ${subCategory.label}`;
          }
        }
      }
    } else if (selectedMainCategory) {
      // Find main category
      const category = categories.find((c) => c.key === selectedMainCategory);
      return category ? category.label : "";
    }
    return "All Resources";
  };

  const categoryLabel = findCategoryLabel();

  // Body template for name column
  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center">
        <span className="resource-name-column">{rowData.name}</span>
      </div>
    );
  };

  // Body template for role column
  const roleBodyTemplate = (rowData) => {
    return <div className="resource-role-column">{rowData.category}</div>;
  };

  // Open the edit modal when a cell is clicked
  const handleCellClick = (resourceId, monthId) => {
    setSelectedResource(resourceId);
    setSelectedMonth(monthId);
    setEditModalVisible(true);
  };

  const allocationBodyTemplate = useCallback(
    (rowData, options) => {
      const monthId = options.field;
      const allocation = rowData.allocations[monthId];

      if (!allocation) return null;

      const { totalAllocation, allocationClass } = allocation;

      // Format the allocation based on the view mode
      let displayValue;
      switch (viewMode) {
        case "days":
          // Convert percentage to days per week (out of 5 days)
          const days = ((totalAllocation / 100) * WORK_DAYS_PER_WEEK).toFixed(
            1
          );
          displayValue = `${days}d`;
          break;
        case "hours":
          // Convert percentage to hours per week (out of 40 hours)
          const hours = Math.round(
            (totalAllocation / 100) * WORK_HOURS_PER_WEEK
          );
          displayValue = `${hours}h`;
          break;
        case "percentage":
          // Display as percentage
          displayValue = `${totalAllocation}%`;
          break;
        default:
          // Default display as percentage
          displayValue = `${totalAllocation}%`;
          break;
      }

      return (
        <div
          className={`capacity-cell ${allocationClass}`}
          style={{ cursor: "pointer" }}
          onClick={() => handleCellClick(rowData.id, monthId)}
          key={`${rowData.id}-${monthId}-${viewMode}`}
        >
          {displayValue}
        </div>
      );
    },
    [viewMode, handleCellClick]
  );

  // Generate dynamic columns for months
  const monthColumns = filteredMonths.map((month) => {
    return (
      <Column
        key={month.id}
        field={month.id}
        header={month.label}
        body={allocationBodyTemplate}
        style={{ minWidth: "100px", width: "100px", textAlign: "center" }}
        headerClassName="text-center"
      />
    );
  });

  // Table header with resource category info
  const header = (
    <div className="flex justify-content-between align-items-center">
      <div className="text-lg font-medium">
        {categoryLabel}
        <span className="ml-2 text-sm text-primary font-normal">
          ({resources.length}{" "}
          {resources.length === 1 ? "resource" : "resources"})
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="capacity-table-wrapper"
      style={{ maxWidth: "100%", overflow: "auto" }}
    >
      <div className="capacity-table">
        <DataTable
          value={resources}
          scrollable
          scrollHeight="400px"
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          responsiveLayout="scroll"
          emptyMessage="No resources found"
          rowHover
          className="capacity-datatable"
          header={header}
          key={`capacity-table-${viewMode}`}
        >
          {/* Fixed columns */}
          <Column
            field="name"
            header="Resource"
            body={nameBodyTemplate}
            style={{ minWidth: "200px", width: "200px" }}
            frozen
            className="resource-name-column"
          />
          <Column
            field="category"
            header="Role"
            body={roleBodyTemplate}
            style={{ minWidth: "180px", width: "180px" }}
            className="resource-role-column"
          />

          {/* Dynamic month columns */}
          {monthColumns}
        </DataTable>

        {/* Allocation Edit Modal */}
        <AllocationEditModal
          visible={editModalVisible}
          onHide={() => setEditModalVisible(false)}
          resourceId={selectedResource}
          monthId={selectedMonth}
        />
      </div>
    </div>
  );
};

export default CapacityTable;
