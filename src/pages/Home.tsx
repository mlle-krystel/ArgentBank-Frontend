import React from "react";
import FeatureItem from "../components/FeatureItem";
import iconChat from "/images/icon-chat.webp";
import iconMoney from "/images/icon-money.webp";
import iconSecurity from "/images/icon-security.webp";

function Home() {
  const features = [
    {
      icon: iconChat,
      alt: "Chat Icon",
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: iconMoney,
      alt: "Money Icon",
      title: "More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: iconSecurity,
      alt: "Security Icon",
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h1 className="sr-only">Promoted Content</h1>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">
            Open a savings account with Argent Bank today!
          </p>
        </section>
      </div>

      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
  <FeatureItem
    key={index}
    icon={feature.icon}
    alt={feature.alt}
    title={feature.title}
    text={feature.text}
  />
))}
      </section>
    </main>
  );
}

export default Home;
