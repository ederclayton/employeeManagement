const app = require('./src/app');
const { port } = require('./config/config');

require('./config/mongodb');

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});