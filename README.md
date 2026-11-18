# CoachSI project page

Project page for **CoachSI: Self-Improvement of Robot Policies with a Language Coach**.

Static site with no build step: `index.html`, one stylesheet, one script, and the media under `static/`.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Publish with GitHub Pages

Repository settings → Pages → "Deploy from a branch" → branch `main`, folder `/ (root)`.

## Edit

- **Authors**: the `authors` block near the top of `index.html`. To link a name, wrap it in `<a href="…">`.
- **Paper and code links**: the `links` block. Replace a `<span class="pill soon">` with `<a class="pill" href="…">`.
- **BibTeX**: the `<pre id="bib-text">` block near the bottom.
- **Clips**: `static/video/<name>.mp4` with a poster `static/video/<name>.jpg`. A tab's `data-clip` is `<name>`.

## Contents

```
index.html
static/css/style.css
static/js/main.js
static/img/      figures and favicon
static/video/    tile_*   plain CoachSI rollouts shown under the title
                 stall_*  from a stalled state: task instruction vs. the coach's next step
                 coach_*  coached data collection: policy alone vs. with the coach
                 after_*  after fine-tuning: pretrained policy vs. CoachSI
```
