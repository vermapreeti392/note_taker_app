import './App.css';
import Register from './components/User/Register';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import AddNote from './components/Recipe/AddNote';
import NoteDetail from './components/Recipe/NoteDetail';
import UpdateNote from './components/Recipe/UpdateNote';


function App() {  
  return (   
    <BrowserRouter>    
      <div className="App">
        <Routes>
          <Route path='/' element = {<Register/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/note' element = {<Home/>}/>
          <Route path='/addnote' element = {<AddNote/>}/>
          <Route path='/note/:id' element = {<NoteDetail/>}/>
          <Route path='/update/:id' element={<UpdateNote/>}></Route> 
        </Routes>        
      </div>
    </BrowserRouter>
  );
}

export default App;
