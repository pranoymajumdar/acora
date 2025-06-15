export function AcoraLogo({ size = 32, showText = true }: { size?: number; showText?: boolean }) {
  // Using Tailwind classes based on the size prop
  // We'll use a base reference size of 32px
  const containerClasses = "flex items-center";
  let letterClasses = "bg-primary text-primary-foreground rounded-md font-semibold antialiased";
  let textClasses =
    "font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden";
  let spacing = "space-x-2";

  // Adjust classes based on size
  if (size <= 24) {
    letterClasses += " py-0.5 px-2 text-xl";
    textClasses += " text-lg";
    spacing = "space-x-1.5";
  } else if (size <= 32) {
    letterClasses += " py-1 px-2.5 text-3xl";
    textClasses += " text-xl";
    spacing = "space-x-2";
  } else if (size <= 48) {
    letterClasses += " py-1.5 px-3 text-4xl";
    textClasses += " text-2xl";
    spacing = "space-x-3";
  } else {
    letterClasses += " py-2 px-4 text-5xl";
    textClasses += " text-3xl";
    spacing = "space-x-4";
  }

  return (
    <div className={`${containerClasses} ${spacing}`}>
      <span className={letterClasses}>A</span>

      {showText && <span className={textClasses}>Acora</span>}
    </div>
  );
}
