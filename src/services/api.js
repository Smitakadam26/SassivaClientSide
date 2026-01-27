export const getAllProductsWomenSection = async () => {
  const res = await fetch("http://localhost:5000/product?category=women");
  return res.json();
};
export const getAllProductsMenSection = async () => {
  const res = await fetch("http://localhost:5000/product?category=men");
  return res.json();
};
export const getAllProductsKidSection = async () => {
  const res = await fetch("http://localhost:5000/product?category=kid");
  return res.json();
};
export const getAllProducts = async () => {
  const res = await fetch("http://localhost:5000/product/All");
  return res.json();
};
export const getProfile = async () => {
  const data = JSON.parse(localStorage.getItem("user"));
  console.log(data.token)
  const res = await fetch("http://localhost:5000/users/profile", {
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  });
  return res.json();

};
export const updateProfile = async (formData) => {
  const data = JSON.parse(localStorage.getItem("user"));

  const res = await fetch("http://localhost:5000/users/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: formData,
  });

  return res.json();
};
export const updateProduct = async (id, formData) => {
  const data = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(`http://localhost:5000/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${data.token}`, 
    },
    body: formData,
  });

  return res.json();
};
export const getProductById = async (id) => {
  const res = await fetch(`http://localhost:5000/product/${id}`);
  return res.json();
};



