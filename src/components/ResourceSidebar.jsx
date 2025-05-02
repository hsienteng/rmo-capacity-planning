import React from "react";
import { Tree } from "primereact/tree";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { useCapacity } from "../context/CapacityContext";

const ResourceSidebar = () => {
  const {
    categories,
    selectedCategory,
    selectedMainCategory,
    expandedKeys,
    selectCategory,
    onToggle,
    getCategoryResourceCount,
  } = useCapacity();

  // Prepare the tree nodes based on the resource categories
  const nodes = categories.map((category) => {
    const resourceCount = getCategoryResourceCount(category.key);

    return {
      key: category.key,
      label: category.label,
      icon: category.icon,
      selectable: true,
      className: selectedMainCategory === category.key ? "selected-node" : "",
      children: category.children?.map((sub) => {
        const subResourceCount = getCategoryResourceCount(sub.key);
        return {
          key: sub.key,
          label: sub.label,
          icon: sub.icon,
          selectable: true,
          className: selectedCategory === sub.key ? "selected-node" : "",
          data: { count: subResourceCount },
        };
      }),
      data: { count: resourceCount },
    };
  });

  // Customize the tree node template to show counts
  const nodeTemplate = (node, options) => {
    const resourceCount = node.data?.count || 0;

    return (
      <div
        className={`tree-node ${options.className} ${node.className || ""}`}
        onClick={() => selectCategory(node.key)}
      >
        <div className="flex align-items-center">
          <i className={`${node.icon} mr-2`}></i>
          <span className="tree-label">{node.label}</span>

          {/* Only show badge if there are resources */}
          {resourceCount > 0 && (
            <Badge
              value={resourceCount}
              className="ml-auto resource-count-badge"
              severity="info"
            ></Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="resource-sidebar p-2">
      <div className="sidebar-header">
        <h3>Resources</h3>
      </div>

      {/* Search box */}
      <span className="p-input-icon-left w-full mb-3">
        <i className="pi pi-search" />
        <InputText placeholder="Search resources" className="w-full" />
      </span>

      {/* Resource tree */}
      <Tree
        value={nodes}
        expandedKeys={expandedKeys}
        onToggle={onToggle}
        nodeTemplate={nodeTemplate}
        selectionMode="single"
        className="resource-tree"
        pt={{
          root: {
            className: "border-none",
          },
          nodeContent: {
            className: "py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-lg px-2",
          },
        }}
      />
    </div>
  );
};

export default ResourceSidebar;