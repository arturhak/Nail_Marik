/*
pages
*/
import Home from "../components/Home";
import About from "../components/About";
import Error from "../components/Error";
import Contact from "../components/Contact";
import Services from "../components/Services";
import Book from "../components/Book";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const publicRoutes: Array<RouteProps> = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/services", component: Services },
  { path: "/book", component: Book },
  { path: "*", component: Error },

];

export {
  publicRoutes,
};
