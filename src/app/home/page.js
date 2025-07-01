import Banner from "./Banner/Banner";
import DailyStaples from "./DailyStaples/DailyStaples";
import DiscountBanner from "./DiscountBanner/DiscountBanner";
import GoToSuppliers from "./GoToSuppliers/GoToSuppliers";
import HeritageStats from "./HeritageStats/HeritageStats";
import InfoCards from "./InfoCards/InfoCards";
import TopCategories from "./TopCategories/TopCategories";
import WeeklySales from "./WeeklySales/WeeklySales";


export default function HomePage() {
  return (
    <>
    <Banner/>
    <TopCategories/>
    <InfoCards/>
    <WeeklySales/>
    <GoToSuppliers/>
    <DiscountBanner/>
    <HeritageStats/>
    <DailyStaples/>
    </>
  );
}
