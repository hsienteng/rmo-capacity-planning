import React, { createContext, useState, useContext, useEffect } from "react";
import {
  resourceCategories,
  resourcesData,
  resourceAllocations,
  monthsData,
} from "../data/resourcesData";
import {
  activeProjects,
  excludedProjects,
  getProjectDemands,
} from "../data/projectsData";

// Create the context
const CapacityContext = createContext();

// Custom hook to use the context
export const useCapacity = () => useContext(CapacityContext);

// Helper function to determine allocation class based on percentage
function getAllocationClass(percentage) {
  if (percentage === 0) return "allocation-0";
  if (percentage < 50) return "allocation-1"; // Under-allocated
  if (percentage < 90) return "allocation-2"; // Partially allocated
  if (percentage <= 100) return "allocation-3"; // Fully allocated
  return "allocation-4"; // Over-allocated
}

// Provider component
export const CapacityProvider = ({ children }) => {
  // State for resources and their allocations
  const [resources, setResources] = useState(resourceAllocations);
  const [allResources, setAllResources] = useState(resourceAllocations);
  const [categories, setCategories] = useState(resourceCategories);
  const [months, setMonths] = useState(monthsData);
  const [projects, setProjects] = useState(activeProjects);
  const [excludedProjectsList, setExcludedProjectsList] =
    useState(excludedProjects);
  const [projectDemands, setProjectDemands] = useState([]);

  // Selected states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState({ cap: true }); // Initialize with CAP expanded
  const [selectedMonths, setSelectedMonths] = useState(
    months.map((month) => month.id)
  );

  // Search query for resources
  const [searchQuery, setSearchQuery] = useState("");

  // View mode state (percentage, days, hours)
  const [viewMode, setViewMode] = useState("percentage");

  // Mobile responsive state
  const [sidebarVisible, setSidebarVisible] = useState(true); // Changed default to true so sidebar is visible on load

  // Calculate project demands whenever resources change
  useEffect(() => {
    const demands = getProjectDemands();
    setProjectDemands(demands);
  }, [allResources]);

  // Update filtered resources whenever selection changes
  useEffect(() => {
    let filteredResources;

    // First filter by category
    if (selectedCategory) {
      // Filter by specific subcategory
      filteredResources = allResources.filter(
        (resource) => resource.role === selectedCategory
      );
    } else if (selectedMainCategory) {
      // Filter by main category
      filteredResources = allResources.filter((resource) =>
        resource.role.startsWith(selectedMainCategory + "-")
      );
    } else {
      // Return all resources
      filteredResources = allResources;
    }

    // Then filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filteredResources = filteredResources.filter((resource) =>
        resource.name.toLowerCase().includes(query) ||
        resource.category.toLowerCase().includes(query)
      );
    }

    setResources(filteredResources);
  }, [allResources, selectedCategory, selectedMainCategory, searchQuery]);

  // Update resource allocation for a specific resource and month
  const updateResourceAllocation = (
    resourceId,
    monthId,
    projectAllocations,
    totalAllocation
  ) => {
    // Create a deep copy of allResources to avoid direct state mutation
    const updatedResources = allResources.map((resource) => {
      if (resource.id === resourceId) {
        // Create a copy of the resource to update
        return {
          ...resource,
          allocations: {
            ...resource.allocations,
            [monthId]: {
              ...resource.allocations[monthId],
              totalAllocation,
              allocationClass: getAllocationClass(totalAllocation),
              projectAllocations,
            },
          },
        };
      }
      return resource;
    });

    // Update both resources and allResources
    setAllResources(updatedResources);

    // Update filtered resources as well (will be handled by the useEffect)
    // No need to setResources here as the useEffect will do that for us

    // Recalculate project demands after resource allocation update
    // This happens through the useEffect that depends on allResources
  };

  // Filter months by selection
  const filteredMonths = months.filter((month) =>
    selectedMonths.includes(month.id)
  );

  // Filter projects to only show relevant ones (with allocations in the selected months)
  const relevantProjects = projects.filter((project) => {
    const projectDemand = projectDemands.find((d) => d.id === project.id);
    if (!projectDemand) return false;

    return Object.entries(projectDemand.monthlyDemand).some(
      ([monthId, demand]) => selectedMonths.includes(monthId) && demand > 0
    );
  });

  // Filter excluded projects to only show relevant ones
  const relevantExcludedProjects = excludedProjectsList.filter((project) => {
    const projectDemand = projectDemands.find((d) => d.id === project.id);
    if (!projectDemand) return false;

    return Object.entries(projectDemand.monthlyDemand).some(
      ([monthId, demand]) => selectedMonths.includes(monthId) && demand > 0
    );
  });

  // Toggle sidebar (for mobile)
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Select a category from the sidebar
  const selectCategory = (categoryKey) => {
    // Check if category is a main category
    const mainCategory = categories.find((cat) => cat.key === categoryKey);

    if (mainCategory) {
      // If clicked on main category
      if (selectedMainCategory === categoryKey) {
        // If already selected, clear selection
        setSelectedMainCategory(null);
      } else {
        // Otherwise select this main category
        setSelectedMainCategory(categoryKey);
        setSelectedCategory(null); // Clear any subcategory selection
      }

      // Always expand when clicking on a main category
      if (!expandedKeys[categoryKey]) {
        setExpandedKeys((prev) => ({
          ...prev,
          [categoryKey]: true,
        }));
      }
    } else {
      // Clicked on subcategory
      if (selectedCategory === categoryKey) {
        // If already selected, clear selection
        setSelectedCategory(null);
      } else {
        // Otherwise select this subcategory
        setSelectedCategory(categoryKey);
        setSelectedMainCategory(null); // Clear main category filter

        // Make sure parent category is expanded
        const parentKey = categoryKey.split("-")[0];
        if (!expandedKeys[parentKey]) {
          setExpandedKeys((prev) => ({
            ...prev,
            [parentKey]: true,
          }));
        }
      }
    }

    // On mobile, close sidebar after selection
    if (window.innerWidth <= 768) {
      setSidebarVisible(false);
    }
  };

  // Show all resources (clear filters)
  const showAllResources = () => {
    setSelectedCategory(null);
    setSelectedMainCategory(null);
  };

  // Update the expanded keys for the tree
  const onToggle = (e) => {
    setExpandedKeys(e.value);
  };

  // Toggle month selection
  const toggleMonth = (monthId) => {
    setSelectedMonths((prev) => {
      if (prev.includes(monthId)) {
        // If already selected, remove it (but ensure at least one month is selected)
        const newSelection = prev.filter((id) => id !== monthId);
        return newSelection.length > 0 ? newSelection : prev;
      } else {
        // If not selected, add it
        return [...prev, monthId];
      }
    });
  };

  // Toggle all months
  const toggleAllMonths = (select) => {
    setSelectedMonths(
      select ? months.map((month) => month.id) : [months[0].id]
    );
  };

  // Move project between active and excluded
  const toggleProjectExclusion = (projectId, currentlyExcluded) => {
    if (currentlyExcluded) {
      // Move from excluded to active
      const projectToMove = excludedProjectsList.find(
        (p) => p.id === projectId
      );
      if (projectToMove) {
        setExcludedProjectsList(
          excludedProjectsList.filter((p) => p.id !== projectId)
        );
        setProjects([...projects, projectToMove]);
      }
    } else {
      // Move from active to excluded
      const projectToMove = projects.find((p) => p.id === projectId);
      if (projectToMove) {
        setProjects(projects.filter((p) => p.id !== projectId));
        setExcludedProjectsList([...excludedProjectsList, projectToMove]);
      }
    }
  };

  // Calculate resource counts for categories
  const getCategoryResourceCount = (categoryKey) => {
    if (categoryKey.includes("-")) {
      // Subcategory - count resources with exact role
      return allResources.filter((r) => r.role === categoryKey).length;
    } else {
      // Main category - count resources with role starting with this prefix
      return allResources.filter((r) => r.role.startsWith(categoryKey + "-"))
        .length;
    }
  };

  // Value object to be provided to consumers
  const value = {
    resources,
    allResources,
    categories,
    months,
    filteredMonths,
    projects: relevantProjects,
    excludedProjects: relevantExcludedProjects,
    projectDemands,
    selectedCategory,
    selectedMainCategory,
    expandedKeys,
    selectedMonths,
    setSelectedMonths,
    sidebarVisible,
    selectCategory,
    showAllResources,
    onToggle,
    toggleMonth,
    toggleAllMonths,
    toggleProjectExclusion,
    toggleSidebar,
    getCategoryResourceCount,
    updateResourceAllocation,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
  };

  return (
    <CapacityContext.Provider value={value}>
      {children}
    </CapacityContext.Provider>
  );
};

export default CapacityContext;