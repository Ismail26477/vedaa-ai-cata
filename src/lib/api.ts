const API_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL
  const fallbackUrl = "https://vedaa-ai-cata-2.onrender.com/api"

  if (envUrl) {
    console.log("[v0] Using VITE_API_URL:", envUrl)
    return envUrl
  }

  // In development, allow localhost; in production, use Render
  if (import.meta.env.MODE === "development") {
    console.log("[v0] Using development API URL: http://localhost:5000/api")
    return "http://localhost:5000/api"
  }

  console.log("[v0] Using production API URL:", fallbackUrl)
  return fallbackUrl
})()

console.log("[v0] API initialized with URL:", API_URL)

const handleFetchError = (error: any, endpoint: string) => {
  console.error(`[v0] API Error - ${endpoint}:`, {
    message: error.message,
    status: error.status,
    url: API_URL,
  })
}

export const api = {
  // Properties
  getProperties: async () => {
    try {
      const url = `${API_URL}/properties`
      console.log("[v0] Fetching properties from:", url)
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        console.error(`[v0] Properties fetch failed with status ${response.status}`)
        throw new Error(`Failed to fetch properties: ${response.statusText}`)
      }
      const data = await response.json()
      console.log("[v0] Properties fetched successfully:", data.length, "items")
      return data
    } catch (error) {
      handleFetchError(error, "getProperties")
      throw error
    }
  },

  getProperty: async (id: string) => {
    try {
      const url = `${API_URL}/properties/${id}`
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch property")
      return response.json()
    } catch (error) {
      handleFetchError(error, `getProperty/${id}`)
      throw error
    }
  },

  createProperty: async (property: any) => {
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      })
      if (!response.ok) throw new Error("Failed to create property")
      return response.json()
    } catch (error) {
      handleFetchError(error, "createProperty")
      throw error
    }
  },

  updateProperty: async (id: string, updates: any) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update property")
      return response.json()
    } catch (error) {
      handleFetchError(error, `updateProperty/${id}`)
      throw error
    }
  },

  deleteProperty: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete property")
      return response.json()
    } catch (error) {
      handleFetchError(error, `deleteProperty/${id}`)
      throw error
    }
  },

  // Leads
  getLeads: async () => {
    try {
      const url = `${API_URL}/leads`
      console.log("[v0] Fetching leads from:", url)
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch leads")
      const data = await response.json()
      console.log("[v0] Leads fetched successfully:", data.length, "items")
      return data
    } catch (error) {
      handleFetchError(error, "getLeads")
      throw error
    }
  },

  createLead: async (lead: any) => {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
      if (!response.ok) throw new Error("Failed to create lead")
      return response.json()
    } catch (error) {
      handleFetchError(error, "createLead")
      throw error
    }
  },

  updateLead: async (id: string, updates: any) => {
    try {
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update lead")
      return response.json()
    } catch (error) {
      handleFetchError(error, `updateLead/${id}`)
      throw error
    }
  },

  // Site Visits
  getSiteVisits: async () => {
    try {
      const url = `${API_URL}/site-visits`
      console.log("[v0] Fetching site visits from:", url)
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch site visits")
      const data = await response.json()
      console.log("[v0] Site visits fetched successfully:", data.length, "items")
      return data
    } catch (error) {
      handleFetchError(error, "getSiteVisits")
      throw error
    }
  },

  createSiteVisit: async (visit: any) => {
    try {
      const response = await fetch(`${API_URL}/site-visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visit),
      })
      if (!response.ok) throw new Error("Failed to create site visit")
      return response.json()
    } catch (error) {
      handleFetchError(error, "createSiteVisit")
      throw error
    }
  },

  updateSiteVisit: async (id: string, updates: any) => {
    try {
      const response = await fetch(`${API_URL}/site-visits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update site visit")
      return response.json()
    } catch (error) {
      handleFetchError(error, `updateSiteVisit/${id}`)
      throw error
    }
  },
}
