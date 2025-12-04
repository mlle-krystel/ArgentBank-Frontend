type FeatureItemProps = {
  icon: string;
  alt: string;
  title: string;
  text: string;
};

function FeatureItem({ icon, alt, title, text }: FeatureItemProps) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default FeatureItem;
