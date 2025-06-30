import React from 'react';
import '../admin.css';
import AdminHomeCards from './AdminHomeCards/AdminHomeCards';
import RevenueUpdates from './RevenueUpdates/RevenueUpdates';
import EarningsCards from './EarningsCards/EarningsCards';
import TopPerformers from './Stats/TopPerformers';
import WeeklyStats from './Stats/WeeklyStats';

const Page = () => {
  return (
<>
<div className='main-div'>
  <AdminHomeCards />
  {/* <div className="chartsdiv">
  <RevenueUpdates />
  <EarningsCards />
  </div> 
  <div className="statschart">
  <WeeklyStats/>
  <TopPerformers/>
  </div> */}
  </div>
</>   
   );
};

export default Page;
