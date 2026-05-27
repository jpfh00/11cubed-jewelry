# Deploy — GitHub + Vercel

## 1. GitHub (una vez)

```powershell
gh auth login
git branch -M main
gh repo create 11cubed-jewelry --public --source=. --remote=origin --push
```

Si el repo ya existe:

```powershell
git remote add origin https://github.com/TU_USUARIO/11cubed-jewelry.git
git push -u origin main
```

## 2. Vercel (una vez)

### Error: `Root Directory "tree/main/web" does not exist`

Eso pasa si pegaste la URL de GitHub en Root Directory. **No uses** `tree/main/web`.

**Corrección en Vercel:**

1. [vercel.com](https://vercel.com) → tu proyecto → **Settings** → **General**
2. **Root Directory** → **Edit**
3. Elige **una** de estas dos opciones (no mezcles):

| Opción | Root Directory | Notas |
|--------|----------------|--------|
| **A (recomendada)** | *(vacío)* | Usa el `vercel.json` en la raíz del repo (`outputDirectory: "web"`) |
| **B** | `web` | Solo la palabra `web`, sin barras ni `tree/main` |

4. **Save** → **Deployments** → **Redeploy** el último deploy

### Deploy desde dashboard

1. Import `jpfh00/11cubed-jewelry`
2. Root Directory según tabla arriba
3. Framework: **Other**
4. Deploy

### Deploy desde CLI

```powershell
cd "C:\Users\jeanp\Desktop\Projects\11³"
npx vercel login
npx vercel --prod
```

## Local

```powershell
cd web
python -m http.server 3456
```

Abre `http://localhost:3456`

## Favicon y vista previa (WhatsApp / redes)

- Fuentes SVG: `web/assets/favicon.svg`, `og-card.svg`, `og-card-en.svg`
- PNG/JPEG generados: `npm run generate-assets` dentro de `web/scripts`
- Meta Open Graph en `index.html` / `index-en.html` (URL absoluta `https://elevencubed.shop/assets/og-image.jpg`)

Si WhatsApp sigue mostrando la imagen antigua, purga caché en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) con la URL del sitio.
