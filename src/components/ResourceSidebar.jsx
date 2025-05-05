import React from "react";
import { Tree } from "primereact/tree";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCapacity } from "../context/CapacityContext";

const ResourceSidebar = () => {
  const {
    categories,
    selectedCategory,
    selectedMainCategory,
    expandedKeys,
    selectCategory,
    showAllResources,
    onToggle,
    getCategoryResourceCount,
  } = useCapacity();

  // Convert our categories to the Tree component's expected format
  const transformCategoriesToTreeNodes = (categories) => {
    return categories.map((category) => {
      // Get the actual resource count for this category
      const resourceCount = getCategoryResourceCount(category.key);

      // Determine if this is the selected category
      const isSelected =
        category.key === selectedCategory ||
        category.key === selectedMainCategory;

      const node = {
        key: category.key,
        label: category.label,
        icon: category.icon,
        data: {
          ...category,
          count: resourceCount,
          isSelected,
        },
        selectable: true,
      };

      if (category.children && category.children.length > 0) {
        // For main categories, add children
        node.children = transformCategoriesToTreeNodes(category.children);
      }

      return node;
    });
  };

  const treeNodes = transformCategoriesToTreeNodes(categories);

  // Custom node template for tree
  const nodeTemplate = (node, options) => {
    const isMainCategory = !node.key.includes("-");
    const isSelected = isMainCategory
      ? selectedMainCategory === node.key
      : selectedCategory === node.key;

    // Apply different styles based on selection state
    const className = isSelected
      ? "font-semibold text-primary"
      : options.className;

    // Get count of resources in this category
    const count = node.data.count || 0;

    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <i className={`${node.icon} mr-2`}></i>
          <span>{node.label}</span>
        </div>
        {count > 0 && (
          <span
            className={`resource-count-badge ${
              isSelected
                ? "selected-category"
                : isMainCategory
                ? "main-category"
                : ""
            }`}
          >
            {count}
          </span>
        )}
      </div>
    );
  };

  // Handler for node selection
  const onNodeSelect = (e) => {
    selectCategory(e.node.key);
  };

  return (
    <Card className="resource-sidebar">
      <div className="resource-sidebar-header">
        <div className="flex align-items-center justify-content-between mb-3">
          <h3 className="resource-sidebar-title m-0">User Groups</h3>
          <Button
            icon="pi pi-users"
            label="All"
            className="p-button-text p-button-sm all-resources-btn"
            onClick={showAllResources}
            tooltip="Show all resources"
            disabled={!selectedCategory && !selectedMainCategory}
          />
        </div>
        {/* 
        <div className="resource-sidebar-search mb-3">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText placeholder="Search resources" className="w-full" />
          </span>
        </div> */}
      </div>

      <div className="resource-tree-container">
        <Tree
          value={treeNodes}
          selectionMode="single"
          selectionKeys={
            selectedCategory
              ? { [selectedCategory]: true }
              : selectedMainCategory
              ? { [selectedMainCategory]: true }
              : {}
          }
          expandedKeys={expandedKeys}
          onToggle={onToggle}
          onSelect={onNodeSelect}
          nodeTemplate={nodeTemplate}
          className="resource-tree border-none"
          pt={{ nodeIcon: { className: "hidden" } }}
        />
      </div>
    </Card>
  );
};

export default ResourceSidebar;
