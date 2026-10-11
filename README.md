# Prize Chores

A local-first chores app for Aliyah. Kids stamp chores to earn tickets, then spend those tickets on a prize wheel. Grown-ups edit the chore list, the prizes, and the spin cost.

Nothing leaves the browser. There is no login, sync, or notification layer.

## Run it

Need Node 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). On a phone or tablet, use the machine’s LAN address from that same output.

```bash
npm test          # points + spin logic
npm run lint
npm run build     # production bundle in dist/
npm run preview   # serve that bundle
```

Add it to a home screen from the browser if you want it to feel like an app. Data lives in `localStorage` under `family-management:v1`.

## How the loop works

1. **Chores** — tap the circle next to a chore. It stamps once and adds tickets.
2. **Wheel** — a spin costs the grown-up-set ticket price (25 by default). The pointer at the top names the prize.
3. **Grown-ups** — add or remove chores and prizes, change the spin cost, unstamp chores for a new day, or reset tickets.

Point values still use the 2024 formula for defaults: 10 base tickets, scaled by Low / Medium / High, with a small bonus for kids under 12. Grown-ups can override the number on any chore.

## Notes

- Dee’s older [chore-time2](https://github.com/ddoug220/chore-time2) wheel was the reference, but that repo is gone (GitHub returns 404). The wheel here is a new implementation of the same idea: parent-editable prizes, a pointed carnival wheel, tickets in, prize out.
- The Feb 2024 app was an Ionic + Create React App shell with placeholder dashboard, tasks, calendar, messages, and settings. Firebase and axios were listed but never wired up. No backend was worth keeping.
