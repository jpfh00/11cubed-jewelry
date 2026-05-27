#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$repoName = "11cubed-jewelry"

Write-Host "==> Checking GitHub auth..."
gh auth status

Write-Host "==> Ensuring branch main..."
git branch -M main

if (-not (git remote get-url origin 2>$null)) {
  Write-Host "==> Creating GitHub repo $repoName..."
  gh repo create $repoName --public --source=. --remote=origin --push
} else {
  Write-Host "==> Pushing to origin..."
  git push -u origin main
}

Write-Host "==> Deploying to Vercel (web/)..."
Push-Location web
try {
  npx --yes vercel --prod --yes
} finally {
  Pop-Location
}

Write-Host "Done."
