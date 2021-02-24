const { createNewTimeline } = require("../lib/db");
const { decodeToken } = require("../lib/utils");

module.exports.handler = async function createTimeline(event) {
    const body = JSON.parse(event.body);

    const userObj = await decodeToken(event.headers.Authorization);

    var timeline = {
        name: body.name,
        description: body.description,
        userId: userObj.id
    }

    try {
        const response = await createNewTimeline(timeline)

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        };
    } catch (err) {
        console.log("ERROR: " + err)
        return {
            statusCode: err.statusCode || 500,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: { stack: err.stack, message: err.message }
        };
    }

};