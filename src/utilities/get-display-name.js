/**
 * Wrap the display name of a rendered component inside a HOC for easy debugging.
 * https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
 * @param {Class|Function} WrappedCmp
 * @return {Class|Function}
 */
export default (WrappedCmp) => WrappedCmp.displayName || WrappedCmp.name || `Component`;
