import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Pharmaceutical Patents API",
        version: "1.0.0",
    });

    private baseUrl = "https://patents-openapi.helga-eross.workers.dev";

    async init() {
        // MCP tools based on OpenAPI endpoints
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

        this.server.tool(
            "addNewPatent",
            z.object({
                publication_number: z.string().describe("Patent publication number"),
                title: z.string().describe("Patent title"),
                abstract: z.string().optional().describe("Patent abstract"),
                type: z.enum(["Application", "Grant"]).optional().describe("Patent type"),
                filing_date: z.string().optional().describe("Filing date"),
                publication_date: z.string().optional().describe("Publication date"),
                applicant: z.string().optional().describe("Applicant name"),
                assignee: z.string().optional().describe("Patent assignee"),
                inventors: z.array(z.string()).optional().describe("Inventor names"),
            }),
            async (body) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
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

        this.server.tool(
            "getPatentByNumber",
            z.object({
                patentNumber: z.string().describe("Patent publication number"),
            }),
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

        this.server.tool(
            "updatePatent",
            z.object({
                patentNumber: z.string().describe("Patent publication number"),
                body: z.object({
                    publication_number: z.string().optional(),
                    title: z.string().optional(),
                    abstract: z.string().optional(),
                    type: z.enum(["Application", "Grant"]).optional(),
                    filing_date: z.string().optional(),
                    publication_date: z.string().optional(),
                    applicant: z.string().optional(),
                    assignee: z.string().optional(),
                    inventors: z.array(z.string()).optional(),
                }),
            }),
            async ({ patentNumber, body }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents/${patentNumber}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
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

        this.server.tool(
            "deletePatent",
            z.object({
                patentNumber: z.string().describe("Patent publication number"),
            }),
            async ({ patentNumber }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/patents/${patentNumber}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        return {
                            content: [{ type: "text", text: "Patent deleted successfully" }],
                        };
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
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

        this.server.tool(
            "getInventorByIdOrEmail",
            z.object({
                identifier: z.string().describe("Inventor ID or email address"),
            }),
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

        this.server.tool(
            "getInventorsPatents",
            z.object({
                identifier: z.string().describe("Inventor ID or email address"),
            }),
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