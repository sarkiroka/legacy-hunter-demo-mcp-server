import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Pharmaceutical Patents API",
        version: "1.0.0",
    });

    private baseUrl = "/";

    async init() {
        // Tool to get all patents
        this.server.tool(
            "getAllPatents",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to add a new patent
        this.server.tool(
            "addNewPatent",
            z.object({
                publication_number: z.string(),
                title: z.string(),
                abstract: z.string().optional(),
                type: z.enum(["Application", "Grant"]).optional(),
                filing_date: z.string().optional(),
                publication_date: z.string().optional(),
                applicant: z.string().optional(),
                assignee: z.string().optional(),
                inventors: z.array(z.string()).optional(),
            }),
            async (input) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(input),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to get patent by publication number
        this.server.tool(
            "getPatentByNumber",
            z.object({ patentNumber: z.string() }),
            async ({ patentNumber }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents/${patentNumber}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to update patent
        this.server.tool(
            "updatePatent",
            z.object({ patentNumber: z.string(), input: z.object({
                publication_number: z.string().optional(),
                title: z.string().optional(),
                abstract: z.string().optional(),
                type: z.enum(["Application", "Grant"]).optional(),
                filing_date: z.string().optional(),
                publication_date: z.string().optional(),
                applicant: z.string().optional(),
                assignee: z.string().optional(),
                inventors: z.array(z.string()).optional(),
            }) }),
            async ({ patentNumber, input }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents/${patentNumber}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(input),
                    });
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to delete patent
        this.server.tool(
            "deletePatent",
            z.object({ patentNumber: z.string() }),
            async ({ patentNumber }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents/${patentNumber}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        return {
                            content: [{ type: "text", text: `Patent ${patentNumber} deleted successfully.` }],
                        };
                    }
                    return {
                        content: [{ type: "text", text: `Error: Patent not found or could not be deleted.` }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to get all inventors
        this.server.tool(
            "getAllInventors",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/inventors`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to get inventor by ID or email
        this.server.tool(
            "getInventorByIdOrEmail",
            z.object({ identifier: z.string() }),
            async ({ identifier }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/inventors/${identifier}`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );

        // Tool to get inventor's patents
        this.server.tool(
            "getInventorsPatents",
            z.object({ identifier: z.string() }),
            async ({ identifier }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/inventors/${identifier}/patents`);
                    const data = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                    };
                }
            }
        );
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/sse" || url.pathname === "/sse/message") {
            return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};