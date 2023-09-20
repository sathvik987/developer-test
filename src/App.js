import LandingPage from './components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faUserCircle, faHeart, faShoppingCart, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, faUserCircle, faHeart, faShoppingCart, faCartArrowDown)


function App() {
  return (
    <LandingPage></LandingPage>
  );
}

export default App;
