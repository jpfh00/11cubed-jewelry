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

Opción A — CLI:

```powershell
cd web
npx vercel login
npx vercel link
npx vercel --prod
```

Opción B — Dashboard:

1. [vercel.com/new](https://vercel.com/new) → Import Git Repository
2. Selecciona `11cubed-jewelry`
3. **Root Directory:** `web`
4. Framework Preset: **Other**
5. Deploy

## Local

```powershell
cd web
python -m http.server 3456
```

Abre `http://localhost:3456`
