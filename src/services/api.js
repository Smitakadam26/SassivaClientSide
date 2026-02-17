
const API = "https://sassivaserver.vercel.app";
export const getAllProductsWomenSection = async () => {
  const res = await fetch(`${API}/product?category=women`);
  return res.json();
};
export const getAllProductsMenSection = async () => {
  const res = await fetch(`${API}/product?category=men`);
  return res.json();
};
export const getAllProductsKidSection = async () => {
  const res = await fetch(`${API}/product?category=kids`);
  return res.json();
};
export const getAllProducts = async () => {
  const res = await fetch(`${API}/product/All`);
  return res.json();
};
export const getProfile = async () => {
  const res = await fetch(`${API}/users/profile`, {
    credentials: "include"
  });
  return res.json();

};
export const signIn = async(email,password) =>{
   try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert("Login failed");
      return ;
    }          
    return response.json(); 

  } catch (err) {
    console.log(err);
  }
}
export const updateProfile = async (formData) => {

  const res = await fetch(`${API}/users/profile`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  return res.json();
};
export const updateProduct = async (id, formData) => {

  const res = await fetch(`${API}/product/${id}`, {
    method: "PUT",
    credentials:"include",
    body: formData,
  });

  return res.json();
};
export const getProductById = async (id) => {
  const res = await fetch(`${API}/product/${id}`);
  return res.json();
};
export const getFeaturedProducts = async () => {
  try {
    const response = await fetch(`${API}/product/featured`);

    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const fetchWishlist = async () => {
  const res = await fetch(`${API}/wishlist`, {
    method: "GET",
    credentials: "include", 
  });

  return res.json();
};
export const addToWishlist = async (productId) => {
  const res = await fetch(`${API}/wishlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return res.json();
};
export const removeFromWishlist = async (productId) => {
  const res = await fetch(
    `${API}/wishlist/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return res.json();
};
