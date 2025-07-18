import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Key, GitBranch } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Reference | PulseCloud",
  description: "Comprehensive API reference for integrating with PulseCloud's mining platform.",
}

export default function ApiReferencePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">API Reference</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Integrate your applications with PulseCloud's powerful mining platform using our comprehensive API.
        </p>
      </section>

      <section id="overview" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">API Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Code className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">RESTful API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our API is built on REST principles, making it easy to understand and use with standard HTTP methods.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Key className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All API requests are secured using API keys and OAuth 2.0 for robust authentication.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <GitBranch className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Versioned API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We maintain versioned API endpoints to ensure backward compatibility and smooth transitions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="authentication" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Authentication</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          To access the PulseCloud API, you need to authenticate your requests using an API key.
        </p>
        <Card className="p-6 shadow-md bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-xl font-semibold mb-4">API Key Usage</CardTitle>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Include your API key in the `Authorization` header of your requests:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm font-mono overflow-x-auto">
              <pre>
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </div>
            <p className="text-muted-foreground">
              You can generate and manage your API keys from your dashboard settings.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="endpoints" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">API Endpoints</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Explore the available API endpoints to manage your mining operations.
        </p>

        <div className="space-y-8">
          {/* Wallets Endpoint */}
          <Card className="p-6 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Wallets</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                v1
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Manage user wallets and retrieve balance information.</p>
              <div className="space-y-2">
                <h4 className="font-semibold">GET /api/v1/wallets/balance</h4>
                <p className="text-sm text-muted-foreground">
                  Retrieve the current balance for the authenticated user.
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>
                      curl -H "Authorization: Bearer YOUR_API_KEY" https://api.pulsecloud.com/api/v1/wallets/balance
                    </code>
                  </pre>
                </div>
                <h4 className="font-semibold mt-4">POST /api/v1/wallets/withdraw</h4>
                <p className="text-sm text-muted-foreground">Initiate a withdrawal to a specified wallet address.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>
                      {`curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" \\
-d '{"amount": 0.01, "walletAddress": "0x..."}' \\
https://api.pulsecloud.com/api/v1/wallets/withdraw`}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mining Stats Endpoint */}
          <Card className="p-6 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Mining Stats</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                v1
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Access real-time mining performance data.</p>
              <div className="space-y-2">
                <h4 className="font-semibold">GET /api/v1/mining/hashrate</h4>
                <p className="text-sm text-muted-foreground">Retrieve the current hash rate for your account.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>
                      curl -H "Authorization: Bearer YOUR_API_KEY" https://api.pulsecloud.com/api/v1/mining/hashrate
                    </code>
                  </pre>
                </div>
                <h4 className="font-semibold mt-4">GET /api/v1/mining/earnings</h4>
                <p className="text-sm text-muted-foreground">Get historical earnings data.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>
                      curl -H "Authorization: Bearer YOUR_API_KEY"
                      https://api.pulsecloud.com/api/v1/mining/earnings?period=daily
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rigs Endpoint */}
          <Card className="p-6 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Mining Rigs</CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                v1
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Manage your mining rigs.</p>
              <div className="space-y-2">
                <h4 className="font-semibold">GET /api/v1/rigs</h4>
                <p className="text-sm text-muted-foreground">List all registered mining rigs.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.pulsecloud.com/api/v1/rigs</code>
                  </pre>
                </div>
                <h4 className="font-semibold mt-4">POST /api/v1/rigs</h4>
                <p className="text-sm text-muted-foreground">Register a new mining rig.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>
                    <code>
                      {`curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" \\
-d '{"name": "Rig 1", "hashrate": 100}' \\
https://api.pulsecloud.com/api/v1/rigs`}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="response-format" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Response Format</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          All API responses follow a consistent JSON format.
        </p>
        <Card className="p-6 shadow-md bg-gray-50 dark:bg-gray-800">
          <CardTitle className="text-xl font-semibold mb-4">Success Response</CardTitle>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm font-mono overflow-x-auto">
              <pre>
                <code>
                  {`{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully"
}`}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
