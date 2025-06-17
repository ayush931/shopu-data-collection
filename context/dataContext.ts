export const getDetails = async () => {
  const response = await fetch("/api/company/get", {
    method: "GET",
    credentials: "include"
  })

  if (!response.ok) {
    return {
      success: false,
      message: "Failed to fetch the details"
    }
  }

  const data = await response.json();

  return {
    success: true,
    message: "Company details fetched",
    data
  }
}