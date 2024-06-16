import { BrowserRouter, Routes, Route} from 'react-router-dom'
//browserrouter wraps everywhere we want to use router. routes wraps all our routes, route which wraps indiv route

//pages and components
import Home from './pages/home'
import Navbar from './components/Navbar'
//put navar inside browserrouter tag bc we're using link component from react-router-dom

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />} //element we'll render for this route
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
