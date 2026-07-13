import About from "../components/About/About";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import useSeo from "../hooks/useSeo";

export default function AboutPage() {
  useSeo({
    title: "About MechCurve | Mechanical Design Team",
    description:
      "Learn about MechCurve, our mission and vision, the MechCurve approach, and why manufacturers and engineers choose us for manufacturing-ready design.",
    path: "/about",
  });

  return (
    <div className="site-light-content pt-16 sm:pt-20">
      <About />
      <WhyChoose />
    </div>
  );
}
