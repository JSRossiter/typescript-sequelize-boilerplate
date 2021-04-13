# Express admin boilerplate

## Features

- Sequelize
- Express
- Admin bro
- Worker
- PagerDuty
- Telegram
- Scripts

## Setup

```bash
export NEW_PROJECT_NAME=<project>
git clone https://github.com/JSRossiter/typescript-sequelize-boilerplate $NEW_PROJECT_NAME
cd $NEW_PROJECT_NAME
git remote remove origin
gh repo create $NEW_PROJECT_NAME --private --confirm
git push -u origin main
cp .env.example .env
npm i
```

- Change `PROJECT` in `db/config.js`
- Change repo in ecosystem.config.js
- Change `companyName` in `src/routes/admin/branding.ts`
- Update package.json
- Complete .env
