# GraphHopper

A GraphQL-powered travel planner.

> Hop 'til you drop, one node at a time.

* Front End Challenge by [Tom Hazledine](https://tomhazledine.com) for [Loft Orbital](https://loftorbital.com/).
* Assigned on 2023-07-27.
* [Requirements](./CHALLENGE.md)
* [Work Summary](./WORK_SUMMARY.md)

---

## Run the app

If you're using Docker, you can run the app with:

```bash
docker-compose up
```

This will build the project and serve it at [http://localhost:1337](http://localhost:1337) (unless you've edited the `port` value of [./app.config.js](./app.config.js) or set a `PORT` environment variable, in which case it'll be served at that port instead).

If you prefer to run the project directly, you can do so using `yarn`:

```bash
yarn install
yarn dev
```

There are several commands available:

* `yarn dev` - run the app in development mode, watches for changes, and serves the app at [http://localhost:1337](http://localhost:1337)
* `yarn build` - build the app for production
* `yarn serve` - builds the app in development mode and serves it at [http://localhost:1337](http://localhost:1337)
* `yarn watch` - run the app in development mode, rebuilding on changes

> Note: the Dockerfile is configured to run `yarn dev` by default. In normal circumstances the container would build and run a production build of the app, but for the purposes of this challenge, it's more convenient to run the app in development mode.