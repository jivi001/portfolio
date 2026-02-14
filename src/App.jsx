import { Route, Switch } from 'wouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import CaseStudies from './pages/CaseStudies';
import Insights from './pages/Insights';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300 bg-slate-950">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/insights" component={Insights} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
