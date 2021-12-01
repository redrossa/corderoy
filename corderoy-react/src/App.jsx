import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import {Wardrobe, Catalog} from './pages/Wardrobe';
import {Share} from './pages/Share';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/wardrobe" element={<Wardrobe />}>
              <Route path=":collection" element={<Catalog />} />
            </Route>
            <Route path="/share" element={<Share />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;