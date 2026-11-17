import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('application page', () => {
  it('renders the application', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /from code to production/i }),
    ).toBeInTheDocument()
  })

  it('renders the project name in the header', () => {
    render(<App />)

    expect(
      within(screen.getByRole('banner')).getByRole('link', {
        name: 'Docker React Production Demo home',
      }),
    ).toBeInTheDocument()
  })

  it('explains the software delivery lifecycle', () => {
    render(<App />)

    expect(
      screen.getByText(/tested, packaged, checked, and delivered/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /from a commit to a confident launch/i }),
    ).toBeInTheDocument()
  })

  it('renders all three delivery practice cards', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Docker Containers' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Continuous Integration' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Continuous Deployment' }),
    ).toBeInTheDocument()
  })

  it('renders the GitHub footer link', () => {
    render(<App />)

    const githubLink = within(screen.getByRole('contentinfo')).getByRole('link', {
      name: /view on github/i,
    })

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/WebDeveloperGuide/docker-react-production-demo',
    )
  })

  it('displays the application version and commit identifier', () => {
    render(<App />)

    expect(screen.getByText(/build v1\.0\.0/i)).toBeInTheDocument()
    expect(screen.getByText(/commit local/i)).toBeInTheDocument()
  })
})
