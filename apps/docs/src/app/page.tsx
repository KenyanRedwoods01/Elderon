export default function DocsHome() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">ElderonAI Documentation</h1>
      <p className="text-gray-600 mb-8">
        Learn how to use the ElderonAI platform to modernize your legacy systems
      </p>
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="text-gray-600">Quick start guide for new users</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">API Reference</h2>
          <p className="text-gray-600">Complete API documentation</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Guides</h2>
          <p className="text-gray-600">Step-by-step tutorials</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Examples</h2>
          <p className="text-gray-600">Real-world use cases</p>
        </div>
      </div>
    </div>
  );
}
