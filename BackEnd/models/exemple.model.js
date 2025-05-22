import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nom est requis!"],
      cast: "Nom doit être une chaîne de caractères!",
    },
    type: {
      type: String,
      enum: ["Service", "Product"],
      required: [true, "Type est requis!"],
      cast: "Type doit être soit",
    },
    description: {
      type: String,
      default: "",
      cast: "description doit être une chaîne de caractères!",
    },
    category: {
      type: String,
      default: "",
      cast: "category doit être une chaîne de caractères!",
    },
    features: {
      type: [String],
      default: [],
      cast: "features doit être un tableau!",
    },
    benefits: {
      type: [String],
      default: [],
      cast: "benefits doit être un tableau!",
    },
    serviceDetails: {
      type: {
        targetAudience: {
          type: String,
          default: "",
          cast: "targetAudience doit être une chaîne de caractères!",
        },
        process: {
          type: [String],
          default: [],
          cast: "process doit être un tableau!",
        },
        duration: {
          type: String,
          default: "",
          cast: "duration doit être une chaîne de caractères!",
        },
      },
      required: [
        function () {
          return this.type === "Service";
        },
        "serviceDetails est requis!",
      ],
      cast: "serviceDetails est invalide!",
    },
    productDetails: {
      type: {
        specifications: {
          type: [String],
          default: [],
          cast: "specifications doit être un tableau!",
        },
        warranty: {
          type: String,
          default: "",
          cast: "warranty doit être une chaîne de caractères!",
        },
        stock: {
          type: Number,
          default: 0,
          cast: "stock doit être un nombre!",
        },
      },
      required: [
        function () {
          return this.type === "Product";
        },
        "productDetails est requis!",
      ],
      cast: "productDetails est invalide!",
    },
    performanceMetrics: {
      type: {
        views: {
          type: Number,
          default: 0,
          cast: "views doit être un nombre!",
        },
        clicks: {
          type: Number,
          default: 0,
          cast: "clicks doit être un nombre!",
        },
      },
      cast: "performanceMetrics est invalide!",
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "company est requis!"],
    },
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model("Service", serviceSchema);
export default ServiceModel;
