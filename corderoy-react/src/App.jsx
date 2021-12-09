import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {UserSelection} from './components/UserSelection';
import Home from './pages/Home/Home';
import {Wardrobe, Catalog} from './pages/Wardrobe';
import {Share} from './pages/Share';
import useOutfit from './hooks/useOutfit';
import {Collections} from './components/Collections';
import Settings from './data-settings.json';
import Feed from './pages/Home/Feed';

function App() {
  const outfit = useOutfit();

  const collections = {
    tree: Settings.tree,
    collectionRank: Settings.collectionRank
  };

  return (
      <div className="App">
        <Collections.Provider value={collections}>
          <UserSelection.Provider value={outfit}>
            <BrowserRouter>
              <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/posts" element={<Feed />} />
                <Route path="/wardrobe" element={<Wardrobe/>}>
                  <Route path=":collection" element={<Catalog/>} />
                </Route>
                <Route path="/share" element={<Share/>} />
              </Routes>
            </BrowserRouter>
          </UserSelection.Provider>
        </Collections.Provider>
      </div>
  );
}

export default App;