Refactor: migrate to ES6 modules with improved architecture and security

FEATURES:
- Convert all files from CommonJS to ES6 modules with proper imports/exports
- Separate app.js (Express config) from server.js (infrastructure) for better testability
- Replace try-catch blocks with asyncHandler wrapper for cleaner async/await patterns
- Improve error handling with centralized middleware for JWT, Mongoose, and validation errors
- Standardize response formats and error messages across API

FUTURE IMPROVEMENTS:
- Remove critical security vulnerability (Function.constructor usage in getCookie)
- Add comprehensive input validation across all user endpoints
- Enhance auth middleware with better token verification and role-based access control
- Update Cloudinary imports to v2 API and add default avatar handling
- Add JSDoc documentation to all controller functions

BREAKING CHANGES:
- Requires "type": "module" in package.json
- All imports must include .js file extensions
- Node.js 18+ required for ES6 module support
