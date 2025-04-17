
import React from 'react';
import Publishers from './Publishers'; // Importing the existing Publishers component

// This is just a wrapper that reuses the Publishers component
// We're doing this to maintain the same functionality but with the new name
const Developers: React.FC = () => {
  return <Publishers />;
};

export default Developers;
