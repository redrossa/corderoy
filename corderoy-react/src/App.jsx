import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {UserSelection} from './components/UserSelection';
import {Feed, Home} from './pages/Home';
import {Wardrobe, Catalog} from './pages/Wardrobe';
import {Share} from './pages/Share';
import useOutfit from './hooks/useOutfit';
import {Collections} from './components/Collections';
import Settings from './data-settings.json';

function App() {
  const outfit = useOutfit();

  const collections = {
    tree: Settings.tree,
    collectionRank: Settings.collectionRank
  };

  const localLikedPosts = localStorage.getItem('likedPosts');
  if (!localLikedPosts)
    localStorage.setItem('likedPosts', JSON.stringify([]))

  return (
      <div className="App">
        <Collections.Provider value={collections}>
          <UserSelection.Provider value={outfit}>
            <HashRouter>
              <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/posts" element={<Feed />} />
                <Route path="/wardrobe" element={<Wardrobe/>}>
                  <Route path=":collection" element={<Catalog/>} />
                </Route>
                <Route path="/share" element={<Share/>} />
              </Routes>
            </HashRouter>
          </UserSelection.Provider>
        </Collections.Provider>
      </div>
  );
}

export default App;