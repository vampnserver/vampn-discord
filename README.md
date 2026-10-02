# Discord server website

This is a no-build static site: upload these files to any web host, GitHub Pages, Netlify, or Vercel.

## Add your server owners

Open `script.js` and replace the placeholder names below with the owner names you want displayed:

```js
owners: ["OWNER ONE", "OWNER TWO"]
```

The Discord invite is already set to `https://discord.gg/5hEnye5rg2`.

## Publish with GitHub Pages

1. Create a GitHub repository and upload `index.html`, `styles.css`, and `script.js`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. GitHub will give you a public site address after it finishes deploying.
