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
import ImmersiveDetailPage from './pages/ImmersiveDetailPage';
import LegalPage from './pages/LegalPage';

function App() {
	return (
		<SmoothScroll>
			<div>
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
							element={<HomePage />}
						/>
						<Route
							path="/services"
							element={<HomePage />}
						/>
						<Route
							path="/portfolio"
							element={<HomePage />}
						/>
						<Route
							path="/testimonials"
							element={<HomePage />}
						/>
						<Route
							path="/faq"
							element={<HomePage />}
						/>
						<Route
							path="/contact"
							element={<HomePage />}
						/>
						<Route
							path="/projects/:projectId"
							element={<ImmersiveDetailPage type="project" />}
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
