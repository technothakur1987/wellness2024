
import { useContext } from 'react';
import './App.css'
import { AppContext } from './store/store';
import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero'
import Display from './components/Display';
import Footer from './components/Footer';
import Functionality from './components/Functionality';
import RetreatDetailPage from './components/RetreatDetailPage';



function App() {

  const { dispatch, allData, loader, error, filterData,showProductDetailpage,showProductDetailId} = useContext(AppContext);
  
  return (
    <>
    
     {
      loader ? <Loader /> : <>
      <Header/>
      <Hero/>
      <Functionality/>
      <Display/>
      {showProductDetailpage && <RetreatDetailPage/>}
      
      
      <Footer/>
      
      </>
     }
    </>
  )
}

export default App
