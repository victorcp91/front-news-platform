import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import initFirebase from "./config/firebase";
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import NewArticle from "./pages/NewArticle";
import Article from "./pages/Article";
import MyArticles from "./pages/MyArticles";
import Bookmarks from "./pages/Bookmarks";
import { AuthProvider } from "./context/authContext";
import { BookmarkProvider } from "./context/bookmarksContext";
import AuthChecker from "./components/AuthChecker";
import Loading from "./components/Loading";

function App() {

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async function() {
      await initFirebase();
      setInitialized(true);
    })(); 
  }, []);

  if(!initialized){
    return <Loading/>;
  }

  return (
    <AuthProvider>
      <BookmarkProvider>
        <Router>
          <AuthChecker />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/edit-article/:id" element={<NewArticle />} />
            <Route path="/my-articles" element={<MyArticles />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
