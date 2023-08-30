# SPHINX website version 2

## Table Of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [One click deploy](#one-click-deploy)
- [Built With](#-built-with)
- [Contributing](#-contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [License](#-license)

## Getting Started
- Setup your [sendgrid](https://sendgrid.com/) API key and add it to environment variables (`SENDGRID_API_KEY` - `.env.local`)
- Adjust the template to your needs (and checkout `env.ts` file)
- Deploy the project on [Vercel](https://vercel.com/) **don't forget to add env variables**
- _(optional)_ Create [Tina Cloud account](https://app.tina.io/), [a project](https://tina.io/docs/tina-cloud/) and fill these `NEXT_PUBLIC_ORGANIZATION_NAME`, `NEXT_PUBLIC_TINA_CLIENT_ID` env vars with proper values
  > Tina's Content API authenticates directly with GitHub removing the need for users to create GitHub accounts. Access is granted through the dashboard, allowing users to login directly through your site and begin editing! Any changes that are saved by your editors will be commited to the configured branch in your GitHub repository.
  - For more details [see the docs](https://tina.io/docs/tina-cloud/)

```
# run the dev mode
$ yarn dev

# run the prod mode
yarn start

# build the app
yarn build
```

> Hint: To edit the blog pages go to [/admin](http://localhost:3000/admin) and navigate to a blog page to edit it. To exit editing mode navigate to [/admin/logout](http://localhost:3000/admin/logout)

## One click deploy

Clone the repository and one-click deploy to Vercel for free!

[![Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-saas-starter)

Clone the repository and one-click deploy to Netlify for free!

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Blazity/next-saas-starter)

## 🧰 Built With

- Statically generated pages with [**Next.js** ](https://github.com/vercel/next.js)
- [Styled components](https://github.com/styled-components/styled-components/)
- [MDX](https://github.com/mdx-js/mdx)
- [TypeScript](https://github.com/Microsoft/TypeScript)

##  Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/`)
3. Commit your Changes (`git commit -m 'Add some'`)
4. Push to the Branch (`git push origin feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/Blazity/next-saas-starter/blob/main/LICENSE.md) for more information.
