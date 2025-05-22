import { GenericError, NotFoundError, ValidationError, MissingDataError } from "../utils/errors.js";
import validator from "validator";
import ServiceModel from "../models/ServicesEtProduits.js";
import CompanyModel from "../models/Company.js";

const serviceController = {
  createService: async (req, res, next) => {
    try {
      const {
        name,
        type,
        description,
        category,
        features,
        benefits,
        targetAudience,
        process,
        duration,
        specifications,
        warranty,
        stock,
        views,
        clicks,
      } = req.body;
      const { companyId } = req.params;
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw new NotFoundError("Company not exists!");
      }
      const service = await ServiceModel.create({
        name,
        type,
        description,
        category,
        features,
        benefits,
        serviceDetails: type === "Service" && {
          targetAudience,
          process,
          duration,
        },
        productDetails: type === "Product" && {
          specifications,
          warranty,
          stock,
        },
        performanceMetrics: {
          views,
          clicks,
        },
        company: companyId,
      });
      if (!service) {
        throw new GenericError("Failed to create the service!");
      }
      company.services.push(service._id);
      await company.save();
      return res.status(201).json({ message: "Service created successfully!" });
    } catch (err) {
      next(err);
    }
  },

  getAllServices: async (req, res, next) => {
    try {
      const services = await ServiceModel.find();
      if (!services) {
        throw new NotFoundError("No services found!");
      }
      return res.status(200).json({ message: "Success!", services });
    } catch (err) {
      next(err);
    }
  },

  getServiceDetails: async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      if (!validator.isMongoId(serviceId)) {
        throw new ValidationError("Invalid ID");
      }
      const service = await ServiceModel.findById(serviceId);
      if (!service) {
        throw new NotFoundError("Service not exists!");
      }
      return res.status(200).json({ message: "Success!", service });
    } catch (err) {
      next(err);
    }
  },

  getCompanyServices: async (req, res, next) => {
    try {
      const { companyId } = req.params;
      if (!validator.isMongoId(companyId)) {
        throw new ValidationError("Invalid ID");
      }
      // Correction: utiliser find() et non findById() pour récupérer tous les services liés à une company
      const services = await ServiceModel.find({ company: companyId });
      if (!services || services.length === 0) {
        throw new NotFoundError("No services found!");
      }
      return res.status(200).json({ message: "Success!", services });
    } catch (err) {
      next(err);
    }
  },

  updateServiceDetails: async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const {
        name,
        type,
        description,
        category,
        features,
        benefits,
        targetAudience,
        process,
        duration,
        specifications,
        warranty,
        stock,
        views,
        clicks,
      } = req.body;
      if (!validator.isMongoId(serviceId)) {
        throw new ValidationError("Invalid ID");
      }
      const service = await ServiceModel.findById(serviceId);
      if (!service) {
        throw new NotFoundError("Service Not exists!");
      }
      const data = service.toObject();

      if (name) {
        data.name = name;
      }
      if (description) {
        data.description = description;
      }
      if (type) {
        data.type = type;
        if (type === "Service") {
          data.productDetails = {}; // reset productDetails
          if (targetAudience) {
            // Assurez-vous que data.serviceDetails existe
            if (!data.serviceDetails) data.serviceDetails = {};
            data.serviceDetails.targetAudience = targetAudience;
          }
          if (process) {
            if (!data.serviceDetails) data.serviceDetails = {};
            data.serviceDetails.process = process;
          }
          if (duration) {
            if (!data.serviceDetails) data.serviceDetails = {};
            data.serviceDetails.duration = duration;
          }
        } else if (type === "Product") {
          data.serviceDetails = {}; // reset serviceDetails
          if (specifications) {
            if (!data.productDetails) data.productDetails = {};
            data.productDetails.specifications = specifications;
          }
          if (warranty) {
            if (!data.productDetails) data.productDetails = {};
            data.productDetails.warranty = warranty;
          }
          if (stock) {
            if (!data.productDetails) data.productDetails = {};
            data.productDetails.stock = stock;
          }
        }
      }
      if (category) {
        data.category = category;
      }
      if (features) {
        data.features = features;
      }
      if (benefits) {
        data.benefits = benefits;
      }
      if (views) {
        if (!data.performanceMetrics) data.performanceMetrics = {};
        data.performanceMetrics.views = views;
      }
      if (clicks) {
        if (!data.performanceMetrics) data.performanceMetrics = {};
        data.performanceMetrics.clicks = clicks;
      }

      if (Object.keys(data).length === 0) {
        throw new MissingDataError("Missing data to update the service!");
      }
      Object.assign(service, data);
      await service.save();
      return res.status(200).json({ message: "Service updated successfully!", service });
    } catch (err) {
      next(err);
    }
  },

  deleteService: async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      if (!validator.isMongoId(serviceId)) {
        throw new ValidationError("Invalid ID");
      }
      const service = await ServiceModel.findByIdAndDelete(serviceId);
      if (!service) {
        throw new NotFoundError("Service not exists!");
      }
      return res.status(200).json({ message: "Service deleted successfully!" });
    } catch (err) {
      next(err);
    }
  },
};

export default serviceController;
