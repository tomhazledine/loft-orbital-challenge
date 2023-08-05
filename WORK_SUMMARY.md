# Work Summary

The steps taken to build this app, in order.

## 1. Setup dev environment

-   Init my default "app scaffold" which I use to quickly bootstrap new projects; it's not comprehensive but I do know _exactly_ what's in it so it's good env for fast experimentation.
-   Setup `Dockerfile` and `docker-compose.yml` to run the app in a container.
-   Install Apollo Client and React Router to begin experimenting with the provided API.
-   Setup basic routing and app behaviour with React.
-   At this point I'm pretty sure the app will involve navigating to continents, so I add a placeholder `Continent` component and route, in addition to standard Home and Error pages.

Time: ~1 hour

## 2. Brainstorming

Gathering UI reference, generically thinking about the app, and making notes. Brainstorming documented in [./research/notes.md](./research/notes.md).

Time: ~1 week 😆

## 3. MVP development

-   Test API with calls to get `countries` and `continents`
-   Render shapes for countries:
    -   Use country-shape dataset (from [D3 geo example code](https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson)) to add "shape" information to each country. This dataset does not exactly match the data returned by the API, so required some mapping. The script I used can be found in [scratch/mappings.js](./scratch/mappings.js) and can be run with `node scratch/mappings.js`. The resulting shape data is saved in []() and the list of 75 "unmatched" countries can be found in [scratch/unmatched-countries.csv](./scratch/unmatched-countries.csv). These countries will be excluded from my app, but this is only due to the limits of the available data and the time constraints of the challenge.
