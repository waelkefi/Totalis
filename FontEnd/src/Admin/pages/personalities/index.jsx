import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBadge } from "../../components/personality-card";
import {
  Card,
  Button,
  Table,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
  Pagination,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPersonalitiesReq } from "../../../Redux/Actions/personality.action";
import TopBar from "../../../Components/Navigation/TopBar";

export default function PersonalitiesList() {
  const navigate = useNavigate();


  const [isLoading , setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  const personalities = useSelector((state) => state.personality.all || []);


  // Fetch user's visions on mount
useEffect(() => {
  const fetchData = async () => {
    await dispatch(getAllPersonalitiesReq());
    setLoading(false);
  };

  fetchData();
}, [dispatch]);


  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    fetch(`/api/personalities/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        setPersonalities((prev) =>
          prev.filter((p) => p._id !== deleteId)
        );
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setShowDeleteModal(false);
      });
  };


  console.log("personnalities", personalities);
  const filteredPersonalities = personalities
    ? personalities.filter((p) => {
        const matchesType = typeFilter ? p.type === typeFilter : true;
        const matchesCategory = categoryFilter ? p.categorie === categoryFilter : true;
        const matchesSearch = searchQuery
          ? p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesType && matchesCategory && matchesSearch;
      })
    : [];

  // Pagination
  const totalPages = Math.ceil(filteredPersonalities.length / itemsPerPage);
  const paginatedPersonalities = filteredPersonalities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    // Show only first page, last page, and pages near current page
    if (
      number === 1 || 
      number === totalPages || 
      (number >= currentPage - 1 && number <= currentPage + 1)
    ) {
      paginationItems.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    } else if (
      (number === 2 && currentPage > 3) || 
      (number === totalPages - 1 && currentPage < totalPages - 2)
    ) {
      paginationItems.push(<Pagination.Ellipsis key={`ellipsis-${number}`} />);
    }
  }

 const LoadingState = () => (
    <div className="text-center p-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <div>
      <TopBar title={"Personalities"} />
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
           
          <p className="text-secondary">Manage all MBTI personality types</p>
        </div>
        <button 
          className="dark-btn"
          onClick={() => navigate("/personalities/add")}
        >
          <i className="bi bi-plus-circle me-2"></i> Add New
        </button>
      </div>

      {/* Filter Controls */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-4">
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label>Filter by Type</Form.Label>
                <Form.Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="INTJ">INTJ</option>
                  <option value="INTP">INTP</option>
                  <option value="ENTJ">ENTJ</option>
                  <option value="ENTP">ENTP</option>
                  <option value="INFJ">INFJ</option>
                  <option value="INFP">INFP</option>
                  <option value="ENFJ">ENFJ</option>
                  <option value="ENFP">ENFP</option>
                  <option value="ISTJ">ISTJ</option>
                  <option value="ISFJ">ISFJ</option>
                  <option value="ESTJ">ESTJ</option>
                  <option value="ESFJ">ESFJ</option>
                  <option value="ISTP">ISTP</option>
                  <option value="ISFP">ISFP</option>
                  <option value="ESTP">ESTP</option>
                  <option value="ESFP">ESFP</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Analysts">Analysts</option>
                  <option value="Diplomats">Diplomats</option>
                  <option value="Sentinels">Sentinels</option>
                  <option value="Explorers">Explorers</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search personalities"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Personalities Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 text-uppercase small fw-bold text-secondary">Type</th>
                    <th className="px-4 py-3 text-uppercase small fw-bold text-secondary">Role</th>
                    <th className="px-4 py-3 text-uppercase small fw-bold text-secondary">Category</th>
                    <th className="px-4 py-3 text-uppercase small fw-bold text-secondary">Description</th>
                    <th className="px-4 py-3 text-uppercase small fw-bold text-secondary text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPersonalities.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-secondary">
                        No personality types found
                      </td>
                    </tr>
                  ) : (
                    paginatedPersonalities.map((personality) => (
                      <tr key={personality.id}>
                        <td className="px-4 py-3">
                          <span className="fw-medium">{personality.type}</span>
                        </td>
                        <td className="px-4 py-3">{personality.role}</td>
                        <td className="px-4 py-3">
                          <CategoryBadge category={personality.categorie} />
                        </td>
                        <td className="px-4 py-3">
                          <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {personality.description}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-end">
                          <Button
                            variant="link"
                            className="text-primary px-2 py-1 me-1"
                            onClick={() => navigate(`/personalities/view/${personality._id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="link"
                            className="text-info px-2 py-1 me-1"
                            onClick={() => navigate(`/personalities/edit/${personality._id}`)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="link"
                            className="text-danger px-2 py-1"
                            onClick={() => openDeleteModal(personality._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Card.Footer className="bg-white d-flex justify-content-between align-items-center">
            <div className="d-none d-md-block small text-secondary">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPersonalities.length)} of {filteredPersonalities.length} results
            </div>
            <Pagination className="mb-0">
              <Pagination.Prev 
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {paginationItems}
              <Pagination.Next 
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Card.Footer>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this personality type? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(deleteId)}
            // disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
