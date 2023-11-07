import { useState, useEffect } from 'react';

// Custom Hook for window resize
export function useMobileDataZoomStart(defaultStart = 60, mobileStart = 90, breakpoint = 768) {
  const [dataZoomStart, setDataZoomStart] = useState(defaultStart);

  useEffect(() => {
    function handleResize() {
      setDataZoomStart(window.innerWidth <= breakpoint ? mobileStart : defaultStart);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the value

    return () => window.removeEventListener('resize', handleResize);
  }, [defaultStart, mobileStart, breakpoint]);

  return dataZoomStart;
}
