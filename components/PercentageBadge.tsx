import React from 'react';

interface PercentageBadgeProps {
  value: string;
}

const PercentageBadge: React.FC<PercentageBadgeProps> = ({ value }) => {
  return (
    <span className="inline-block px-1.5 py-0.5 bg-red-500 text-white rounded text-xs font-medium shadow-sm">
      {value}
    </span>
  );
};

export default PercentageBadge; 