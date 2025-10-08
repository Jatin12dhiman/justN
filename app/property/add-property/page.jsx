"use client";
import React, { useState } from "react";
import { X, Plus, Trash2, Upload, Loader2, Save } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

function UserInfoModal({ isOpen, onClose, onSubmit }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.phone) {
      onSubmit(userInfo);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AddPropertyPage() {
  const [showUserModal, setShowUserModal] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const initialFormData = {
    title: "",
    description: "",
    propertyType: "",
    transactionType: "",
    location: {
      city: "",
      state: "",
      area: "",
      address: "",
      pincode: "",
      geo: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    pricing: {
      buyPrice: null,
      priceType: "fixed",
      pricePerUnit: null,
      rent: null,
      deposit: null,
      rentFrequency: "monthly",
      maintenanceIncluded: false,
      leasingTermMonths: null,
      pgRent: null,
      pgType: null,
      leaseRent: null,
      leaseDeposit: null,
      leaseTermYears: null,
      unitPrices: [],
      currency: "INR",
      isNegotiable: false
    },
    sizeValue: null,
    sizeUnit: "sqft",
    carpetArea: null,
    builtUpArea: null,
    superBuiltUpArea: null,
    bedrooms: null,
    bathrooms: null,
    balconies: null,
    floor: "",
    totalFloors: null,
    facing: "NA",
    furnished: "NA",
    furnitureList: [],
    ageOfPropertyYears: null,
    parkingType: "NA",
    serviceRoom: false,
    maintenanceCharge: null,
    maintenanceFrequency: null,
    petAllowed: false,
    facingBalcony: "",
    carpetAreaCommercial: null,
    officeArea: null,
    warehouseArea: null,
    loadingDocks: false,
    powerCapacityKva: null,
    suitableFor: [],
    floorLoadingKgPerSqft: null,
    media: [],
    amenities: [],
    contact: {
      contactName: "",
      contactPhone: "",
      contactPhoneVerified: false,
      contactEmail: ""
    },
    projectDetails: {
      projectName: "",
      builderName: "",
      totalUnits: null,
      availableUnits: null,
      possessionDate: null,
      projectAmenities: [],
      unitTypes: [],
      reraNumber: "",
      reraUrl: ""
    },
    seo: {
      keywords: [],
      metaDescription: ""
    },
    expiryDate: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [currentFurniture, setCurrentFurniture] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentSuitableFor, setCurrentSuitableFor] = useState("");

  const handleUserSubmit = (info) => {
    setUserInfo(info);
    setFormData(prev => ({
      ...prev,
      contact: {
        contactName: info.name,
        contactEmail: info.email,
        contactPhone: info.phone,
        contactPhoneVerified: false
      }
    }));
    setShowUserModal(false);
  };

  const handleInputChange = (field, value, nested = null) => {
    setFormData(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested],
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleMediaUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    try {
      setUploadingMedia(true);

      const uploadPromises = files.map(async (file) => {
        const timestamp = Date.now();
        const fileName = `properties/${timestamp}_${Math.random().toString(36).substring(2)}.${file.name.split('.').pop()}`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        return {
          url,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          caption: ""
        };
      });

      const uploadedMedia = await Promise.all(uploadPromises);

      setFormData(prev => ({
        ...prev,
        media: [...prev.media, ...uploadedMedia]
      }));

      toast.success(`${uploadedMedia.length} file(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error("Failed to upload media files");
    } finally {
      setUploadingMedia(false);
      event.target.value = '';
    }
  };

  const removeMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const updateMediaCaption = (index, caption) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.map((item, i) =>
        i === index ? { ...item, caption } : item
      )
    }));
  };

  const addAmenity = () => {
    const amenity = currentAmenity.trim();
    if (!amenity || formData.amenities.includes(amenity)) return;

    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, amenity]
    }));
    setCurrentAmenity("");
  };

  const removeAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const addFurniture = () => {
    const furniture = currentFurniture.trim();
    if (!furniture || formData.furnitureList.includes(furniture)) return;

    setFormData(prev => ({
      ...prev,
      furnitureList: [...prev.furnitureList, furniture]
    }));
    setCurrentFurniture("");
  };

  const removeFurniture = (furniture) => {
    setFormData(prev => ({
      ...prev,
      furnitureList: prev.furnitureList.filter(f => f !== furniture)
    }));
  };

  const addKeyword = () => {
    const keyword = currentKeyword.trim();
    if (!keyword || formData.seo.keywords.includes(keyword)) return;

    handleInputChange("keywords", [...formData.seo.keywords, keyword], "seo");
    setCurrentKeyword("");
  };

  const removeKeyword = (keyword) => {
    handleInputChange("keywords", formData.seo.keywords.filter(k => k !== keyword), "seo");
  };

  const addSuitableFor = () => {
    const item = currentSuitableFor.trim();
    if (!item || formData.suitableFor.includes(item)) return;

    setFormData(prev => ({
      ...prev,
      suitableFor: [...prev.suitableFor, item]
    }));
    setCurrentSuitableFor("");
  };

  const removeSuitableFor = (item) => {
    setFormData(prev => ({
      ...prev,
      suitableFor: prev.suitableFor.filter(s => s !== item)
    }));
  };

  const addUnitPrice = () => {
    const newUnit = {
      unitType: "",
      size: null,
      sizeUnit: "sqft",
      pricePerUnit: null,
      inventoryCount: 0
    };

    handleInputChange("unitPrices", [...formData.pricing.unitPrices, newUnit], "pricing");
  };

  const updateUnitPrice = (index, field, value) => {
    const updatedUnits = formData.pricing.unitPrices.map((unit, i) =>
      i === index ? { ...unit, [field]: value } : unit
    );
    handleInputChange("unitPrices", updatedUnits, "pricing");
  };

  const removeUnitPrice = (index) => {
    const updatedUnits = formData.pricing.unitPrices.filter((_, i) => i !== index);
    handleInputChange("unitPrices", updatedUnits, "pricing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }
    try {
      setLoading(true);

      const submitData = {
        ...formData,
        status: "Pending",
        createdBy: "USER",
        projectDetails: formData.projectDetails.possessionDate ? {
          ...formData.projectDetails,
          possessionDate: formData.projectDetails.possessionDate.toISOString()
        } : formData.projectDetails
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Property added successfully!");
        setTimeout(() => window.location.href = '/', 2000)
        setFormData(initialFormData);
      } else {
        toast.error(result.message || "Failed to add property");
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.description.trim() || formData.description.length < 30) {
      errors.push("Description must be at least 30 characters");
    }
    if (!formData.propertyType) errors.push("Property type is required");
    if (!formData.transactionType) errors.push("Transaction type is required");
    if (!formData.location.city.trim()) errors.push("City is required");
    if (!formData.contact.contactPhone.trim()) errors.push("Contact phone is required");

    if (formData.transactionType === "Buy" && !formData.pricing.buyPrice) {
      errors.push("Buy price is required for purchase properties");
    }
    if (formData.transactionType === "Rent" && !formData.pricing.rent) {
      errors.push("Rent amount is required for rental properties");
    }
    if (formData.transactionType === "PG" && !formData.pricing.pgRent) {
      errors.push("PG rent is required for PG properties");
    }
    if (formData.transactionType === "Lease" && !formData.pricing.leaseRent) {
      errors.push("Lease rent is required for lease properties");
    }

    return errors;
  }

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "location", label: "Location" },
    { id: "pricing", label: "Pricing" },
    { id: "details", label: "Details" },
    { id: "media", label: "Media" },
    { id: "additional", label: "Additional" }
  ];

  const propertyTypes = ["Residential", "Commercial"];
  const transactionTypes = ["Buy", "Rent", "Lease", "PG", "Project"];
  const sizeUnits = ["sqft", "sqm", "sqyd"];
  const facingOptions = ["North", "South", "East", "West", "NA"];
  const furnishedOptions = ["Fully", "Semi", "Unfurnished", "NA"];
  const parkingOptions = ["Open", "Covered", "None", "NA"];
  const pgTypes = ["Single", "Shared"];
  const priceTypes = ["fixed", "perSqft"];
  const rentFrequencies = ["monthly", "yearly"];
  const maintenanceFrequencies = ["Monthly", "Yearly"];
  const suitableForOptions = [
    "Office", "Shop", "Showroom", "Restaurant", "Warehouse", "Factory",
    "Hospital", "School", "Bank", "ATM", "Retail", "Co-working"
  ];

  return (
    <>
      <UserInfoModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleUserSubmit}
      />

      <div className="bg-[#f9fafb] min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
            <p className="text-gray-600 mt-2">Fill in the details below to list your property</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-medium whitespace-nowrap transition ${activeTab === tab.id
                        ? "border-b-2 border-emerald-600 text-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., 3BHK Apartment in Sector 62"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => handleInputChange("propertyType", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select type</option>
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transaction Type *
                        </label>
                        <select
                          value={formData.transactionType}
                          onChange={(e) => handleInputChange("transactionType", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select type</option>
                          {transactionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-32"
                        placeholder="Describe your property in detail (minimum 30 characters)"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.description.length}/30 characters minimum
                      </p>
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.location.city}
                          onChange={(e) => handleInputChange("city", e.target.value, "location")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., Mumbai"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.location.state}
                          onChange={(e) => handleInputChange("state", e.target.value, "location")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., Maharashtra"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Area/Locality
                        </label>
                        <input
                          type="text"
                          value={formData.location.area}
                          onChange={(e) => handleInputChange("area", e.target.value, "location")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., Bandra West"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={formData.location.pincode}
                          onChange={(e) => handleInputChange("pincode", e.target.value, "location")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., 400050"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complete Address
                      </label>
                      <textarea
                        value={formData.location.address}
                        onChange={(e) => handleInputChange("address", e.target.value, "location")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter complete address"
                        rows="3"
                      />
                    </div>
                  </div>
                )}

                {/* Pricing Tab */}
                {activeTab === "pricing" && (
                  <div className="space-y-6">
                    {formData.transactionType === "Buy" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sale Price *
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.buyPrice || ""}
                            onChange={(e) => handleInputChange("buyPrice", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter sale price"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Type
                          </label>
                          <select
                            value={formData.pricing.priceType}
                            onChange={(e) => handleInputChange("priceType", e.target.value, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            {priceTypes.map(type => (
                              <option key={type} value={type}>
                                {type === "fixed" ? "Fixed Price" : "Per Sq Ft"}
                              </option>
                            ))}
                          </select>
                        </div>

                        {formData.pricing.priceType === "perSqft" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price Per Sq Ft
                            </label>
                            <input
                              type="number"
                              value={formData.pricing.pricePerUnit || ""}
                              onChange={(e) => handleInputChange("pricePerUnit", parseFloat(e.target.value) || null, "pricing")}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Enter price per sq ft"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {formData.transactionType === "Rent" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Rent *
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.rent || ""}
                            onChange={(e) => handleInputChange("rent", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter rent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Security Deposit
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.deposit || ""}
                            onChange={(e) => handleInputChange("deposit", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter deposit"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rent Frequency
                          </label>
                          <select
                            value={formData.pricing.rentFrequency}
                            onChange={(e) => handleInputChange("rentFrequency", e.target.value, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            {rentFrequencies.map(freq => (
                              <option key={freq} value={freq}>
                                {freq.charAt(0).toUpperCase() + freq.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Lease (Months)
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.leasingTermMonths || ""}
                            onChange={(e) => handleInputChange("leasingTermMonths", parseInt(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="e.g., 11"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="maintenanceIncluded"
                            checked={formData.pricing.maintenanceIncluded}
                            onChange={(e) => handleInputChange("maintenanceIncluded", e.target.checked, "pricing")}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <label htmlFor="maintenanceIncluded" className="text-sm font-medium text-gray-700">
                            Maintenance Included
                          </label>
                        </div>
                      </div>
                    )}

                    {formData.transactionType === "PG" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PG Rent *
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.pgRent || ""}
                            onChange={(e) => handleInputChange("pgRent", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter PG rent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PG Type
                          </label>
                          <select
                            value={formData.pricing.pgType || ""}
                            onChange={(e) => handleInputChange("pgType", e.target.value, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            <option value="">Select PG type</option>
                            {pgTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {formData.transactionType === "Lease" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lease Rent *
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.leaseRent || ""}
                            onChange={(e) => handleInputChange("leaseRent", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter lease rent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lease Deposit
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.leaseDeposit || ""}
                            onChange={(e) => handleInputChange("leaseDeposit", parseFloat(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter lease deposit"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lease Term (Years)
                          </label>
                          <input
                            type="number"
                            value={formData.pricing.leaseTermYears || ""}
                            onChange={(e) => handleInputChange("leaseTermYears", parseInt(e.target.value) || null, "pricing")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="e.g., 3"
                          />
                        </div>
                      </div>
                    )}

                    {formData.transactionType === "Project" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Unit Pricing</h3>
                          <button
                            type="button"
                            onClick={addUnitPrice}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
                          >
                            <Plus className="w-5 h-5" />
                            Add Unit Type
                          </button>
                        </div>

                        {formData.pricing.unitPrices.map((unit, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Unit {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeUnitPrice(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Unit Type
                                </label>
                                <input
                                  type="text"
                                  value={unit.unitType}
                                  onChange={(e) => updateUnitPrice(index, "unitType", e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                  placeholder="e.g., 2BHK"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Size
                                </label>
                                <input
                                  type="number"
                                  value={unit.size || ""}
                                  onChange={(e) => updateUnitPrice(index, "size", parseFloat(e.target.value) || null)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                  placeholder="Size"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Size Unit
                                </label>
                                <select
                                  value={unit.sizeUnit}
                                  onChange={(e) => updateUnitPrice(index, "sizeUnit", e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                  {sizeUnits.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Price Per Unit
                                </label>
                                <input
                                  type="number"
                                  value={unit.pricePerUnit || ""}
                                  onChange={(e) => updateUnitPrice(index, "pricePerUnit", parseFloat(e.target.value) || null)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                  placeholder="Price"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Inventory
                                </label>
                                <input
                                  type="number"
                                  value={unit.inventoryCount || 0}
                                  onChange={(e) => updateUnitPrice(index, "inventoryCount", parseInt(e.target.value) || 0)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                  placeholder="Available units"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isNegotiable"
                        checked={formData.pricing.isNegotiable}
                        onChange={(e) => handleInputChange("isNegotiable", e.target.checked, "pricing")}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="isNegotiable" className="text-sm font-medium text-gray-700">
                        Price is negotiable
                      </label>
                    </div>
                  </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Size
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={formData.sizeValue || ""}
                            onChange={(e) => handleInputChange("sizeValue", parseFloat(e.target.value) || null)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Size"
                          />
                          <select
                            value={formData.sizeUnit}
                            onChange={(e) => handleInputChange("sizeUnit", e.target.value)}
                            className="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            {sizeUnits.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {formData.propertyType === "Residential" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Carpet Area
                            </label>
                            <input
                              type="number"
                              value={formData.carpetArea || ""}
                              onChange={(e) => handleInputChange("carpetArea", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Carpet area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Built-up Area
                            </label>
                            <input
                              type="number"
                              value={formData.builtUpArea || ""}
                              onChange={(e) => handleInputChange("builtUpArea", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Built-up area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Super Built-up Area
                            </label>
                            <input
                              type="number"
                              value={formData.superBuiltUpArea || ""}
                              onChange={(e) => handleInputChange("superBuiltUpArea", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Super built-up area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bedrooms
                            </label>
                            <input
                              type="number"
                              value={formData.bedrooms || ""}
                              onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Number of bedrooms"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bathrooms
                            </label>
                            <input
                              type="number"
                              value={formData.bathrooms || ""}
                              onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Number of bathrooms"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Balconies
                            </label>
                            <input
                              type="number"
                              value={formData.balconies || ""}
                              onChange={(e) => handleInputChange("balconies", parseInt(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Number of balconies"
                            />
                          </div>
                        </>
                      )}

                      {formData.propertyType === "Commercial" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Carpet Area (Commercial)
                            </label>
                            <input
                              type="number"
                              value={formData.carpetAreaCommercial || ""}
                              onChange={(e) => handleInputChange("carpetAreaCommercial", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Commercial carpet area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Office Area
                            </label>
                            <input
                              type="number"
                              value={formData.officeArea || ""}
                              onChange={(e) => handleInputChange("officeArea", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Office area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Warehouse Area
                            </label>
                            <input
                              type="number"
                              value={formData.warehouseArea || ""}
                              onChange={(e) => handleInputChange("warehouseArea", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Warehouse area"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Power Capacity (KVA)
                            </label>
                            <input
                              type="number"
                              value={formData.powerCapacityKva || ""}
                              onChange={(e) => handleInputChange("powerCapacityKva", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Power capacity in KVA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Floor Loading (Kg/Sq Ft)
                            </label>
                            <input
                              type="number"
                              value={formData.floorLoadingKgPerSqft || ""}
                              onChange={(e) => handleInputChange("floorLoadingKgPerSqft", parseFloat(e.target.value) || null)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Floor loading capacity"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Floor
                        </label>
                        <input
                          type="text"
                          value={formData.floor}
                          onChange={(e) => handleInputChange("floor", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., 3rd Floor"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Floors
                        </label>
                        <input
                          type="number"
                          value={formData.totalFloors || ""}
                          onChange={(e) => handleInputChange("totalFloors", parseInt(e.target.value) || null)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Total floors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facing
                        </label>
                        <select
                          value={formData.facing}
                          onChange={(e) => handleInputChange("facing", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          {facingOptions.map(option => (
                            <option key={option} value={option}>
                              {option === "NA" ? "Not Specified" : option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Furnished Status
                        </label>
                        <select
                          value={formData.furnished}
                          onChange={(e) => handleInputChange("furnished", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          {furnishedOptions.map(option => (
                            <option key={option} value={option}>
                              {option === "NA" ? "Not Specified" : option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parking Type
                        </label>
                        <select
                          value={formData.parkingType}
                          onChange={(e) => handleInputChange("parkingType", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          {parkingOptions.map(option => (
                            <option key={option} value={option}>
                              {option === "NA" ? "Not Specified" : option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Age (Years)
                        </label>
                        <input
                          type="number"
                          value={formData.ageOfPropertyYears || ""}
                          onChange={(e) => handleInputChange("ageOfPropertyYears", parseInt(e.target.value) || null)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Age in years"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Balcony Facing
                        </label>
                        <input
                          type="text"
                          value={formData.facingBalcony}
                          onChange={(e) => handleInputChange("facingBalcony", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., Garden view"
                        />
                      </div>
                    </div>

                    {/* Furniture List */}
                    {(formData.furnished === "Fully" || formData.furnished === "Semi") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Furniture & Fittings
                        </label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={currentFurniture}
                            onChange={(e) => setCurrentFurniture(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFurniture())}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="e.g., Sofa, Bed, Dining Table, AC"
                          />
                          <button
                            type="button"
                            onClick={addFurniture}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        {formData.furnitureList.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.furnitureList.map((furniture, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {furniture}
                                <button
                                  type="button"
                                  onClick={() => removeFurniture(furniture)}
                                  className="hover:text-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Maintenance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maintenance Charge
                        </label>
                        <input
                          type="number"
                          value={formData.maintenanceCharge || ""}
                          onChange={(e) => handleInputChange("maintenanceCharge", parseFloat(e.target.value) || null)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Monthly maintenance amount"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maintenance Frequency
                        </label>
                        <select
                          value={formData.maintenanceFrequency || ""}
                          onChange={(e) => handleInputChange("maintenanceFrequency", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select frequency</option>
                          {maintenanceFrequencies.map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={currentAmenity}
                          onChange={(e) => setCurrentAmenity(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="e.g., Swimming Pool, Gym, Security, Parking"
                        />
                        <button
                          type="button"
                          onClick={addAmenity}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {formData.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {amenity}
                              <button
                                type="button"
                                onClick={() => removeAmenity(amenity)}
                                className="hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suitable For - Commercial Only */}
                    {formData.propertyType === "Commercial" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Suitable For
                        </label>
                        <div className="flex gap-2 mb-3">
                          <select
                            value={currentSuitableFor}
                            onChange={(e) => setCurrentSuitableFor(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          >
                            <option value="">Select suitable business type</option>
                            {suitableForOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={addSuitableFor}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        {formData.suitableFor.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.suitableFor.map((item, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {item}
                                <button
                                  type="button"
                                  onClick={() => removeSuitableFor(item)}
                                  className="hover:text-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Toggles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="serviceRoom"
                          checked={formData.serviceRoom}
                          onChange={(e) => handleInputChange("serviceRoom", e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="serviceRoom" className="text-sm font-medium text-gray-700">
                          Service Room Available
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="petAllowed"
                          checked={formData.petAllowed}
                          onChange={(e) => handleInputChange("petAllowed", e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="petAllowed" className="text-sm font-medium text-gray-700">
                          Pets Allowed
                        </label>
                      </div>

                      {formData.propertyType === "Commercial" && (
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="loadingDocks"
                            checked={formData.loadingDocks}
                            onChange={(e) => handleInputChange("loadingDocks", e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <label htmlFor="loadingDocks" className="text-sm font-medium text-gray-700">
                            Loading Docks Available
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <Upload className="w-12 h-12 text-gray-400" />
                        <div>
                          <label htmlFor="media-upload" className="cursor-pointer">
                            <span className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">
                              {uploadingMedia ? (
                                <>
                                  <Loader2 className="inline w-5 h-5 mr-2 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="inline w-5 h-5 mr-2" />
                                  Upload Media
                                </>
                              )}
                            </span>
                          </label>
                          <input
                            id="media-upload"
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                            disabled={uploadingMedia}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Upload images and videos (Max 10MB each)
                        </p>
                      </div>
                    </div>

                    {formData.media.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-900">
                          Uploaded Media ({formData.media.length})
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {formData.media.map((item, index) => (
                            <div key={index} className="relative group border rounded-lg overflow-hidden bg-gray-100">
                              {item.type === 'image' ? (
                                <img
                                  src={item.url}
                                  alt={`Property ${index + 1}`}
                                  className="w-full h-40 object-cover"
                                />
                              ) : (
                                <video
                                  src={item.url}
                                  className="w-full h-40 object-cover"
                                  controls={false}
                                />
                              )}

                              <div className="absolute top-2 right-2">
                                <button
                                  type="button"
                                  onClick={() => removeMedia(index)}
                                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-1 bg-white/90 text-xs font-medium rounded">
                                  {item.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info Display */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{formData.contact.contactName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{formData.contact.contactEmail || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{formData.contact.contactPhone || "Not provided"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUserModal(true)}
                className="mt-4 text-emerald-600 text-sm font-medium hover:underline"
              >
                Edit Contact Details
              </button>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || uploadingMedia}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding Property...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Add Property
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}




