/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/about",
  "/market",
  "/contact",
  "/privacy",
  "/terms",
  "/auth/new-verification",
];

/**
 * An array of non dashboard routes that are not accessible to the public
 * These routes require authentication
 * @type {string[]}
 */
export const otherRoutes = ["/payments/process"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to their various roles
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/register/individual",
  "/auth/register/organization",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * An object containing login routes for each user roles
 * Each users will be redirected to these routes after login
 * @type {object}
 */
export const loginRoutes: Record<string, string> = {
  admin: "/admin/overview",
  seller: "/seller/overview",
  buyer: "/buyer/overview",
};
