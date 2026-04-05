import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaChevronLeft, FaMapMarkerAlt, FaPhone, FaSave, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../Slices/userSlice';
import { toast } from 'react-hot-toast';

function Userprofile() {
  const { userObj, isSuccess: isuserSuccess, isLoading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: userObj?.address || {}
  });

  useEffect(() => {
    if (isuserSuccess === false) {
      navigate('/login');
    }
  }, [isuserSuccess, navigate]);

  // Set initial form values if address exists
  useEffect(() => {
    if (userObj.address) {
      setValue('street', userObj.address.street);
      setValue('city', userObj.address.city);
      setValue('pincode', userObj.address.pincode);
      setValue('phone', userObj.address.phone);
    }
  }, [userObj, setValue]);

  const onAddressSubmit = (addressData) => {
    // Create a copy and remove immutable _id field
    const modifiedUser = {
      ...userObj,
      address: addressData,
      city: addressData.city 
    };
    
    // Remove _id to avoid MongoDB immutable field error
    delete modifiedUser._id;

    dispatch(updateUser(modifiedUser))
      .unwrap()
      .then(() => {
        toast.success("Profile & Address updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update profile");
      });
  };

  return (
    <div className="container py-5 min-vh-100">
      {isuserSuccess && (
        <div className="row justify-content-center pt-4">
          <div className="col-lg-10">
            <Button 
                onClick={() => navigate("/products")} 
                className="btn-premium btn-sm mb-4 bg-transparent border-gold text-gold"
            >
              <FaChevronLeft className="me-2"/> Back to Menu
            </Button>

            <Row className="g-4">
              {/* Profile Card */}
              <Col lg={5}>
                <div className="glass-card p-5 text-center h-100 animate__animated animate__fadeInLeft">
                  <div className="position-relative d-inline-block mb-4">
                    <img
                      src={userObj.profileImg}
                      alt="Profile"
                      className="rounded-circle shadow-xl border border-gold"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 end-0 bg-gold p-2 rounded-circle shadow">
                      <FaUserEdit className="text-dark" />
                    </div>
                  </div>

                  <h1 className="h2 text-gold mb-1">{userObj.username}</h1>
                  <Badge bg="gold" className="text-dark mb-4 px-3 py-2 text-uppercase ls-1">Platinum Member</Badge>
                  
                  <div className="text-start mt-4">
                    <div className="p-3 glass-card mb-3 border-0 bg-opacity-10">
                      <span className="text-muted small d-block mb-1">Authenticated Email</span>
                      <span className="text-gold fw-bold">{userObj.email}</span>
                    </div>
                    <div className="p-3 glass-card border-0 bg-opacity-10">
                      <span className="text-muted small d-block mb-1">Member Since</span>
                      <span className="text-gold fw-bold">March 2024</span>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Address Management Card */}
              <Col lg={7}>
                <div className="glass-card p-5 h-100 animate__animated animate__fadeInRight">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-gold mb-0">Delivery Settings</h3>
                    {!isEditing && (
                      <Button 
                        variant="outline-gold" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                      >
                        {userObj.address ? 'Update Address' : 'Add Address'}
                      </Button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="address-display">
                      {userObj.address ? (
                        <div className="row g-4">
                          <Col md={12}>
                            <div className="p-4 glass-card border-gold border-opacity-10">
                              <div className="d-flex align-items-center mb-3">
                                <FaMapMarkerAlt className="text-gold me-2" size={20}/>
                                <h5 className="text-gold mb-0">Primary Residence</h5>
                              </div>
                              <p className="text-white mb-1">{userObj.address.street}</p>
                              <p className="text-white mb-3">{userObj.address.city} - {userObj.address.pincode}</p>
                              
                              <div className="d-flex align-items-center pt-2 border-top border-gold border-opacity-10">
                                <FaPhone className="text-gold me-2" size={16}/>
                                <span className="text-gold">{userObj.address.phone}</span>
                              </div>
                            </div>
                          </Col>
                        </div>
                      ) : (
                        <div className="text-center py-5 glass-card border-dashed">
                          <FaMapMarkerAlt size={40} className="text-muted mb-3 opacity-30" />
                          <p className="text-muted">No delivery address saved yet.</p>
                          <Button variant="link" className="text-gold" onClick={() => setIsEditing(true)}>Set up your first address</Button>
                        </div>
                      )}
                      
                      <div className="mt-5 pt-4 border-top border-gold border-opacity-10">
                        <h6 className="text-muted text-uppercase small ls-1 mb-3">Preferences</h6>
                        <Form.Check type="switch" label="Receive order updates via SMS" defaultChecked className="text-muted small mb-2" />
                        <Form.Check type="switch" label="Share location for faster delivery" defaultChecked className="text-muted small" />
                      </div>
                    </div>
                  ) : (
                    <Form onSubmit={handleSubmit(onAddressSubmit)} className="animate__animated animate__fadeIn">
                      <Row className="g-3">
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label className="small text-muted">Street / Apartment / House No.</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g. 123 Gold Street, Amber Apartments" 
                              {...register("street", { required: "Street is required" })}
                              className="bg-dark border-gold border-opacity-20 text-white"
                            />
                            {errors.street && <span className="text-danger small">{errors.street.message}</span>}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="small text-muted">City</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g. Hyderabad" 
                              {...register("city", { required: "City is required" })}
                              className="bg-dark border-gold border-opacity-20 text-white"
                            />
                            {errors.city && <span className="text-danger small">{errors.city.message}</span>}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="small text-muted">Pincode</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="e.g. 500001" 
                              {...register("pincode", { required: "Pincode is required" })}
                              className="bg-dark border-gold border-opacity-20 text-white"
                            />
                            {errors.pincode && <span className="text-danger small">{errors.pincode.message}</span>}
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label className="small text-muted">Contact Phone</Form.Label>
                            <Form.Control 
                              type="tel" 
                              placeholder="e.g. +91 98765 43210" 
                              {...register("phone", { required: "Phone is required" })}
                              className="bg-dark border-gold border-opacity-20 text-white"
                            />
                            {errors.phone && <span className="text-danger small">{errors.phone.message}</span>}
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="d-flex gap-2 mt-5">
                        <Button 
                            type="submit" 
                            className="btn-premium flex-grow-1 py-2" 
                            disabled={isLoading}
                        >
                          <FaSave className="me-2"/> {isLoading ? 'Saving...' : 'Save Address'}
                        </Button>
                        <Button 
                            variant="outline-danger" 
                            onClick={() => setIsEditing(false)} 
                            className="px-4"
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userprofile;