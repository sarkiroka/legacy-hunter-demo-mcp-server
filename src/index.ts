import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define our MCP agent with API tools
export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Swagger Petstore - OpenAPI 3.0",
        version: "1.0.12",
    });

    private baseUrl = "https://petstore3.swagger.io/api/v3";

    async init() {
        // Pet endpoints
        this.server.tool(
            "addPet",
            {
                pet: z.object({
                    name: z.string(),
                    photoUrls: z.array(z.string()),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }).describe("Pet object to add"),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet),
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "updatePet",
            {
                pet: z.object({
                    id: z.number(),
                    name: z.string(),
                    photoUrls: z.array(z.string()),
                    category: z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    }).optional(),
                    tags: z.array(z.object({
                        id: z.number().optional(),
                        name: z.string().optional(),
                    })).optional(),
                    status: z.enum(["available", "pending", "sold"]).optional(),
                }).describe("Pet object to update"),
            },
            async ({ pet }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pet),
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "findPetsByStatus",
            {
                status: z.string().optional().describe("Comma-separated list of pet statuses"),
            },
            async ({ status = 'available' }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByStatus?status=${status}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "findPetsByTags",
            {
                tags: z.array(z.string()).optional().describe("Comma-separated list of tags"),
            },
            async ({ tags }) => {
                const tagsParam = tags ? tags.join(',') : '';
                try {
                    const response = await fetch(`${this.baseUrl}/pet/findByTags?tags=${tagsParam}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "getPetById",
            {
                petId: z.number().describe("ID of the pet to fetch"),
            },
            async ({ petId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "updatePetWithForm",
            {
                petId: z.number().describe("ID of the pet to update"),
                name: z.string().optional().describe("New name for the pet"),
                status: z.string().optional().describe("New status for the pet"),
            },
            async ({ petId, name, status }) => {
                const formData = new URLSearchParams();
                if (name) formData.append('name', name);
                if (status) formData.append('status', status);
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'POST',
                        body: formData,
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "deletePet",
            {
                petId: z.number().describe("ID of the pet to delete"),
                api_key: z.string().optional().describe("API key for authorization"),
            },
            async ({ petId, api_key }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}`, {
                        method: 'DELETE',
                        headers: { 'api_key': api_key || '' },
                    });
                    return {
                        content: [{ type: "text", text: `Pet deleted successfully` }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "uploadFile",
            {
                petId: z.number().describe("ID of the pet to update"),
                additionalMetadata: z.string().optional().describe("Additional metadata"),
                file: z.instanceof(File).describe("File to upload"),
            },
            async ({ petId, additionalMetadata, file }) => {
                const formData = new FormData();
                if (additionalMetadata) formData.append('additionalMetadata', additionalMetadata);
                formData.append('file', file);
                try {
                    const response = await fetch(`${this.baseUrl}/pet/${petId}/uploadImage`, {
                        method: 'POST',
                        body: formData,
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        // Store endpoints
        this.server.tool(
            "getInventory",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/inventory`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "placeOrder",
            {
                order: z.object({
                    petId: z.number(),
                    quantity: z.number(),
                    shipDate: z.string().optional(),
                    status: z.enum(["placed", "approved", "delivered"]).optional(),
                    complete: z.boolean().optional(),
                }).describe("Order object to place"),
            },
            async ({ order }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order),
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "getOrderById",
            {
                orderId: z.number().describe("ID of the order to fetch"),
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "deleteOrder",
            {
                orderId: z.number().describe("ID of the order to delete"),
            },
            async ({ orderId }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/store/order/${orderId}`, {
                        method: 'DELETE',
                    });
                    return {
                        content: [{ type: "text", text: `Order deleted successfully` }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        // User endpoints
        this.server.tool(
            "createUser",
            {
                user: z.object({
                    id: z.number().optional(),
                    username: z.string(),
                    firstName: z.string(),
                    lastName: z.string(),
                    email: z.string(),
                    password: z.string(),
                    phone: z.string(),
                    userStatus: z.number().optional(),
                }).describe("User object to create"),
            },
            async ({ user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "createUsersWithListInput",
            {
                users: z.array(z.object({
                    id: z.number().optional(),
                    username: z.string(),
                    firstName: z.string(),
                    lastName: z.string(),
                    email: z.string(),
                    password: z.string(),
                    phone: z.string(),
                    userStatus: z.number().optional(),
                })).describe("List of user objects to create"),
            },
            async ({ users }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/createWithList`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(users),
                    });
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "loginUser",
            {
                username: z.string().describe("Username for login"),
                password: z.string().describe("Password for login"),
            },
            async ({ username, password }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/login?username=${username}&password=${password}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "logoutUser",
            {},
            async () => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/logout`);
                    return {
                        content: [{ type: "text", text: `Logged out successfully` }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "getUserByName",
            {
                username: z.string().describe("Username to fetch"),
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`);
                    const result = await response.json();
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "updateUser",
            {
                username: z.string().describe("Username to update"),
                user: z.object({
                    id: z.number().optional(),
                    username: z.string(),
                    firstName: z.string(),
                    lastName: z.string(),
                    email: z.string(),
                    password: z.string(),
                    phone: z.string(),
                    userStatus: z.number().optional(),
                }).describe("User object to update"),
            },
            async ({ username, user }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    });
                    return {
                        content: [{ type: "text", text: `User updated successfully` }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    };
                }
            }
        );

        this.server.tool(
            "deleteUser",
            {
                username: z.string().describe("Username to delete"),
            },
            async ({ username }) => {
                try {
                    const response = await fetch(`${this.baseUrl}/user/${username}`, {
                        method: 'DELETE',
                    });
                    return {
                        content: [{ type: "text", text: `User deleted successfully` }],
                    };
                } catch (error) {
                    return {
                        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
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