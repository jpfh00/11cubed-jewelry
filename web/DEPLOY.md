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

**Importante:** si importas desde GitHub, deja **Root Directory vacío** (`.`).  
El `vercel.json` en la raíz del repo ya apunta a `web/` como sitio.

Opción A — Dashboard:

1. [vercel.com/new](https://vercel.com/new) → Import `11cubed-jewelry`
2. **Root Directory:** vacío (no pongas `web` si ya usas el `vercel.json` raíz)
3. Framework Preset: **Other**
4. Deploy

Opción B — CLI:

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
