// OverviewCard.jsx
import React from 'react';

const OverviewCard = ({ title, count, amount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between w-60">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {count !== undefined && <p className="text-2xl font-bold text-indigo-600">{count}</p>}
      {amount && <p className="text-xl text-green-600 font-semibold">₹{amount}</p>}
    </div>
  );
};

export default OverviewCard;
