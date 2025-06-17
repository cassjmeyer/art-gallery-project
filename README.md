# art-gallery-project

A modern, responsive web application that showcases artwork from the Art Institute of Chicago's Collection. Built with React and TypeScript, this single-page app provides a browsing experience with both gallery and detailed views of each piece of work.

## Features

- **Gallery View**: Browse a curated selection of artworks gathered by the Art Institute of Chicago API
- **Detail View**: Get deeper insights into individual pieces with information including origin and other details
- **Responsive Design**: Works across desktop, tablet, and mobile devices
- **Loading States**: Easy transitions between routes
- **Error Handling**: Proper handling of network issues and missing data

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library
- **Build Tool**: Webpack

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:cassjmeyer/art-gallery-project.git
   cd art-gallery-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:6688/` to view the app

## API Integration

This application uses the [Art Institute of Chicago Collection API](https://api.artic.edu/docs/), which provides free access to their extensive collection data. No API key is required.

## Testing

This includes tests covering:

- Component rendering and user interactions
- API service functions and error handling
- Custom hooks and utility functions

Run the full test suite:

```bash
npm test
```

For coverage reporting:

```bash
npm run test:coverage
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArtworkCard/    # Gallery item component
│   ├── ArtworkDetail/  # Detail view component
│   └── Layout/         # App layout and navigation
├── hooks/              # Custom React hooks
├── services/           # API integration layer
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── __tests__/          # Test files
```

## Accessibility

Built with accessibility in mind:

- Semantic HTML structure
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Alt text for all artwork images
- Reduced motion support

---

_Built with ❤️ by Cassie._
