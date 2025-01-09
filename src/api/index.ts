const API_URL = 'http://localhost:3000/api';

// 添加健康检查函数
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error('Server health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Server health check failed:', error);
    throw error;
  }
}

export async function register(name: string, password: string, code: string) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, password, code })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function login(name: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function changePassword(name: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, password: password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '修改密码失败');
    }
    
    return response.json();
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
}

export async function generateInviteCode() {
  try {
    const response = await fetch(`${API_URL}/invite-code`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate invite code');
    }
    
    return response.json();
  } catch (error) {
    console.error('Generate invite code error:', error);
    throw error;
  }
}