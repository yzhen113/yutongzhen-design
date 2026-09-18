# Week-one Lottie handoff

Looping Lottie JSON for the 1-week Dx experience illustrations.

## Live preview

https://prototypes.doordash.studio/yutong-zhen/week-one-kudos/p/week-one-kudos/lottie

(Also linked from prototype controls → “Lottie handoff”.)

## Files (`/lottie/`)

| File | Moment |
|------|--------|
| `delicia-on-time.json` | Day 2 — on-time |
| `delicia-acceptance.json` | Day 2 — acceptance |
| `delicia-completion.json` | Day 2 — completion |
| `first-dash-cupcake.json` | Day 1 — first dash |
| `day-7-medal.json` | Day 7 — recap medal |

- Artboard **600×600** (3× the 200 CSS slot) for retina
- **60 fps**, loops with a rest hold after the entrance
- Compatible with **lottie-ios**, **lottie-android**, **lottie-web**

## Plug-in (web)

```js
import lottie from 'lottie-web';
import onTime from './delicia-on-time.json';

lottie.loadAnimation({
  container: document.getElementById('illo'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: onTime,
});
```

Display at ~200×200 CSS px.
