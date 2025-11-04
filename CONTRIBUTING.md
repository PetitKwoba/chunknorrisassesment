# Contributing to Chuck Norris Jokes App

First off, thank you for considering contributing to this project! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots** if applicable
- **Mention your browser and OS version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternatives** you've considered

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure everything works (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### Pull Request Guidelines

- Update the README.md with details of changes if applicable
- Follow the existing code style
- Add tests if you're adding functionality
- Ensure all tests pass
- Update documentation as needed
- Keep pull requests focused on a single feature or fix

### Code Style

- Use meaningful variable and function names
- Add JSDoc comments for functions and components
- Follow React best practices and hooks guidelines
- Use Material-UI components consistently
- Keep components small and focused
- Use PropTypes for type checking

### Testing

- Write tests for new features
- Ensure all existing tests pass
- Test in multiple browsers if possible
- Test responsive design on different screen sizes

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example:
```
Add infinite scroll feature

- Implemented IntersectionObserver for lazy loading
- Added Load More button as fallback
- Fixes #123
```

## Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/PetitKwoba/chunknorrisassesment.git
   cd chunknorrisassesment
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Run tests
   ```bash
   npm test
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── App.js              # Main application component
├── JokeCard.js         # Individual joke card component
├── ErrorBoundary.js    # Error boundary wrapper
├── index.js            # Application entry point
├── setupTests.js       # Test configuration
└── __tests__/          # Test files
    └── JokeCard.test.js
```

## Questions?

Feel free to open an issue or reach out to [Emmanuel P. Kwoba](https://petitportfolio.netlify.app/).

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team.

---

Thank you for contributing! 🙏
