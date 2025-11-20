/*
pages
*/
import Home from "../components/Home";
import About from "../components/About";
import Error from "../components/Error";
import Contact from "../components/Contact";
import Services from "../components/Services";
import Book from "../components/Book";
import Admin from "../auth/Admin";
import Baby from "../components/Baby";
import ChildBook from "../components/ChaildBook";
import HairBook from "../components/HairBook";
import LashesBook from "../components/LashesBook";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const publicRoutes: Array<RouteProps> = [
  { path: "/", component: Home },
  { path: "/public", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/baby", component: Baby },
  { path: "/services", component: Services },
  { path: "/book", component: Book },
  { path: "/chaild", component: ChildBook },
  { path: "/hair", component: HairBook },
  { path: "/lashbrows", component: LashesBook },
  { path: "/admin", component: Admin },
  { path: "*", component: Error },
];

export {
  publicRoutes,
};
