# LyxeJS Example Application

Example project for [LyxeJS Framework](http://npmjs.com/package/lyxe).

## Try it out

Step 1. Clone this repository:

```shell script
git clone https://github.com/queses/lyxe-example.git
cd lyxe-example
```

Step 2. Perform some init actions:

```shell script
yarn                      # install dependencies
cp .env.dist .env         # create environment file 
yarn orm schema:sync      # init database schema
yarn dev                  # run web-server in dev mode
```

Step 3. Go to `http://localhost:3000/api/example/hello` to get a greeting.

Step 4. Run some tests:

```shell script
yarn orm:test schema:sync  # init test database schema
yarn test                  # run tests
```
