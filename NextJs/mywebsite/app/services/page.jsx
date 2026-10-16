const services = [
  {
    title: "Web Design",
    text: "Clean, modern layouts that look great on every screen size.",
  },
  {
    title: "Web Development",
    text: "Fast and reliable websites built with modern tools like Next.js.",
  },
  {
    title: "Support",
    text: "Friendly help and guidance to keep your website running smoothly.",
  },
];

export default function ServicesPage() {
  return (
    <section className="page">
      <h1>Our Services</h1>
      <div className="grid">
        {services.map((service) => (
          <div className="card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}