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
- `assets/video/` — six 12-second 1080p clips of American architecture (H.264, ~1.5–3 MB each)
- `assets/logos/` — brand SVGs (Wikimedia Commons)
- `assets/poster.jpg` — hero poster frame (Wrigley Building)

## Hero footage

Clips are re-encoded to 12 s / 1080p / CRF 27. Most come from
[Pexels](https://www.pexels.com) (free for commercial use, no attribution
required); two come from YouTube under Creative Commons Attribution (CC BY),
credited in the site footer:

| File | Subject | Source |
|---|---|---|
| `wrigley.mp4` | Wrigley Building, Chicago | Pexels 26986475 |
| `tribune.mp4` | Tribune Tower, Chicago | Pexels 17671634 |
| `rockefeller.mp4` | 30 Rockefeller Plaza, NYC (twilight) | Pexels 5825809 |
| `dallascityhall.mp4` | Dallas City Hall, Dallas (24–36 s of source) | [YouTube L0FWtZLkEbw](https://www.youtube.com/watch?v=L0FWtZLkEbw), CC BY, by a2viz AI |
| `easterncolumbia.mp4` | Eastern Columbia Building, LA (night closeup, 48–57 s of source, slowed ~1.3×) | [YouTube nCeaP-a3pAM](https://www.youtube.com/watch?v=nCeaP-a3pAM), CC BY, by Not in Potato Quality |
| `radiator.mp4` | American Radiator Building, NYC (drone pull-back, 26–38 s of trimmed section ≈ 956–968 s of source) | [YouTube ekYu-5s2Ne8](https://www.youtube.com/watch?v=ekYu-5s2Ne8), CC BY, by Magnificent Tourism |

Of the user's original eight-building wishlist, the
Fisher Building (Detroit), Gulf Tower (Pittsburgh), and
sunny footage of the Eastern Columbia have no usable free-license video anywhere
(Pexels, Pixabay, Coverr, Mixkit, Videvo, Wikimedia Commons, Vimeo CC, YouTube CC
all searched and frame-checked).

Portrait clips (`tribune`, `rockefeller`) are encoded 1080×1920 and framed via the
per-clip `focus` (object-position) value in `app.js`.

To swap a clip, replace the file and update the `CLIPS` array (caption + coordinates)
at the top of `app.js`.

## Notes

- Client/institution logos (PwC, KKR, Amazon Alexa, AWS, UC Berkeley) are the
  property of their respective owners.
- `prefers-reduced-motion` is respected: videos are replaced with a static poster
  and reveal animations are disabled.
