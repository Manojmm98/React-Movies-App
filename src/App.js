import Movies from './Components/Movies';
import home from './Components/home';
import about from './Components/about';
// to give routing to a page we have to import all the componenets from components folder
// lastly we also have to import bowserroute and route from react router dom
// here "/" is present in every componets path so it will come everytime to avoid this we have to use excat
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Route exact path="/" component={home}/>
    <Route path="/about" component={about}/>
    <Route path="/movies" component={Movies}/>
    </BrowserRouter>
    </>
  );
}

export default App;
