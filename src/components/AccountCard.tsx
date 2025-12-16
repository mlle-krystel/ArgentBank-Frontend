type AccountCardProps = {
  title: string;
  amount: string;
  description: string;
};

export default function AccountCard({ title, amount, description }: AccountCardProps) {
  return (
    <section className="account">
      {/* content-wrapper sert à contenir le contenu principal du compte */}
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      {/* content-wrapper cta sert à contenir le bouton d'action */}
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
