export const getCompanyName = async () => {
  const response = await fetch('/api/companyName/get', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return {
      success: false,
      message: 'Failed to fetch company details',
    };
  }

  const data = await response.json();

  return {
    success: true,
    message: 'Company Names is fetched',
    data,
  };
};

export const createCompanyName = async (formData: Record<string, unknown>) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: false,
      message: 'Login first',
    };
  }

  const response = await axios.post('/api/companyName/create', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    localStorage.removeItem('token');
    return {
      success: false,
      message: 'Unable to create company',
    };
  }

  return response.data;
};
