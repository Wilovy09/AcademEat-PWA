# Vue 3 PWA Template

This template include **Pinia**,**Vue-router** & **TypeScript**.

But you can install whatever you need like:
- TailwindCSS
Just follow the official documentation of each thing and that's it!

## 🚀 Launch

1. You need to build your application with the command `npm run build`.
2. Execute the command `npm run preview`.
3. We need to expose the port.
> [!TIP]
> If we are in VSCode we can use the terminal function `Ports` -> `Forward Port`.

Enter the link it generates and we will have our PWA.

> [!NOTE]
> This is the way the plugin works. We need a HTTPS server to detect the PWA, we can use any one like Ngrok, Cloudflare, etc...

## 🔧 Settings

We can see our manifest configuration in the file `vite.config.ts`.

If we want to change the icon of our APP we need to change the images we have in our `public/` folder.

I recommend (as in the documentation) to use the [Favicon-generator](https://favicon.inbrowser.app/tools/favicon-generator)

## 📚 Official Documentation

[Vite PWA plugin](https://vite-pwa-org.netlify.app/guide/)
