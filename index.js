/**
 The MIT License (MIT)

 Copyright (c) 2022 @biddster

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

module.exports = function(RED) {
    const LeafConnect = require('leaf-connect');

    RED.nodes.registerType('nissan-leaf', function(config) {
        RED.nodes.createNode(this, config);

        const actuations = {
            climate_control_on: client => client.climateControlTurnOn(),
            climate_control_off: client => client.climateControlTurnOff(),
            climate_control_status: client => client.climateControlStatus(),
            status: client => client.status()
        };

        this.on('input', async msg => {
            try {
                const actuation = actuations[msg.payload];
                if (!actuation) {
                    throw Error(`msg.payload should be one of ${Object.keys(actuations)}`);
                }
                this.status({ text: 'Connecting...', fill: 'blue' });
                const client = await LeafConnect({
                    username: config.username,
                    password: config.password,
                    regionCode: config.region,
                    debug: true
                });
                this.status({
                    text: `Executing [${msg.payload}]`,
                    fill: 'green',
                    shape: 'circle'
                });
                const response = await actuation(client);
                this.send(response);
                this.status({ text: `Executed [${msg.payload}]`, fill: 'green' });
            } catch (error) {
                this.error(error);
                this.status({ text: error.message, fill: 'red' });
            }
        });
    });
};
