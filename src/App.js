import { Route, Routes } from 'react-router-dom';

import './App.scss'
import Home from './pages/home/Home';
import Category from './pages/category/Category';
import Detail from './pages/detail/Detail';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />

        <Route path='category'>
          <Route index element={<Category />} />
          <Route path="search/:keyword" element={<Category />} />
          <Route path=":id" element={<Detail />} />
        </Route>

        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
