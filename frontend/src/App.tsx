import  Navbar  from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './Routes/Routers';


function App() {

  return <>
    <Router>
      <Navbar/>  
      <Routers/>
    </Router>
  </>
}
export default App;