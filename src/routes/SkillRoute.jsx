import { Route } from "react-router";

// import SkillsMainPage from "../components/SkillsMainPage/index";
import { ReactLazyLoadImport } from "../lazyloadings/ReactLazyLoadImport/index";
const SkillsMainPage = ReactLazyLoadImport(
  "../../components/SkillsMainPage/index"
);

const SkillRoute = <Route path="/skill" element={<SkillsMainPage />} />;
export default SkillRoute;
