# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-04

### Added
- Initial release of Chuck Norris Jokes App
- Random joke fetching from Chuck Norris API
- Category filtering system (explicit content excluded)
- Like/favorite functionality with localStorage persistence
- Infinite scroll with IntersectionObserver
- "Load More" button as fallback for infinite scroll
- Name replacement feature (replace Chuck Norris with custom names)
- Copy to clipboard functionality
- Toast notifications for user actions
- Custom skeleton loaders with pulse animation
- Fade-in animations for jokes
- Material-UI responsive design
- Error boundary for graceful error handling
- Empty state messages
- Accessibility improvements (ARIA labels)
- Heart icons for like/unlike actions
- Card hover effects
- PropTypes validation
- Unit tests for JokeCard component
- Comprehensive documentation

### Developer Experience
- JSDoc comments for all major functions
- ESLint configuration
- Vercel deployment configuration
- GitHub Actions ready
- Contributing guidelines
- MIT License

### Fixed
- CORS issues with Chuck Norris API using CRA proxy
- Material-UI lab compatibility issues by using custom components
- Vercel deployment routing configuration
- Mobile responsiveness issues

### Changed
- Migrated from ICNDB API to Chuck Norris API
- Upgraded dependencies to latest compatible versions
- Improved code organization and documentation

### Dependencies
- React 17.0.2
- Material-UI 4.12.4
- React Testing Library 12.1.5
- React Scripts 5.0.1
- Node.js >= 18.0.0

### Deployment
- Live on Vercel: https://chunknorris-jykg.vercel.app/
- GitHub Repository: https://github.com/PetitKwoba/chunknorrisassesment

---

## [Unreleased]

### Planned Features
- Dark mode toggle
- Virtual scrolling for large lists
- Search/filter within loaded jokes
- Export favorites functionality
- Share to social media
- Keyboard shortcuts
- More comprehensive test coverage
- Performance optimizations
- PWA features

---

*For detailed information about changes, see the [commit history](https://github.com/PetitKwoba/chunknorrisassesment/commits/development).*
