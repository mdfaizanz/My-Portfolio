# Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.
Open `index.html` by double-clicking it, or upload the whole folder to any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Change your content → `js/data.js`
Name, roles, about text, stats, languages, skills, projects, social links,
contact settings and puzzle settings all live in this one file.

Also update the `<title>` and `<meta>` tags at the top of `index.html`
(this is what shows up when you share the link on social media).

## Contact form
Paste a form endpoint (e.g. a free https://formspree.io form URL) into `contact.endpoint`
in `data.js` to receive messages. Leave it empty and the visitor's email app opens instead.

## Remove a section
Each section is independent. To remove one, delete 3 things:
1. its `<section>` block in `index.html`
2. its `<script>` line(s) at the bottom of `index.html`
3. its `<link>` line in the `<head>` (optional)

| Section  | Script(s)                                  | CSS                  |
|----------|--------------------------------------------|----------------------|
| About    | js/modules/about.js                        | css/about.css        |
| Projects | js/modules/projects.js                     | css/projects.css     |
| Contact  | js/modules/contact.js                      | css/contact.css      |
| Puzzle   | js/puzzle/library, picker, picture, game   | css/puzzle.css       |

## Puzzle pictures → `js/puzzle/library.js`
Add `['🦁', 'Lion']` to a category, or copy a category block to create a new one.

## Colours and fonts → top of `css/base.css`
