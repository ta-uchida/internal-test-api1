import * as Express from 'express';
import * as request from 'request';

require('dotenv').config();
const app = Express();

app.get(
    '/',
    (req: Express.Request, res: Express.Response) => {
        return res.send('Hello world. api1');
    });

app.get(
    '/api2',
    (req: Express.Request, res: Express.Response) => {
        const url = (process.env.API2_BASEURL || '/') + '/internal-api';
        request(url, (error: any, response: request.Response, body: any) => {
            if (error) {
                console.error(error);
                return;
            }
            return res.json(JSON.parse(body));
        });
    });

const port = process.env.PORT || 3000;
app.listen(
    port,
    () => {
        console.log(`Example app listening on port ${port}!`);
    });

export default app;
