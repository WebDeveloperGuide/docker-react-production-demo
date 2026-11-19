const deliverySteps = [
  { number: '01', title: 'Write', detail: 'Build a small change' },
  { number: '02', title: 'Verify', detail: 'Test and scan it' },
  { number: '03', title: 'Ship', detail: 'Package it in Docker' },
  { number: '04', title: 'Deploy', detail: 'Release with confidence' },
]

const principles = [
  {
    number: '01',
    title: 'Docker Containers',
    description:
      'Package the app and its runtime into a consistent, portable image.',
    icon: '⬡',
    tone: 'mint',
  },
  {
    number: '02',
    title: 'Continuous Integration',
    description:
      'Run automated checks on every change before it reaches production.',
    icon: '↗',
    tone: 'lavender',
  },
  {
    number: '03',
    title: 'Continuous Deployment',
    description:
      'Release a verified image and confirm the live app is responding.',
    icon: '◎',
    tone: 'peach',
  },
]

const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
const commitSha = import.meta.env.VITE_GIT_SHA || 'local'
const repositoryUrl =
  import.meta.env.VITE_GITHUB_REPOSITORY_URL ||
  'https://github.com/WebDeveloperGuide/docker-react-production-demo'

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Docker React Production Demo home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M5 18h22c-.7 5.2-4.1 8-10.1 8C10.8 26 7 23.4 5 18Z"
                fill="currentColor"
              />
              <path
                d="M9 10h4v4H9zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4zm5 5h4v4h-4zM4 16h22c1.2 0 2.2-.5 3-1.3.8 2.2.3 4.2-1.2 5.7H5.4L4 16Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>Docker React <span className="brand-dot">Production Demo</span></span>
        </a>
        <a className="header-link" href="#lifecycle">
          The workflow <span aria-hidden="true">↓</span>
        </a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A tiny app, a real-world pipeline</p>
            <h1 id="hero-title" aria-label="From Code to Production">
              From Code
              <br />
              to <span>Production.</span>
            </h1>
            <p className="hero-description">
              Great software doesn&apos;t just get written. It gets tested,
              packaged, checked, and delivered—reliably, every time.
            </p>
            <a className="primary-link" href="#delivery">
              Explore the journey <span aria-hidden="true">↘</span>
            </a>
            <div className="hero-meta" aria-label="Build information">
              <span className="build-indicator" />
              <span>Build v{version}</span>
              <span className="meta-divider" aria-hidden="true">/</span>
              <span className="commit-label">commit {commitSha}</span>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">✳</div>
            <div className="art-label label-source">SOURCE</div>
            <div className="art-label label-release">RELEASE</div>
            <div className="package-card">
              <div className="package-topline">
                <span className="package-dot" />
                <span className="package-dot" />
                <span className="package-dot" />
                <span className="package-name">production-image</span>
              </div>
              <div className="package-cube">
                <svg viewBox="0 0 112 112" fill="none">
                  <path d="m56 8 40 23v50L56 104 16 81V31L56 8Z" fill="#DDF5EA" />
                  <path d="m56 8 40 23-40 23-40-23L56 8Z" fill="#B8E8D0" />
                  <path d="M56 54v50L16 81V31l40 23Z" fill="#A4DCC1" />
                  <path d="M56 54 96 31v50l-40 23V54Z" fill="#8CCFAF" />
                  <path d="M36 19.5v23m0 0 40 23m-40-23 40-23m0 23v23M56 8v46" stroke="#438C68" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M42 66v10l8 5v-10l-8-5Zm16 9v10l8-5V70l-8 5Z" fill="#438C68" />
                </svg>
              </div>
              <div className="package-footer">
                <span className="package-check">✓</span>
                <span>verified &amp; ready to ship</span>
              </div>
            </div>
            <div className="art-caption">one image, anywhere</div>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section className="principles-section" id="delivery" aria-labelledby="principles-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE BUILDING BLOCKS</p>
              <h2 id="principles-title">Small steps. <span>Solid releases.</span></h2>
            </div>
            <p className="section-intro">
              Three practices turn a code change into something you can trust.
            </p>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <div className={`principle-icon ${principle.tone}`} aria-hidden="true">
                  {principle.icon}
                </div>
                <span className="card-number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="lifecycle-section" id="lifecycle" aria-labelledby="lifecycle-title">
          <div className="lifecycle-heading">
            <p className="eyebrow">THE DELIVERY LOOP</p>
            <h2 id="lifecycle-title">From a commit to a <span>confident launch.</span></h2>
          </div>
          <ol className="lifecycle-list">
            {deliverySteps.map((step, index) => (
              <li className="lifecycle-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div className="step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
                {index < deliverySteps.length - 1 && (
                  <span className="step-connector" aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="verification-section" aria-labelledby="verification-title">
          <p className="eyebrow">CHECK YOUR RELEASE</p>
          <h2 id="verification-title">Verify this deployment</h2>
          <p>
            Compare the commit below with the commit in the successful Deploy to
            Render run. Updates appear after CI, image publishing, and deployment
            succeed.
          </p>
          <dl className="verification-details">
            <div>
              <dt>Build version</dt>
              <dd>v{version}</dd>
            </div>
            <div>
              <dt>Build commit</dt>
              <dd><code>{commitSha}</code></dd>
            </div>
          </dl>
          <div className="verification-links">
            <a href={`${repositoryUrl}/actions`} target="_blank" rel="noreferrer">
              View GitHub Actions
            </a>
            <a href="/healthz">Check health endpoint</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M5 18h22c-.7 5.2-4.1 8-10.1 8C10.8 26 7 23.4 5 18Z" fill="currentColor" />
              <path d="M9 10h4v4H9zm5 0h4v4h-4zm5 0h4v4h-4zm-5-5h4v4h-4zm5 5h4v4h-4zM4 16h22c1.2 0 2.2-.5 3-1.3.8 2.2.3 4.2-1.2 5.7H5.4L4 16Z" fill="currentColor" />
            </svg>
          </span>
          <span>Docker React <span className="brand-dot">Production Demo</span></span>
        </a>
        <p>A small demo of a thoughtful delivery process.</p>
        <a
          className="github-link"
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  )
}

export default App
