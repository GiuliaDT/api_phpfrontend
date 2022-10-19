import Index from './components/Index';
import Edit from './components/Edit';
import Show from './components/Show';
import Create from './components/Create';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Index/> } />
          <Route path='/create' element={ <Create/> } />
          <Route path='/edit/:id' element={ <Edit/> } />
          <Route path='/show/:id' element={ <Show/> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
