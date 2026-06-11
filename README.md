# Strange Loop — Homepage

Single-page marketing site for Strange Loop, an applied-AI engineering firm serving
financial services. Static HTML/CSS/JS — no build step, no dependencies.

## Run locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

(Any static file server works. Opening `index.html` directly also works, though
fonts require network access.)

## Structure

- `index.html` — all page content
- `styles.css` — design system (ink/ivory palette, Newsreader + IBM Plex Mono)
- `app.js` — hero video slideshow + register captions, scroll-aware top bar, reveal animations
- `assets/video/` — nine 12-second 1080p clips of American architecture (H.264, ~1–4 MB each)
- `assets/logos/` — brand SVGs (Wikimedia Commons)
- `assets/poster.jpg` — hero poster frame (Empire State Building)

## Hero footage

Clips are sourced from [Pexels](https://www.pexels.com) (free for commercial use,
no attribution required) and re-encoded to 12 s / 1080p / CRF 27:

| File | Subject | Pexels ID |
|---|---|---|
| `towers.mp4` | Empire State Building, NYC | 5828446 |
| `wrigley.mp4` | Wrigley Building, Chicago | 26986475 |
| `capitol.mp4` | United States Capitol, Washington, D.C. | 6133588 |
| `tribune.mp4` | Tribune Tower, Chicago | 17671634 |
| `brooklyn.mp4` | Brooklyn Bridge, NYC | 5656146 |
| `rockefeller.mp4` | 30 Rockefeller Plaza, NYC (twilight) | 5825809 |
| `chicago.mp4` | Near North Side, Chicago | 26561931 |
| `goldengate.mp4` | Golden Gate Bridge, San Francisco | 4560737 |
| `nyc_drone.mp4` | Hudson Yards, NYC | 12122308 |

Portrait clips (`tribune`, `rockefeller`) are encoded 1080×1920 and framed via the
per-clip `focus` (object-position) value in `app.js`.

To swap a clip, replace the file and update the `CLIPS` array (caption + coordinates)
at the top of `app.js`.

## Notes

- Client/institution logos (PwC, KKR, Amazon Alexa, AWS, UC Berkeley) are the
  property of their respective owners.
- `prefers-reduced-motion` is respected: videos are replaced with a static poster
  and reveal animations are disabled.
