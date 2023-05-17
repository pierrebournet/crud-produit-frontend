import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Table, Container } from 'react-bootstrap';
import { fetchProduits, createProduit, updateProduit, deleteProduit } from '../api';
import './Produits.css';


export interface Produit {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
}

const defaultSelectedProduit: Produit = {
  id: 0,
  nom: "",
  prix: 0,
  quantite: 0,
};

const Produits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>({
    id: 0,
    nom: "",
    prix: 0,
    quantite: 0,
  });

  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.type === "number" ? parseInt(event.target.value) : event.target.value;
    setSelectedProduit({
      id: selectedProduit?.id || 0,
      nom: selectedProduit?.nom || "",
      prix: selectedProduit?.prix || 0,
      quantite: selectedProduit?.quantite || 0,
      [name]: value
    });
  };

  useEffect(() => {
    const loadProduits = async () => {
      const data = await fetchProduits();
      setProduits(data);
    };
    loadProduits();
  }, []);

  const handleSave = async () => {
    if (selectedProduit) {
      if (selectedProduit.id) {
        // modifier produit existant
        await updateProduit(selectedProduit.id, selectedProduit);
      } else {
        // add nouveau produit
        await createProduit(selectedProduit);
      }
    }
  
  
    const data = await fetchProduits();
    setProduits(data);
    setSelectedProduit(defaultSelectedProduit);
    handleClose();
  };

  const handleEdit = (produit: Produit) => {
    setSelectedProduit(produit);
    handleShow();
  };

  const handleDelete = async (id: number) => {
    await deleteProduit(id);
    const data = await fetchProduits();
    setProduits(data);
  };

  return (
    <Container fluid >
      <Row className="bg-primary text-white p-2">
        <Col xs={12}>
          <h3 className="text-center">Produits</h3>
        </Col>
      </Row>
      <Row style={{ display: showForm ? "block" : "none" }}>
        <Col xs={12} md={8} className="mx-auto">
          <h3 className="text-center">
            {selectedProduit ? "Editer" : "Ajouter"} un produit
          </h3>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={selectedProduit?.nom || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={selectedProduit?.prix || 0}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                name="quantite"
                value={selectedProduit?.quantite || 0}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" className='mb-2 mt-2' onClick={handleSave}>
              {selectedProduit ? "Enregistrer" : "Ajouter"}
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Annuler
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs={12} className="mb-2">
          <Button variant="primary" onClick={handleShow}>
            Ajouter un produit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3 className="text-center">Liste des produits</h3>
          <Table striped bordered hover responsive className="w-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prix</th>
                <th className="d-none d-md-table-cell">Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit, index) => (
                <tr key={produit.id}>
                  <td>{index + 1}</td>
                  <td>{produit.nom}</td>
                  <td>{produit.prix}</td>
                  <td className="d-none d-md-table-cell">{produit.quantite}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="d-md-inline mr-2"
                      size="sm"
                      onClick={() => handleEdit(produit)}
                    >
                      Editer
                    </Button>{" "}
                    <Button
                      variant="danger"
                      className="d-md-inline mr-2"
                      size="sm"
                      onClick={() => handleDelete(produit.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
              }  

export default Produits;