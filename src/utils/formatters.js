/**
 * Utility functions for formatting and transforming data
 */
export const formatters = {
  /**
   * Capitalize the first letter of a string
   * @param {string} str - Input string to capitalize
   * @returns {string} Capitalized string
   */
  capitalizeFirstLetter: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Format phone number to a more readable format
   * @param {string} phoneNumber - Raw phone number
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber: (phoneNumber) => {
    if (!phoneNumber) return 'N/A';
    
    // Remove all non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    // Check if the number has valid length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phoneNumber;
  },

  /**
   * Truncate text to specified length
   * @param {string} text - Input text
   * @param {number} maxLength - Maximum length of text
   * @param {string} [suffix='...'] - Suffix to add if text is truncated
   * @returns {string} Truncated text
   */
  truncateText: (text, maxLength, suffix = '...') => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + suffix;
  },

  /**
   * Format address into a single, readable string
   * @param {Object} address - Address object from API
   * @returns {string} Formatted address string
   */
  formatAddress: (address) => {
    if (!address) return 'Address not available';
    
    const addressParts = [
      address.street,
      address.suite,
      address.city,
      address.zipcode
    ];
    
    return addressParts.filter(part => part).join(', ');
  },

  /**
   * Generate initials from a full name
   * @param {string} fullName - Full name of a person
   * @returns {string} Initials
   */
  getInitials: (fullName) => {
    if (!fullName) return '??';
    
    return fullName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  },

  /**
   * Safely extract nested object properties
   * @param {Object} obj - Source object
   * @param {string} path - Dot-separated path to property
   * @param {*} defaultValue - Default value if property not found
   * @returns {*} Property value or default value
   */
  safeGet: (obj, path, defaultValue = null) => {
    return path.split('.').reduce((acc, part) => 
      acc && acc[part] !== undefined ? acc[part] : defaultValue, obj);
  }
};

// Example usage
export const formatUserData = (user) => ({
  fullName: formatters.capitalizeFirstLetter(user.name),
  formattedPhone: formatters.formatPhoneNumber(user.phone),
  initials: formatters.getInitials(user.name),
  formattedAddress: formatters.formatAddress(user.address)
});