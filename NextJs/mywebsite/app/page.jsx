import Link from "next/link";

const features = [
  { title: "Fast", text: "Pages load quickly thanks to Next.js." },
  { title: "Simple", text: "Clean code that is easy to read and learn." },
  { title: "Responsive", text: "Looks good on phones, tablets and desktops." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to MyWebsite</h1>
        <p>
          This is a small demo site built with Next.js. It shows how pages,
          layouts and navigation work together.
        </p>
        <Link href="/about" className="btn">
          Learn More About Us
        </Link>
      </section>

      <section className="grid">
        {features.map((feature) => (
          <div className="card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}