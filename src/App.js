import Movies from './Components/Movies';
import about from './Components/about';
import home from './Components/home';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Switch>
   <Route  path="/" component={home} />
   <Route  path="/movies"  component={Movies} /> 
   <Route  path="/about"  component={about} />

    </Switch>
     
    </BrowserRouter>*/}
    <Movies/>
    </>
  );
}

export default App;
