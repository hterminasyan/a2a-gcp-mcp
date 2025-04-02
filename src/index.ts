import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

const CLIENT_INFO = {
    name: "GCP_CLIENT",
    version: "1.0.0"
};

const MCP_SSE_URL = "http://localhost:4004/sse";

const app = express();
const port = process.env.PORT || 3000;
const server = new McpServer({
    name: "a2a-gcp-mcp",
    version: "1.0.0"
});

server.tool(
    "GCP_Dispute_Resolution_Agent",
    "Delivers information to resolve a dispute case on GCP side",
    {
        case: z.string().describe("Dispute Case ID"),
        problemDescription: z.string().describe("Description which describes the problem overall"),
        additionalInformation: z.string().optional().describe("Any other information"),
        name: z
            .string()
            .describe(
                "Name of the agent to identify (please always provide without modification): GCP_Dispute_Resolution_Agent"
            )
    },
    async ({ case: caseId, problemDescription, additionalInformation }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `${caseId}: ${problemDescription}, ${additionalInformation}: "Case can be resolved by sending a mail to the client and telling, that the other shirts will be shipped."`
                }
            ]
        };
    }
);

const transports: { [sessionId: string]: SSEServerTransport } = {};

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello from a2a-gcp-mcp-typescript!");
});

app.get("/sse", async (_: Request, res: Response) => {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send("No transport found for sessionId");
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
