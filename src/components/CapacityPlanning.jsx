import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

import ResourceSidebar from "./ResourceSidebar";
import CapacityTable from "./CapacityTable";
import { useCapacity } from "../context/CapacityContext";

const CapacityPlanning = () => {
  const {
    months,
    selectedMonths,
    selectedCategory,
    selectedMainCategory,
    categories,
    showAllResources,
    toggleAllMonths,
    sidebarVisible,
    toggleSidebar,
    setSelectedMonths,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
  } = useCapacity();

  const contentRef = useRef(null);

  // Calendar date range
  const [dateRange, setDateRange] = useState(null);
  // Temporary date range (before submission)
  const [tempDateRange, setTempDateRange] = useState(null);

  // Format month id from date (e.g., "apr-2025" from Date object)
  const formatDateToMonthId = (date) => {
    if (!date) return null;
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase();
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  // Format month id to display format (e.g., "APR-2025" from "apr-2025")
  const formatMonthIdToDisplay = (monthId) => {
    return monthId ? monthId.toUpperCase() : "";
  };

  // Parse month id to Date object (e.g., Date object from "apr-2025")
  const parseMonthIdToDate = (monthId) => {
    if (!monthId) return null;
    const [monthStr, yearStr] = monthId.split("-");
    const monthIndex = new Date(Date.parse(`${monthStr} 1, 2000`)).getMonth();
    return new Date(parseInt(yearStr), monthIndex, 1);
  };

  // Set initial date range based on selected months
  useEffect(() => {
    if (selectedMonths.length > 0 && !dateRange) {
      const sortedMonths = [...selectedMonths].sort((a, b) => {
        const dateA = parseMonthIdToDate(a);
        const dateB = parseMonthIdToDate(b);
        return dateA - dateB;
      });

      const startDate = parseMonthIdToDate(sortedMonths[0]);
      const endDate = parseMonthIdToDate(sortedMonths[sortedMonths.length - 1]);

      if (startDate && endDate) {
        setDateRange([startDate, endDate]);
        setTempDateRange([startDate, endDate]);
      }
    }
  }, [selectedMonths, dateRange]);

  // Handle temporary date range change from the calendar
  const handleTempDateRangeChange = (e) => {
    setTempDateRange(e.value);
  };

  // Handle submission of date range
  const handleDateRangeSubmit = () => {
    if (!tempDateRange || !tempDateRange[0] || !tempDateRange[1]) {
      // If no range is selected, keep at least the first month
      toggleAllMonths(false);
      return;
    }

    // Set the actual date range
    setDateRange(tempDateRange);

    // Convert date range to month ids
    const selectedMonthIds = [];
    const startDate = new Date(
      tempDateRange[0].getFullYear(),
      tempDateRange[0].getMonth(),
      1
    );
    const endDate = new Date(
      tempDateRange[1].getFullYear(),
      tempDateRange[1].getMonth(),
      1
    );

    // Fill in all months between start and end dates
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const monthId = formatDateToMonthId(currentDate);
      // Only add month if it exists in our months data
      if (months.find((m) => m.id === monthId)) {
        selectedMonthIds.push(monthId);
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    if (selectedMonthIds.length > 0) {
      setSelectedMonths(selectedMonthIds);
    } else {
      // If no months in range, keep at least the first month
      toggleAllMonths(false);
    }
  };

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
    return null;
  };

  const categoryLabel = findCategoryLabel();

  useEffect(() => {
    // Force recalculation of heights when filters change
    if (contentRef.current) {
      const event = new Event("resize");
      window.dispatchEvent(event);
    }
  }, [selectedCategory, selectedMainCategory]);

  // Format displayed date range
  const formatDateRange = () => {
    const range = dateRange;
    if (!range || !range[0] || !range[1]) return "Select date range";

    const startMonth = range[0].toLocaleString("en-US", { month: "short" });
    const startYear = range[0].getFullYear();
    const endMonth = range[1].toLocaleString("en-US", { month: "short" });
    const endYear = range[1].getFullYear();

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  // Format temporary date range (for display while selecting)
  const formatTempDateRange = () => {
    if (!tempDateRange || !tempDateRange[0] || !tempDateRange[1]) {
      return formatDateRange(); // Fall back to the confirmed range
    }

    const startMonth = tempDateRange[0].toLocaleString("en-US", {
      month: "short",
    });
    const startYear = tempDateRange[0].getFullYear();
    const endMonth = tempDateRange[1].toLocaleString("en-US", {
      month: "short",
    });
    const endYear = tempDateRange[1].getFullYear();

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  return (
    <div className="capacity-planning" ref={contentRef}>
      <Card className="month-selector" pt={{ root: { className: "p-0" } }}>
        <h3>Capacity Planning</h3>
        <div className="month-selector-container">
          <div className="flex align-items-center">
            <span className="month-selector-title">Timeline:</span>
            <Calendar
              value={tempDateRange || dateRange}
              onChange={handleTempDateRangeChange}
              selectionMode="range"
              view="month"
              dateFormat="MM yy"
              placeholder={formatTempDateRange()}
              readOnlyInput
              className="w-full"
              style={{ minWidth: "250px" }}
              showIcon
            />
            <Button
              label="Apply"
              className="ml-2 flex justify-content-center align-items-center"
              outlined
              onClick={handleDateRangeSubmit}
              disabled={!tempDateRange}
            />
          </div>

          <div className="flex align-items-center gap-2 ml-auto">
            <span className="p-input-icon-left search-container">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search resources"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-inputtext-sm"
              />
            </span>
            <span className="font-medium text-gray-700">View:</span>
            <Dropdown
              options={[
                { label: "Units", value: "percentage" },
                { label: "Days", value: "days" },
                { label: "Hours", value: "hours" },
              ]}
              value={viewMode}
              onChange={(e) => setViewMode(e.value)}
              style={{ width: "120px" }}
            />
          </div>
        </div>

        {/* Active filter display */}
        {categoryLabel && (
          <div className="flex mt-3">
            <span className="text-sm text-gray-700 mr-2">Active Filter:</span>
            <Tag
              value={categoryLabel}
              severity="info"
              className="p-tag-sm"
              icon="pi pi-filter"
              removable
              onRemove={showAllResources}
            />
          </div>
        )}
      </Card>

      {/* Two column layout */}
      <div className="two-column-layout">
        {/* Sidebar for resource navigation */}
        <div
          className={`sidebar-column capacity-sidebar ${
            sidebarVisible ? "show" : "hide"
          } md:relative`}
        >
          <ResourceSidebar />
        </div>

        {/* Sidebar toggle button - moved outside sidebar container */}
        <Button
          icon={sidebarVisible ? "pi pi-angle-left" : "pi pi-angle-right"}
          className="sidebar-toggle-btn p-button-rounded p-button-outlined"
          onClick={toggleSidebar}
          aria-label={sidebarVisible ? "Collapse sidebar" : "Expand sidebar"}
        />

        {/* Main content with wrapper to control overflow */}
        <div className={`main-column ${sidebarVisible ? "" : "full-width"}`}>
          <Card className="p-0">
            <div className="p-card-body p-3">
              <CapacityTable />
            </div>
          </Card>
        </div>
      </div>

      {/* Legend for allocation colors */}
      <Card className="allocation-legend" pt={{ root: { className: "p-0" } }}>
        <h3 className="legend-title">Allocation Legend</h3>
        <div className="legend-container">
          <div className="legend-item">
            <div className="legend-color allocation-0"></div>
            <span className="legend-text">0% - Not Allocated</span>
          </div>
          <div className="legend-item">
            <div className="legend-color allocation-1"></div>
            <span className="legend-text">1-49% - Under Allocated</span>
          </div>
          <div className="legend-item">
            <div className="legend-color allocation-2"></div>
            <span className="legend-text">50-89% - Partially Allocated</span>
          </div>
          <div className="legend-item">
            <div className="legend-color allocation-3"></div>
            <span className="legend-text">90-100% - Fully Allocated</span>
          </div>
          <div className="legend-item">
            <div className="legend-color allocation-4"></div>
            <span className="legend-text">&gt;100% - Over Allocated</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CapacityPlanning;
