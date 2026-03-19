'use client'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Dog API Documentation</h1>
      {/* Apunta al archivo swagger.yaml en /public */}
      <SwaggerUI url="/swagger.yaml" />
    </div>
  )
}