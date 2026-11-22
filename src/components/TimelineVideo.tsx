export default function TimelineVideo() {
  return (
    <section className="content-section timeline-video-section" aria-labelledby="timeline-video-heading">
      <div className="section-heading">
        <span className="eyebrow">LITTLE WINS</span>
        <h2 id="timeline-video-heading">Small steps count.</h2>
        <p>Make, test, learn, and try again. A parent or guardian can help choose what to share.</p>
      </div>
      <div className="feature-grid">
        <article className="feature-card"><span className="feature-icon">01</span><h3>Pick an idea</h3><p>Choose something fun and small enough to finish.</p></article>
        <article className="feature-card"><span className="feature-icon">02</span><h3>Try it out</h3><p>Explore a starter, draw a plan, or build a first version.</p></article>
        <article className="feature-card"><span className="feature-icon">03</span><h3>Celebrate learning</h3><p>Notice what worked and what you want to explore next.</p></article>
      </div>
      <a className="secondary-button timeline-all-videos" href="/timeline.html">
        See more learning ideas
      </a>
    </section>
  );
}
