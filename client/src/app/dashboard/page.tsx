// tsrafce
'use client';

import CardPopularProducts from './CardPopularProducts';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardSalesSummary from './CardSalesSummary';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-4 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <div className="row-span-3 bg-purple-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-green-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-yellow-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-pink-500"></div>
    </div>
  );
};

export default Dashboard;
