import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
library.add(faUserCircle, faHeart, faShoppingCart)


function App() {
  return (
    <LandingPage></LandingPage>
  );
}

export default App;
