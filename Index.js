const app = require('./app');
const dotenv = require('dotenv').config({ path: 'config.env' });

const PORT =process.env.RUNNING_PORT || 5050 ;



app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}/api/v1`);
})
