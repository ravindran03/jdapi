
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Articlelistpage from './pages/articlelistpage';
import Article from './pages/article'; 
import NavBar from './NavBar';
import Notfoundpage from './pages/notfoundpage';
import LoginPage from './pages/loginpage';
import CreateNewAccount from './pages/createnewaccount';
import AddArticle from './pages/addarticle';

function App(){
  return(
    <BrowserRouter>
    <div className='app'>
      <NavBar />
      <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/articles' element={<Articlelistpage />} />
      <Route path='/articles/:articleID' element={<Article />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/createnewaccount' element={<CreateNewAccount />} />
      <Route path='/addarticle' element={<AddArticle />} />
      <Route path='*' element={<Notfoundpage />} />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
