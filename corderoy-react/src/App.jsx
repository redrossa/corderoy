import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {UserSelection} from './components/UserSelection';
import Home from './pages/Home/Home';
import {Wardrobe, Catalog} from './pages/Wardrobe';
import {Share} from './pages/Share';
import useOutfit from './hooks/useOutfit';
import Trending from "./pages/Home/Trending";
import Feed from "./pages/Home/Feed";

function App() {
  const outfit = useOutfit();
  return (
      <div className="App">
        <UserSelection.Provider value={outfit}>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home/>}>
                <Route path="" element={<Trending />} />
                <Route path="/search" element={<Feed />} />
              </Route>
              <Route path="/wardrobe" element={<Wardrobe/>}>
                <Route path=":collection" element={<Catalog/>} />
              </Route>
              <Route path="/share" element={<Share/>} />
            </Routes>
          </BrowserRouter>
        </UserSelection.Provider>
      </div>
  );
}

export default App;