import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';

// Admin pages only work against the local backend, so keep them out of production builds
const AdminLogin = import.meta.env.DEV ? lazy(() => import('./pages/AdminLogin')) : null;
const AdminDashboard = import.meta.env.DEV ? lazy(() => import('./pages/AdminDashboard')) : null;

// HashRouter reads jdgeisler.com/#experience as a route, so map section names back to the home page
const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

function SectionLink() {
  const { section } = useParams();
  return SECTION_IDS.includes(section) ? <Home scrollTo={section} /> : <PageNotFound />;
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/:section" element={<SectionLink />} />
          {import.meta.env.DEV && (
            <>
              <Route path="/admin-login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
              <Route path="/shell" element={<Suspense fallback={null}><AdminDashboard /></Suspense>} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App