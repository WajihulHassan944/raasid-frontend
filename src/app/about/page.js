import AboutBanner from "./AboutBanner/AboutBanner";
import AboutDesc from "./AboutDesc/AboutDesc";
import AboutImgSec from "./AboutImgSec/AboutImgSec";
import FeaturesSection from "./FeaturesSection/FeaturesSection";

export default function page() {
  return (
   <div>
    <AboutBanner/>
    <AboutDesc/>
    <AboutImgSec/>
    <FeaturesSection/>
   </div>
  );
}
