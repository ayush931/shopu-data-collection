import axios from 'axios';

export const getDetails = async () => {
  const response = await fetch('/api/company/get', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return {
      success: false,
      message: 'Failed to fetch the details',
    };
  }

  const data = await response.json();

  return {
    success: true,
    message: 'Company details fetched',
    data,
  };
};

export const getDetailsById = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: true,
      message: 'Login first',
    };
  }

  const response = await axios.get(`/api/company/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    localStorage.removeItem('token');
    return {
      success: false,
      message: 'Unable to recognize user',
    };
  }

  return response.data;
};

export const createCompany = async (formData: Record<string, unknown>) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: false,
      message: 'Login first',
    };
  }

  const response = await axios.post('/api/company/create', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    localStorage.removeItem('token');
    return {
      success: false,
      message: 'Not able to recognized user',
    };
  }

  return response.data;
};

export const deleteCompany = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: false,
      message: 'Login first',
    };
  }

  const response = await axios.delete(`/api/company/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    localStorage.removeItem('token');
    return {
      success: false,
      message: 'Not able to delete the details',
    };
  }

  return response.data;
};

export const updateDetails = async (
  id: string,
  formData: Record<string, unknown>
) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      success: false,
      message: 'Login first',
    };
  }

  const response = await axios.put(`/api/company/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    localStorage.removeItem('token');
    return {
      success: false,
      message: 'Not able to delete the details',
    };
  }

  return response.data;
};
