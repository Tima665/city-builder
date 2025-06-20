# City Builder

A 3D city building web application where you can create and customize your own virtual city.

## Features

- Build various types of buildings (houses, skyscrapers, offices, etc.)
- Place natural elements like parks and rivers
- Create road networks
- Interactive 3D environment
- Hover effects and selection highlighting

## Technologies

- Next.js 15.3
- Three.js / React Three Fiber
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/city-builder.git
cd city-builder
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- **Left Click**: Place a building on an empty cell
- **Right Click**: Remove a building
- **Mouse Wheel**: Zoom in/out

## Code Formatting

This project uses Prettier for code formatting:

```bash
npm run format
```

## Project Structure and File Descriptions

### Root Directory

- `README.md`: This file, providing an overview of the project, setup instructions, and file descriptions.
- `next.config.ts`: The configuration file for Next.js. It's currently using the default configuration.
- `package.json`: Defines the project's metadata, dependencies, and scripts. Key dependencies include `next`, `react`, `three`, `@react-three/fiber`, and `@react-three/drei`. Scripts are provided for development (`dev`), building (`build`), starting (`start`), and linting (`lint`).
- `package-lock.json`: Automatically generated to lock the versions of the project's dependencies for consistent installation across different environments.
- `eslint.config.mjs`: Configuration file for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. It extends the recommended Next.js and TypeScript configurations.
- `postcss.config.mjs`: Configuration for PostCSS, a tool for transforming CSS with JavaScript plugins. It's configured to use the Tailwind CSS plugin.
- `tailwind.config.ts`: Configuration file for Tailwind CSS, a utility-first CSS framework. It defines the content paths to scan for class names and includes a custom grid template column configuration.
- `tsconfig.json`: The configuration file for the TypeScript compiler. It specifies the compiler options, such as the target ECMAScript version, module system, and path aliases (`@/*` for `./src/*`). It also defines which files to include and exclude from compilation.
- `next-env.d.ts`: A TypeScript declaration file that ensures Next.js types are picked up by the TypeScript compiler. It should not be modified.

### `public/` Directory

This directory contains all the static assets for the application.

- **`public/buildings/`**: Contains SVG files for different types of buildings that can be placed in the city.
  - `building-1.svg` to `building-10.svg`
- **`public/cursors/`**: Contains SVG files for custom mouse cursors used in the application.
  - `cross.svg`: A cursor for deleting elements.
  - `hammer.svg`: A cursor for building.
  - `not-allowed.svg`: A cursor indicating an invalid action.
  - `saw.svg`: Another cursor, possibly for destruction or modification.
- **`public/models/`**: This directory is currently empty but is likely intended to hold 3D model files (e.g., in `.gltf` or `.obj` format) for more complex structures.
- **`public/terrain/`**: Contains SVG files for different types of terrain or ground cover.
  - `forest.svg`
  - `grass.svg`
  - `river.svg`
  - `road.svg`

### `src/` Directory

This is the main directory for the application's source code.

#### `src/styles/`

This directory contains global styles and CSS files.

- `cursors.css`: Defines custom cursor styles using the SVG files from `public/cursors/`. These classes (`.cursor-hammer`, `.cursor-saw`, `.cursor-cross`, `.cursor-not-allowed-custom`) are used to change the mouse cursor's appearance based on the user's current action.

#### `src/app/`

This directory is the core of the Next.js application, following the App Router structure.

- `globals.css`: Contains global styles for the application. It imports Tailwind CSS and defines CSS variables for background and foreground colors, supporting both light and dark color schemes.
- `layout.tsx`: The root layout for the application. It sets up the HTML structure, includes the global stylesheets, and applies the `Geist` font.
- `page.tsx`: The main page component for the root URL (`/`). It displays the 2D version of the city builder, including the `GameBoard` component and a link to the 3D version. It manages the zoom level of the game board.
- `favicon.ico`: The icon for the application that is displayed in the browser tab.

##### `src/app/_components/`

This directory contains React components used in the 2D version of the application. The underscore indicates that these are private components, not routable pages.

- `Cell.tsx`: Represents a single cell in the `GameBoard`. It handles its own state (like hover), determines its appearance and cursor based on its type (`empty`, `building`, `road`, etc.), and processes user clicks (left-click to build, right-click to remove).
- `GameBoard.tsx`: The main component for the 2D city grid. It initializes a 10x10 grid with some pre-placed terrain features (rivers, forests, roads). It manages the state of the entire grid, handles user input for building and demolition, and implements the zoom functionality. It also displays the coordinates and type of the currently hovered cell.

#### `src/app/3d/`

This directory contains the 3D version of the city builder.

- `page.tsx`: The entry point for the `/3d` route. Similar to the 2D version's `page.tsx`, it manages the grid state and user interactions (clicking, hovering). It renders the `GameBoard3D` component and passes the necessary data and callbacks to it. It also includes a link back to the 2D version.

##### `src/app/3d/_components/`

This directory holds the React components specifically for the 3D view.

- `Building3D.tsx`: A key component that acts as a selector for different types of 3D buildings. Based on the `type` prop it receives, it renders the corresponding 3D model component from the `Cells` directory. It also handles the hover effect by changing the building's colors.
- `GameBoard3D.tsx`: This is the main component for the 3D experience. It sets up the `react-three-fiber` `Canvas`, including lights, camera controls (`OrbitControls`), and a ground plane. It iterates over the grid data and renders a `Cell3D` component for each cell.
  - The `Cell3D` sub-component within `GameBoard3D.tsx` is responsible for rendering individual cells. It displays a simple box for empty cells, but for cells with buildings, parks, roads, or rivers, it renders the appropriate 3D model using the `Building3D` component or a specific `Cell` component (like `River`). It handles clicks and hover events on each cell.

###### `src/app/3d/_components/Cells/`

This directory contains all the individual 3D model components for the various elements that can be placed on the grid.

- `index.ts`: Exports all the components from this directory for easy import elsewhere.
- **Component Files** (`Cottage.tsx`, `Factory.tsx`, `Hospital.tsx`, `House.tsx`, `ModernSkyscraper.tsx`, `Office.tsx`, `Park.tsx`, `River.tsx`, `Road.tsx`, `Shop.tsx`, `SimpleHouse.tsx`, `Skyscraper.tsx`, `Stadium.tsx`): Each of these files defines the geometry of a specific 3D object using primitives from `@react-three/drei` (like `Box`, `Cone`, `Cylinder`). They are composed to create the visual representation of the building or terrain feature. They are all receive position and color information as props.

###### `src/app/3d/_components/utils/`

This directory contains utility functions for the 3D components.

- `getBuildingColors.ts`: Exports a function that returns a color palette (main, secondary, roof, windows) for a given `BuildingType`. This allows for consistent and centralized color management for all the 3D models.
- `index.ts`: Exports the utility functions from this directory.
