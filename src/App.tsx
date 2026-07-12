import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppFab from './components/WhatsAppFab/WhatsAppFab';
import CursorGlow from './components/CursorGlow/CursorGlow';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import CareerPage from './pages/CareerPage';
import LegalPage from './pages/LegalPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function App() {
	return (
		<SmoothScroll>
			<div className="site-light-theme">
				<ScrollProgress />
				<ScrollToTop />
				<CursorGlow />
				<Navbar />
				<main id="main-content">
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
						<Route
							path="/about"
							element={<AboutPage />}
						/>
						<Route
							path="/services"
							element={<ServicesPage />}
						/>
						<Route
							path="/services/:slug"
							element={<ServiceDetailPage />}
						/>
						<Route
							path="/career"
							element={<CareerPage />}
						/>
						<Route
							path="/faq"
							element={<HomePage />}
						/>
						<Route
							path="/contact"
							element={<ContactPage />}
						/>
						<Route
							path="/terms-of-service"
							element={<LegalPage policy="terms" />}
						/>
						<Route
							path="/privacy-policy"
							element={<LegalPage policy="privacy" />}
						/>
						<Route
							path="*"
							element={<HomePage />}
						/>
					</Routes>
				</main>
				<Footer />
				<ScrollIndicator />
				<WhatsAppFab />
			</div>
		</SmoothScroll>
	);
}

export default App;
