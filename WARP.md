# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static HTML website for Strange Loop Labs, a company that automates critical business processes with AI. The site showcases their services, platform (Escher), security features, and includes a PwC case study.

## Common Commands

### Local Development
```bash
# Serve the site locally using Python's built-in server
python3 -m http.server 8000

# Alternative using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server (if installed globally)
npx http-server . -p 8000

# Open in browser after starting server
open http://localhost:8000
```

### Git Operations
```bash
# View recent changes
git log --oneline -10

# Check current status
git status

# Stage and commit changes
git add .
git commit -m "Your commit message"

# Push to remote
git push origin main
```

## Architecture & Structure

### Site Structure
- **index.html** - Main homepage with hero section, principles, PwC case study, and company information
- **security.html** - Platform and security page detailing Escher platform capabilities
- **about.html** - Generic about page (appears to be template content, not customized)
- **contact.html** - Generic contact form page (appears to be template content, not customized)
- **css/styles.css** - Shared stylesheet (used by about.html and contact.html, but not by main pages)

### Design System
The main pages (index.html and security.html) use inline CSS with a consistent design system:
- CSS custom properties for colors and sizing (--fg, --muted, --line, --bg, --max)
- Responsive design with mobile-first approach
- Sticky navigation header
- Consistent typography using system fonts
- Card-based layout for content sections

### Content Architecture
- **Hero sections** with company messaging and value propositions
- **Credential strips** showing company badges/partnerships
- **Case studies** with stats and testimonials (PwC case study on homepage)
- **Feature grids** showing platform capabilities and security features
- **Call-to-action buttons** for lead generation

### Navigation Structure
- Main nav: Platform → Security → Company
- Cross-page linking between index.html and security.html
- Anchor-based navigation within pages (e.g., #company, #security)

## File Organization

### Primary Pages (Production Ready)
- `index.html` - Fully customized homepage with Strange Loop Labs branding
- `security.html` - Detailed platform and security information page

### Secondary Pages (Template Content)
- `about.html` and `contact.html` appear to contain generic template content and may need customization before going live

### Styles
- Main pages use inline CSS for performance and maintainability
- `css/styles.css` is only used by the template pages (about.html, contact.html)

### Assets
- `images/` directory exists but is currently empty
- SVG icons are inlined in HTML for performance

## Development Notes

### Styling Approach
- Each main page contains its own CSS to avoid external dependencies
- Uses modern CSS features (CSS Grid, custom properties)
- Responsive breakpoints at 880px and 700px for mobile optimization

### Content Management
- All content is hardcoded in HTML files
- No CMS or dynamic content system
- Updates require direct HTML editing

### Performance Considerations
- Minimal external dependencies
- Inline CSS and SVG for reduced HTTP requests
- System fonts for fast loading
- Lightweight, semantic HTML structure

## Claude Configuration

The repository includes Claude AI configuration in `.claude/settings.local.json` with basic permissions for directory operations.
