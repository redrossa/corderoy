import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Wardrobe from './pages/wardrobe/Wardrobe.jsx';
import Share from './pages/Share';
import Catalog from "./pages/wardrobe/Catalog";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/wardrobe" element={<Wardrobe />}>
              <Route path="" element={<Catalog />} />
              <Route path=":collection" element={<Catalog />} />
            </Route>
            <Route path="/share" element={<Share />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;