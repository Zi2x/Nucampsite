import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CampsitesList from './features/campsites/CampsitesList';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/' component={CampsitesList} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;




