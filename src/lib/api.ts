const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function getAllPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function getPostsByCategory(slug: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch posts by category');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function login(credentials: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
}

export async function createPost(postData: any, token: string) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create post');
  }
  return res.json();
}

export async function createCategory(categoryData: any, token: string) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create category');
  }
  return res.json();
}

export async function uploadImage(file: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'pinter-cloud'; // Thay bằng cloud_name của bạn
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pinter_uploads';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Upload failed');
    }

    const data = await res.json();
    return { imageUrl: data.secure_url };
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error(error.message || 'Failed to connect to Cloudinary');
  }
}
