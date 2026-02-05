# New Cloudways Server Setup Checklist

When you create a new Cloudways server for a client, complete these steps so the hosting page claims stay accurate.

---

## On Cloudways (per server/app)

- [ ] **Cloudflare Enterprise add-on** — WAF + CDN. Add via Cloudways add-ons (~$4.99/mo per app). Enables “WAF Hack Protection” and “Enterprise Cloudflare” copy.
- [ ] **Malware Protection add-on** — Imunify360. Add via Cloudways add-ons (~$4/mo per app). Enables “Real-time scanning and automatic removal of threats.”

---

## In SnapShooter (Startup plan)

- [ ] **Add this server as a backup resource** — Connect the new Cloudways server in SnapShooter.
- [ ] **Set retention to 30 days** — Use Daily/Weekly/Monthly retention rules so backups are kept for 30 days. Enables “30-day retention” copy.

---

## Quick reference

| Item | Where | Approx. cost |
|------|--------|---------------|
| Cloudflare Enterprise | Cloudways → Add-ons | ~$4.99/mo per app |
| Malware Protection | Cloudways → Add-ons | ~$4/mo per app |
| 30-day backups | SnapShooter (Startup $39/mo covers up to 20 resources) | Included in plan + storage |

---

*One server per client. After the server is live, run through this list before telling the client their site is fully set up.*
