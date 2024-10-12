const reportWebVitals = async (onPerfEntry) => {
  // Check if onPerfEntry is a valid function
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      // Import web-vitals dynamically
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

      // Check if all functions are defined
      if (getCLS && getFID && getFCP && getLCP && getTTFB) {
        // Register performance metrics
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      } else {
        console.error('One or more performance metrics functions are not defined.');
      }
    } catch (error) {
      console.error('Error importing web-vitals:', error);
    }
  }
};

export default reportWebVitals;
