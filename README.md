# RMO Capacity Planning

A modern capacity planning application built with Vite, React, and PrimeReact, styled according to the RMO Project Draft Figma design guidelines.

## Features

- View resource capacity and allocation over a timeline (monthly)
- Interactive sidebar with hierarchical resource categories
- Color-coded allocation visualization
- Project demand tracking
- Excluded project management
- Responsive design for mobile and desktop
- Styled according to the RMO Project Draft Figma design system

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone this repository:

```bash
git clone https://github.com/hsienteng/rmo-capacity-planning.git
cd rmo-capacity-planning
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Design Implementation

This application implements the styling from the RMO Project Draft Figma design:

### Brand Colors
- Primary Blue: #0059DB
- Dark Blue: #00244C
- Accent Orange: #FF8E00
- Success Green: #2DC653
- Warning Yellow: #FFD600
- Danger Red: #FF3D00

### Design Features
- Clean, modern UI with appropriate spacing and visual hierarchy
- Consistent shadows and border radius
- Interactive elements with hover states
- Color-coded allocation cells for easy visualization
- Mobile-responsive layout with a collapsible sidebar
- Custom tooltips for detailed information

### Component Styling
- Cards with subtle shadows and consistent padding
- Tabbed interface for different views
- Hierarchical sidebar navigation
- Resource allocation table with tooltips
- Project lists with priority tags
- Interactive filters and dropdowns

## Project Structure

```
/
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Main app component
│   ├── assets/               # Static assets like images
│   │   └── logo.svg
│   ├── components/           # UI components
│   │   ├── CapacityPlanning.jsx
│   │   ├── ResourceSidebar.jsx
│   │   ├── CapacityTable.jsx
│   │   ├── ProjectsList.jsx
│   │   └── AllocationEditModal.jsx
│   ├── data/                 # Sample data
│   │   ├── resourcesData.js
│   │   └── projectsData.js
│   ├── context/              # React context for state management
│   │   └── CapacityContext.jsx
│   └── styles/               # CSS styles
│       └── index.css
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment

The application is configured for GitHub Pages deployment:

```bash
npm run deploy
# or
yarn deploy
```

## User Stories Implemented

- Resource capacity visualization over a timeline
- Resource allocation with project breakdown
- Visual distinction for allocation levels
- Project demand tracking
- Excluded project management

## Technology Stack

- [Vite](https://vitejs.dev/) - Build tooling
- [React](https://reactjs.org/) - UI framework
- [PrimeReact](https://primereact.org/) - UI component library
- [PrimeFlex](https://primereact.org/primeflex/) - CSS utility classes