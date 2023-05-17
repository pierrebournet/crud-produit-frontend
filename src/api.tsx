import { Produit } from './components/Produits';

const API_BASE_URL = "http://localhost:8000"; 
export const fetchProduits = async () => {
  const response = await fetch(`${API_BASE_URL}/produits`);
  return response.json();
};

export const createProduit = async (produit: Produit) => {
    const response = await fetch(`${API_BASE_URL}/produits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produit),
    });
    return response.json();
  };

  export const updateProduit = async (id: number, produit: Produit) => {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produit),
    });
    return response.json();
  };
  

export const deleteProduit = async (id: number) => {
  await fetch(`${API_BASE_URL}/produits/${id}`, {
    method: "DELETE",
  });
};
