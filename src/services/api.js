
const API = "https://sassivaserver.vercel.app";
//const API = "http://localhost:5000"
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

export const postProduct = async(formData)=>{
  await fetch(`${API}/product/add`, {
      method: "POST",
      credentials:"include",
      body: formData,
    });
}


