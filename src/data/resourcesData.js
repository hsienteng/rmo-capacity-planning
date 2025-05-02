// This file contains the resource data structure for the capacity planning application

// Resource roles/categories (for sidebar)
export const resourceCategories = [
  {
    key: "design",
    label: "Design",
    icon: "pi pi-palette",
    children: [
      { key: "design-ux", label: "UX Designer", icon: "pi pi-user-edit" },
      { key: "design-ui", label: "UI Designer", icon: "pi pi-pencil" },
      { key: "design-product", label: "Product Designer", icon: "pi pi-box" },
      { key: "design-graphic", label: "Graphic Designer", icon: "pi pi-image" },
      { key: "design-motion", label: "Motion Designer", icon: "pi pi-video" },
    ],
  },
  {
    key: "cap",
    label: "CAP",
    icon: "pi pi-briefcase",
    children: [
      { key: "cap-architect", label: "Architect", icon: "pi pi-building" },
      {
        key: "cap-backend",
        label: "Backend Developer",
        icon: "pi pi-database",
      },
      {
        key: "cap-frontend",
        label: "Frontend Developer",
        icon: "pi pi-desktop",
      },
      {
        key: "cap-fullstack",
        label: "Full Stack Developer",
        icon: "pi pi-code",
      },
      { key: "cap-junior", label: "Junior Developer", icon: "pi pi-code" },
      { key: "cap-devops", label: "DevOps Engineer", icon: "pi pi-server" },
      { key: "cap-qa", label: "QA Engineer", icon: "pi pi-check-square" },
      { key: "cap-mobile", label: "Mobile Developer", icon: "pi pi-mobile" },
    ],
  },
  {
    key: "ai",
    label: "AI & Data",
    icon: "pi pi-chart-bar",
    children: [
      {
        key: "ai-data-scientist",
        label: "Data Scientist",
        icon: "pi pi-chart-line",
      },
      {
        key: "ai-data-engineer",
        label: "Data Engineer",
        icon: "pi pi-database",
      },
      { key: "ai-ml-engineer", label: "ML Engineer", icon: "pi pi-cog" },
      {
        key: "ai-data-analyst",
        label: "Data Analyst",
        icon: "pi pi-chart-pie",
      },
      {
        key: "ai-research",
        label: "AI Research Scientist",
        icon: "pi pi-bolt",
      },
    ],
  },
  {
    key: "consulting",
    label: "Consulting",
    icon: "pi pi-users",
    children: [
      {
        key: "consulting-ba",
        label: "Business Analyst",
        icon: "pi pi-file-edit",
      },
      {
        key: "consulting-pm",
        label: "Project Manager",
        icon: "pi pi-calendar",
      },
      {
        key: "consulting-delivery",
        label: "Delivery Manager",
        icon: "pi pi-truck",
      },
      {
        key: "consulting-strategy",
        label: "Strategy Consultant",
        icon: "pi pi-compass",
      },
      {
        key: "consulting-transformation",
        label: "Digital Transformation",
        icon: "pi pi-sync",
      },
    ],
  },
  {
    key: "low",
    label: "Low Code",
    icon: "pi pi-sliders-h",
    children: [
      { key: "low-architect", label: "Low Code Architect", icon: "pi pi-cog" },
      {
        key: "low-developer",
        label: "Low Code Developer",
        icon: "pi pi-wrench",
      },
      {
        key: "low-designer",
        label: "Low Code Designer",
        icon: "pi pi-palette",
      },
      { key: "low-admin", label: "Low Code Admin", icon: "pi pi-user-plus" },
      {
        key: "low-consultant",
        label: "Low Code Consultant",
        icon: "pi pi-comments",
      },
    ],
  },
  {
    key: "infra",
    label: "Infrastructure",
    icon: "pi pi-server",
    children: [
      { key: "infra-cloud", label: "Cloud Engineer", icon: "pi pi-cloud" },
      { key: "infra-network", label: "Network Engineer", icon: "pi pi-wifi" },
      {
        key: "infra-security",
        label: "Security Engineer",
        icon: "pi pi-shield",
      },
      {
        key: "infra-sysadmin",
        label: "System Administrator",
        icon: "pi pi-cog",
      },
      { key: "infra-devops", label: "DevOps Engineer", icon: "pi pi-sync" },
    ],
  },
];

// Resource data (individuals)
export const resourcesData = [
  // Design Team
  {
    id: 1,
    name: "Brian Denesik",
    role: "design-ux",
    category: "Design / UX Designer",
  },
  {
    id: 2,
    name: "Cici Westbrook",
    role: "design-ui",
    category: "Design / UI Designer",
  },
  {
    id: 3,
    name: "Jamal Washington",
    role: "design-product",
    category: "Design / Product Designer",
  },
  {
    id: 4,
    name: "Linda Kim",
    role: "design-graphic",
    category: "Design / Graphic Designer",
  },
  {
    id: 5,
    name: "Oliver Taylor",
    role: "design-motion",
    category: "Design / Motion Designer",
  },

  // CAP Team
  {
    id: 6,
    name: "Bruce Nguyen",
    role: "cap-architect",
    category: "CAP / Architect",
  },
  {
    id: 7,
    name: "Eram Dhamani",
    role: "cap-backend",
    category: "CAP / Backend Developer",
  },
  {
    id: 8,
    name: "Brendan Corrigan",
    role: "cap-frontend",
    category: "CAP / Frontend Developer",
  },
  {
    id: 9,
    name: "Mark Xie",
    role: "cap-fullstack",
    category: "CAP / Full Stack Developer",
  },
  {
    id: 10,
    name: "Maya Johnson",
    role: "cap-junior",
    category: "CAP / Junior Developer",
  },
  {
    id: 11,
    name: "Bruce Nguyen",
    role: "cap-devops",
    category: "CAP / DevOps Engineer",
  },
  {
    id: 12,
    name: "James Wilson",
    role: "cap-qa",
    category: "CAP / QA Engineer",
  },
  {
    id: 13,
    name: "Priya Patel",
    role: "cap-mobile",
    category: "CAP / Mobile Developer",
  },

  // AI & Data Team
  {
    id: 14,
    name: "Brandon Corrigan",
    role: "ai-data-scientist",
    category: "AI & Data / Data Scientist",
  },
  {
    id: 15,
    name: "Emma Rodriguez",
    role: "ai-data-engineer",
    category: "AI & Data / Data Engineer",
  },
  {
    id: 16,
    name: "Kai Tanaka",
    role: "ai-ml-engineer",
    category: "AI & Data / ML Engineer",
  },
  {
    id: 17,
    name: "Aisha Khan",
    role: "ai-data-analyst",
    category: "AI & Data / Data Analyst",
  },
  {
    id: 18,
    name: "Dr. Martin Wei",
    role: "ai-research",
    category: "AI & Data / AI Research Scientist",
  },

  // Consulting Team
  {
    id: 19,
    name: "David Chen",
    role: "consulting-ba",
    category: "Consulting / Business Analyst",
  },
  {
    id: 20,
    name: "Sarah Johnson",
    role: "consulting-pm",
    category: "Consulting / Project Manager",
  },
  {
    id: 21,
    name: "Michael Brown",
    role: "consulting-delivery",
    category: "Consulting / Delivery Manager",
  },
  {
    id: 22,
    name: "Alexandra Garcia",
    role: "consulting-strategy",
    category: "Consulting / Strategy Consultant",
  },
  {
    id: 23,
    name: "Thomas Schmidt",
    role: "consulting-transformation",
    category: "Consulting / Digital Transformation",
  },

  // Low Code Team
  {
    id: 24,
    name: "Cai Wentao",
    role: "low-architect",
    category: "Low Code / Low Code Architect",
  },
  {
    id: 25,
    name: "Gabriel Seiter",
    role: "low-developer",
    category: "Low Code / Low Code Developer",
  },
  {
    id: 26,
    name: "Ravi Mehta",
    role: "low-designer",
    category: "Low Code / Low Code Designer",
  },
  {
    id: 27,
    name: "Jennifer Lopez",
    role: "low-admin",
    category: "Low Code / Low Code Admin",
  },
  {
    id: 28,
    name: "Dong Ying Lin",
    role: "low-consultant",
    category: "Low Code / Low Code Consultant",
  },

  // Infrastructure Team
  {
    id: 29,
    name: "Gunjan Sankhumar Goja",
    role: "infra-cloud",
    category: "Infrastructure / Cloud Engineer",
  },
  {
    id: 30,
    name: "Aria Patel",
    role: "infra-network",
    category: "Infrastructure / Network Engineer",
  },
  {
    id: 31,
    name: "Marcus Johnson",
    role: "infra-security",
    category: "Infrastructure / Security Engineer",
  },
  {
    id: 32,
    name: "Liam Wilson",
    role: "infra-sysadmin",
    category: "Infrastructure / System Administrator",
  },
  {
    id: 33,
    name: "Elena Sanchez",
    role: "infra-devops",
    category: "Infrastructure / DevOps Engineer",
  },
];

// Generate allocation data for each resource and month
export const monthsData = [
  { id: "mar-2025", label: "MAR-2025" },
  { id: "apr-2025", label: "APR-2025" },
  { id: "may-2025", label: "MAY-2025" },
  { id: "jun-2025", label: "JUN-2025" },
  { id: "jul-2025", label: "JUL-2025" },
  { id: "aug-2025", label: "AUG-2025" },
  { id: "sep-2025", label: "SEP-2025" },
  { id: "oct-2025", label: "OCT-2025" },
  { id: "nov-2025", label: "NOV-2025" },
];

// Project name dictionary for shorter names in display
const projectDict = {
  p1: "Website Redesign",
  p2: "API Development",
  p3: "Mobile App",
  p4: "Cloud Migration",
  p5: "Data Analytics",
  p6: "Low Code Platform",
  p7: "Security Audit",
  p8: "Customer Dashboard",
  p9: "Microservices",
  p10: "IoT Platform",
  general: "General Activities",
};

// Helper function to determine allocation class based on percentage
function getAllocationClass(percentage) {
  if (percentage === 0) return "allocation-0";
  if (percentage < 50) return "allocation-1"; // Under-allocated
  if (percentage < 90) return "allocation-2"; // Partially allocated
  if (percentage <= 100) return "allocation-3"; // Fully allocated
  return "allocation-4"; // Over-allocated
}

// Create predefined allocation patterns for specific resources to match the image example
const specificAllocations = {
  7: {
    "mar-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "apr-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "may-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jun-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jul-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "aug-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "sep-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "oct-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "nov-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
  },

  // Brendan Corrigan (Frontend Developer)
  8: {
    "mar-2025": {
      totalAllocation: 100,
      allocationClass: "allocation-3",
      projectAllocations: [
        { projectId: "p1", projectName: projectDict["p1"], allocation: 100 },
      ],
    },
    "apr-2025": {
      totalAllocation: 50,
      allocationClass: "allocation-2",
      projectAllocations: [
        { projectId: "p1", projectName: projectDict["p1"], allocation: 50 },
      ],
    },
    "may-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jun-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jul-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "aug-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "sep-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "oct-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "nov-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
  },

  // Bruce Nguyen (DevOps Engineer)
  11: {
    "mar-2025": {
      totalAllocation: 100,
      allocationClass: "allocation-3",
      projectAllocations: [
        { projectId: "p2", projectName: projectDict["p2"], allocation: 100 },
      ],
    },
    "apr-2025": {
      totalAllocation: 50,
      allocationClass: "allocation-2",
      projectAllocations: [
        { projectId: "p2", projectName: projectDict["p2"], allocation: 50 },
      ],
    },
    "may-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jun-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jul-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "aug-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "sep-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "oct-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "nov-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
  },

  // Cici Westbrook (UI Designer)
  2: {
    "mar-2025": {
      totalAllocation: 80,
      allocationClass: "allocation-2",
      projectAllocations: [
        { projectId: "p1", projectName: projectDict["p1"], allocation: 80 },
      ],
    },
    "apr-2025": {
      totalAllocation: 20,
      allocationClass: "allocation-1",
      projectAllocations: [
        { projectId: "p1", projectName: projectDict["p1"], allocation: 20 },
      ],
    },
    "may-2025": {
      totalAllocation: 100,
      allocationClass: "allocation-3",
      projectAllocations: [
        { projectId: "p3", projectName: projectDict["p3"], allocation: 100 },
      ],
    },
    "jun-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "jul-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "aug-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "sep-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "oct-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
    "nov-2025": {
      totalAllocation: 0,
      allocationClass: "allocation-0",
      projectAllocations: [],
    },
  },
};

// Generate realistic allocation patterns for each resource type
function generateAllocationPattern(resource, months) {
  // If this resource has predefined allocations, use those
  if (specificAllocations[resource.id]) {
    return specificAllocations[resource.id];
  }

  const allocations = {};

  // Base patterns for different roles
  const patterns = {
    // Design tends to have concentrated periods of high allocation
    design: () => {
      let currentAllocation = Math.floor(Math.random() * 60) + 20; // Start at 20-80%
      let primaryProject = "p" + (Math.floor(Math.random() * 3) + 1); // p1, p2, or p3
      let secondaryProject = "p" + (Math.floor(Math.random() * 3) + 4); // p4, p5, or p6

      months.forEach((month) => {
        // Designers often have concentrated periods of work
        if (Math.random() > 0.7) {
          currentAllocation = Math.floor(Math.random() * 60) + 40; // Jump to 40-100%
        } else {
          // Slight variations
          currentAllocation += Math.floor(Math.random() * 30) - 15;
          currentAllocation = Math.max(0, Math.min(currentAllocation, 100));
        }

        const projectAllocations = [];

        if (currentAllocation > 0) {
          // Split between 1-2 projects
          if (currentAllocation > 60 && Math.random() > 0.5) {
            // Two projects
            const firstAllocation = Math.floor(currentAllocation * 0.6);
            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: firstAllocation,
            });

            projectAllocations.push({
              projectId: secondaryProject,
              projectName: projectDict[secondaryProject] || secondaryProject,
              allocation: currentAllocation - firstAllocation,
            });
          } else {
            // One project
            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: currentAllocation,
            });
          }
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },

    // CAP tends to have more stable, high allocations
    cap: () => {
      let currentAllocation = Math.floor(Math.random() * 30) + 70; // Start at 70-100%
      let primaryProject = "p" + (Math.floor(Math.random() * 3) + 1); // p1, p2, or p3
      let secondaryProject = "p" + (Math.floor(Math.random() * 3) + 4); // p4, p5, or p6

      months.forEach((month) => {
        // Developers often have sustained periods of high allocation
        currentAllocation += Math.floor(Math.random() * 20) - 10;
        currentAllocation = Math.max(50, Math.min(currentAllocation, 110)); // CAP can get overallocated

        const projectAllocations = [];

        // Split between 1-3 projects
        if (Math.random() > 0.7) {
          // Three projects
          const firstAllocation = Math.floor(currentAllocation * 0.5);
          const secondAllocation = Math.floor(currentAllocation * 0.3);

          projectAllocations.push({
            projectId: primaryProject,
            projectName: projectDict[primaryProject] || primaryProject,
            allocation: firstAllocation,
          });

          projectAllocations.push({
            projectId: secondaryProject,
            projectName: projectDict[secondaryProject] || secondaryProject,
            allocation: secondAllocation,
          });

          projectAllocations.push({
            projectId: "general",
            projectName: projectDict["general"],
            allocation: currentAllocation - firstAllocation - secondAllocation,
          });
        } else if (Math.random() > 0.5) {
          // Two projects
          const firstAllocation = Math.floor(currentAllocation * 0.7);

          projectAllocations.push({
            projectId: primaryProject,
            projectName: projectDict[primaryProject] || primaryProject,
            allocation: firstAllocation,
          });

          projectAllocations.push({
            projectId: secondaryProject,
            projectName: projectDict[secondaryProject] || secondaryProject,
            allocation: currentAllocation - firstAllocation,
          });
        } else {
          // One project
          projectAllocations.push({
            projectId: primaryProject,
            projectName: projectDict[primaryProject] || primaryProject,
            allocation: currentAllocation,
          });
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },

    // AI & Data tends to have variable allocation
    ai: () => {
      let primaryProject = "p" + (Math.floor(Math.random() * 3) + 5); // p5, p6, or p7
      let secondaryProject = "p" + (Math.floor(Math.random() * 3) + 8); // p8, p9, or p10

      months.forEach((month) => {
        // More sporadic allocation patterns
        const currentAllocation = Math.floor(Math.random() * 100);
        const projectAllocations = [];

        if (currentAllocation > 0) {
          if (currentAllocation > 50 && Math.random() > 0.6) {
            // Two projects
            const firstAllocation = Math.floor(currentAllocation * 0.6);

            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: firstAllocation,
            });

            projectAllocations.push({
              projectId: secondaryProject,
              projectName: projectDict[secondaryProject] || secondaryProject,
              allocation: currentAllocation - firstAllocation,
            });
          } else {
            // One project
            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: currentAllocation,
            });
          }
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },

    // Consulting tends to have multiple partial allocations
    consulting: () => {
      let primaryProject = "p" + (Math.floor(Math.random() * 10) + 1); // p1 to p10
      let secondaryProject = "p" + (Math.floor(Math.random() * 10) + 1); // p1 to p10

      // Make sure projects are different
      while (secondaryProject === primaryProject) {
        secondaryProject = "p" + (Math.floor(Math.random() * 10) + 1);
      }

      let thirdProject = "p" + (Math.floor(Math.random() * 10) + 1); // p1 to p10

      // Make sure projects are all different
      while (
        thirdProject === primaryProject ||
        thirdProject === secondaryProject
      ) {
        thirdProject = "p" + (Math.floor(Math.random() * 10) + 1);
      }

      months.forEach((month) => {
        // Often split across projects
        const currentAllocation = Math.floor(Math.random() * 40) + 60; // 60-100%
        const projectAllocations = [];

        // Always split between 2-3 projects
        if (Math.random() > 0.5) {
          // Three projects
          const firstAllocation = Math.floor(currentAllocation * 0.4);
          const secondAllocation = Math.floor(currentAllocation * 0.3);

          projectAllocations.push({
            projectId: primaryProject,
            projectName: projectDict[primaryProject] || primaryProject,
            allocation: firstAllocation,
          });

          projectAllocations.push({
            projectId: secondaryProject,
            projectName: projectDict[secondaryProject] || secondaryProject,
            allocation: secondAllocation,
          });

          projectAllocations.push({
            projectId: thirdProject,
            projectName: projectDict[thirdProject] || thirdProject,
            allocation: currentAllocation - firstAllocation - secondAllocation,
          });
        } else {
          // Two projects
          const firstAllocation = Math.floor(currentAllocation * 0.6);

          projectAllocations.push({
            projectId: primaryProject,
            projectName: projectDict[primaryProject] || primaryProject,
            allocation: firstAllocation,
          });

          projectAllocations.push({
            projectId: secondaryProject,
            projectName: projectDict[secondaryProject] || secondaryProject,
            allocation: currentAllocation - firstAllocation,
          });
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },

    // Low Code tends to have phases of high and low allocation
    low: () => {
      let currentAllocation = Math.floor(Math.random() * 60) + 20; // Start at 20-80%
      let trending = Math.random() > 0.5 ? 1 : -1; // Initial trend
      let primaryProject = "p6"; // Low Code Platform
      let secondaryProject = "p" + (Math.floor(Math.random() * 3) + 1); // p1, p2, or p3

      months.forEach((month, index) => {
        if (index > 0 && index % 3 === 0) {
          trending *= -1; // Change trend every quarter
        }

        currentAllocation += trending * (Math.floor(Math.random() * 20) + 5);
        currentAllocation = Math.max(0, Math.min(currentAllocation, 100));

        const projectAllocations = [];

        if (currentAllocation > 0) {
          if (currentAllocation > 40 && Math.random() > 0.4) {
            // Two projects
            const firstAllocation = Math.floor(currentAllocation * 0.7);

            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: firstAllocation,
            });

            projectAllocations.push({
              projectId: secondaryProject,
              projectName: projectDict[secondaryProject] || secondaryProject,
              allocation: currentAllocation - firstAllocation,
            });
          } else {
            // One project
            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: currentAllocation,
            });
          }
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },

    // Infrastructure tends to have baseline allocation with spikes
    infra: () => {
      let baseAllocation = Math.floor(Math.random() * 30) + 40; // 40-70% base
      let primaryProject = "p4"; // Cloud Migration
      let secondaryProject = "p7"; // Security Audit

      months.forEach((month) => {
        // Occasional spikes for deployments, etc.
        let currentAllocation = baseAllocation;

        if (Math.random() > 0.7) {
          currentAllocation += Math.floor(Math.random() * 50); // Add 0-50%
          currentAllocation = Math.min(currentAllocation, 120); // Can get heavily overallocated
        }

        const projectAllocations = [];

        if (currentAllocation > 0) {
          if (currentAllocation > 80 && Math.random() > 0.5) {
            // Two projects during peaks
            const firstAllocation = Math.floor(currentAllocation * 0.6);

            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: firstAllocation,
            });

            projectAllocations.push({
              projectId: secondaryProject,
              projectName: projectDict[secondaryProject] || secondaryProject,
              allocation: currentAllocation - firstAllocation,
            });
          } else {
            // Normally on one project
            projectAllocations.push({
              projectId: primaryProject,
              projectName: projectDict[primaryProject] || primaryProject,
              allocation: currentAllocation,
            });
          }
        }

        allocations[month.id] = {
          totalAllocation: currentAllocation,
          allocationClass: getAllocationClass(currentAllocation),
          projectAllocations: projectAllocations,
        };
      });
    },
  };

  // Determine which pattern to use based on role prefix
  const rolePrefix = resource.role.split("-")[0];
  const patternFn =
    patterns[rolePrefix] ||
    (() => {
      // Default random pattern if no specific pattern is found
      months.forEach((month) => {
        const allocation = Math.floor(Math.random() * 101);
        allocations[month.id] = {
          totalAllocation: allocation,
          allocationClass: getAllocationClass(allocation),
          projectAllocations: [],
        };
      });
    });

  patternFn();
  return allocations;
}

// Allocation percentages for each resource and month with realistic patterns
export const resourceAllocations = resourcesData.map((resource) => {
  const allocations = generateAllocationPattern(resource, monthsData);

  return {
    ...resource,
    allocations,
  };
});