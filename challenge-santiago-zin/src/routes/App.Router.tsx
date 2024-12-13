import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import NotFound from '../pages/notFound';
import Layout from '@/shared/layout';
import IndProperty from '@/pages/individual/indProperty';
import CreateProperty from '@/pages/create/createProperty';

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/property/:id" element={<IndProperty />} />
        <Route path="/create" element={<CreateProperty />} />
      </Route>
    </Routes>
  </Router>     
  );
};

export default AppRouter;
