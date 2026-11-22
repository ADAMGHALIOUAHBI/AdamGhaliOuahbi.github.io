const adventures = [
  {
    label: 'MAKE',
    title: 'Turn an idea into a small project',
    description: 'Start with a sketch or question, then build one simple thing at a time.',
  },
  {
    label: 'LEARN',
    title: 'Explore how code works',
    description: 'Try a starter example and ask a parent or guardian before using new tools online.',
  },
  {
    label: 'DISCOVER',
    title: 'Notice something new',
    description: 'Keep a private note about a fun fact, a useful experiment, or a new skill.',
  },
];

export default function TimelinePage() {
  return (
    <main id="main" className="page-main timeline-page" tabIndex={-1}>
      <section className="timeline-hero">
        <span className="eyebrow">PLAY · CREATE · LEARN</span>
        <h1>A learning <span className="gradient-text">journey.</span></h1>
        <p>There is no rush. Every question, experiment, and little project is a new adventure.</p>
      </section>

      <section className="content-section" aria-labelledby="journey-heading">
        <div className="section-heading">
          <span className="eyebrow">IDEAS TO EXPLORE</span>
          <h2 id="journey-heading">Choose a safe next step.</h2>
          <p>Use these ideas with family guidance. Keep personal details and private notes offline.</p>
        </div>
        <div className="feature-grid">
          {adventures.map((adventure) => (
            <article className="feature-card" key={adventure.label}>
              <span className="eyebrow">{adventure.label}</span>
              <h3>{adventure.title}</h3>
              <p>{adventure.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
