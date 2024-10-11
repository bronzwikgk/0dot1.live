import { ProductCard } from '../components/ProductCard/ProductCard.js';
import { Pagination } from '../Utils/Pagination.js';
import { Search } from '../Utils/Search.js';
import { ProductService } from '../services/ProductService.js';
import { CartService } from '../services/CartService.js';

// Define page size globally or pass it as a parameter
let products = [
    {
        "name": "ITIL®4 Create, Deliver and Support",
        "description": "ITIL® 4 Create, Deliver and Support addresses the...",
        "truncatedDescription": "ITIL® 4 Create, Deliver and Support addresses the...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL®4CreateDeliverandSupport.html?productId=66eb5723c40e0b0b76fe0a3e",
        
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-016"
    },
    {
        "name": "SDI – Service Desk Analyst",
        "description": "The Service Desk Institute (SDI) ® is the leading...",
        "truncatedDescription": "The Service Desk Institute (SDI) ® is the leading...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png",
        "productUrl": "./productPage-SDI–ServiceDeskAnalyst.html?productId=66eb5723c40e0b0b76fe0a48",
        
        "category": "SDI – Service Desk Manager",
        "product_id": "dg-training-043"
    },
    {
        "name": "Agile Scrum Workshop",
        "description": "An in-depth workshop on Agile and Scrum methodolog...",
        "truncatedDescription": "An in-depth workshop on Agile and Scrum methodolog...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png",
        "productUrl": "./productPage-AgileScrumWorkshop.html?productId=66eb5723c40e0b0b76fe0a39",
        
        "category": "Scrum and Agile",
        "product_id": "dg-training-001"
    },
    {
        "name": "MSP ® 5 Foundation",
        "description": "MSP (Managing Successful Programmes), 5th edition...",
        "truncatedDescription": "MSP (Managing Successful Programmes), 5th edition...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png",
        "productUrl": "./productPage-MSP®5Foundation.html?productId=66eb5723c40e0b0b76fe0a44",
        
        "category": "Project Management",
        "product_id": "dg-training-011"
    },
    {
        "name": "Peoplecert SCRUM Master 1",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/Scrum fullLogo.png",
        "productUrl": "./productPage-PeoplecertSCRUMMaster1.html?productId=66eb5723c40e0b0b76fe0a3f",
        
        "category": "Scrum and Agile",
        "product_id": "dg-training-002"
    },
    {
        "name": "Peoplecert SCRUM Master 2",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/Scrum fullLogo.png",
        "productUrl": "./productPage-PeoplecertSCRUMMaster2.html?productId=66eb5723c40e0b0b76fe0a40",
        "_id": "66eb5723c40e0b0b76fe0a40",
        "category": "Scrum and Agile",
        "product_id": "dg-training-003"
    },
    {
        "name": "Peoplecert SCRUM PRODUCT OWNER I",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/Scrum fullLogo.png",
        "productUrl": "./productPage-SCRUMProductOwner1.html?productId=66eb5723c40e0b0b76fe0a41",
        "_id": "66eb5723c40e0b0b76fe0a41",
        "category": "Scrum and Agile",
        "product_id": "dg-training-004"
    },
    {
        "name": "Peoplecert SCRUM PRODUCT OWNER II",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/Scrum fullLogo.png",
        "productUrl": "./productPage-SCRUMProductOwner2.html?productId=66eb5723c40e0b0b76fe0a42",
        "_id": "66eb5723c40e0b0b76fe0a42",
        "category": "Scrum and Agile",
        "product_id": "dg-training-005"
    },
    {
        "name": "Peoplecert SCRUM Developer",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/Scrum fullLogo.png",
        "productUrl": "./productPage-SCRUMDeveloper.html?productId=66eb5723c40e0b0b76fe0a43",
        "_id": "66eb5723c40e0b0b76fe0a43",
        "category": "Scrum and Agile",
        "product_id": "dg-training-006"
    },
    {
        "name": "Prince2 ® Agile Foundation",
        "description": "PRINCE2 is a project management method that offers a structured, scalable, and tailorable approach to project management...",
        "truncatedDescription": "PRINCE2 is a project management method...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png",
        "productUrl": "./productPage-PRINCE2AgileFoundation.html?productId=66eb5723c40e0b0b76fe0a44",
        "_id": "66eb5723c40e0b0b76fe0a44",
        "category": "Scrum and Agile",
        "product_id": "dg-training-007"
    },
    {
        "name": "Prince2 ® Agile Practitioner",
        "description": "PRINCE2 is a project management method that offers a structured, scalable, and tailorable approach to project management...",
        "truncatedDescription": "PRINCE2 is a project management method...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png",
        "productUrl": "./productPage-PRINCE2AgilePractitioner.html?productId=66eb5723c40e0b0b76fe0a45",
        "_id": "66eb5723c40e0b0b76fe0a45",
        "category": "Scrum and Agile",
        "product_id": "dg-training-008"
    },
    {
        "name": "Prince2 ® 7 Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png",
        "productUrl": "./productPage-PRINCE27Foundation.html?productId=66eb5723c40e0b0b76fe0a46",
        "_id": "66eb5723c40e0b0b76fe0a46",
        "category": "Project Management",
        "product_id": "dg-training-009"
    },
    {
        "name": "Prince2 ® 7 Practitioner",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png",
        "productUrl": "./productPage-PRINCE27Practitioner.html?productId=66eb5723c40e0b0b76fe0a47",
        "_id": "66eb5723c40e0b0b76fe0a47",
        "category": "Project Management",
        "product_id": "dg-training-010"
    },
    {
        "name": "MSP ® 5 Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png",
        "productUrl": "./productPage-MSP5Foundation.html?productId=66eb5723c40e0b0b76fe0a48",
        "_id": "66eb5723c40e0b0b76fe0a48",
        "category": "Project Management",
        "product_id": "dg-training-011"
    },
    {
        "name": "MSP ® 5 Practitioner",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png",
        "productUrl": "./productPage-MSP5Practitioner.html?productId=66eb5723c40e0b0b76fe0a49",
        "_id": "66eb5723c40e0b0b76fe0a49",
        "category": "Project Management",
        "product_id": "dg-training-012"
    },
  
    {
        "name": "ITIL ® 4 Foundation",
        "description": "Technology has transformed the way we work, socialize, purchase goods, and interact with services...",
        "truncatedDescription": "Technology has transformed the way we work...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4Foundation.html?productId=66eb5723c40e0b0b76fe0a52",
        "_id": "66eb5723c40e0b0b76fe0a52",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-015"
    },
    {
        "name": "ITIL® 4 Specialist – Direct Plan Improve",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4DirectPlanImprove.html?productId=66eb5723c40e0b0b76fe0a54",
        "_id": "66eb5723c40e0b0b76fe0a54",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-017"
    },
    {
        "name": "ITIL® 4 Specialist – High Velocity IT",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4HighVelocityIT.html?productId=66eb5723c40e0b0b76fe0a55",
        "_id": "66eb5723c40e0b0b76fe0a55",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-018"
    },
    {
        "name": "ITIL® 4 Specialist - Drive Stakeholder Value",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4DriveStakeholderValue.html?productId=66eb5723c40e0b0b76fe0a56",
        "_id": "66eb5723c40e0b0b76fe0a56",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-019"
    },
    {
        "name": "ITIL® 4 Strategic Leader – Digital and IT Strategy",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4DigitalITStrategy.html?productId=66eb5723c40e0b0b76fe0a57",
        "_id": "66eb5723c40e0b0b76fe0a57",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-020"
    },
    {
        "name": "ITIL® 4 Specialist – Acquiring and Managing Cloud Services",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4CloudServices.html?productId=66eb5723c40e0b0b76fe0a58",
        "_id": "66eb5723c40e0b0b76fe0a58",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-021"
    },
    {
        "name": "ITIL® 4 Specialist – Sustainability in Digital and IT",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4SustainabilityDigitalIT.html?productId=66eb5723c40e0b0b76fe0a59",
        "_id": "66eb5723c40e0b0b76fe0a59",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-022"
    },
    {
        "name": "ITIL® 4 Specialist – IT Asset Management",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ITAssetManagement.html?productId=66eb5723c40e0b0b76fe0a60",
        "_id": "66eb5723c40e0b0b76fe0a60",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-023"
    },
    {
        "name": "ITIL® 4 Specialist – BRM",
        "description": "Business relationship management (BRM) is often named as one of the most needed ITSM practices...",
        "truncatedDescription": "Business relationship management (BRM)...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4BRM.html?productId=66eb5723c40e0b0b76fe0a61",
        "_id": "66eb5723c40e0b0b76fe0a61",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-024"
    },
    {
        "name": "ITIL® 4 Monitor Support Fulfil",
        "description": "This module compiles the understanding of the key concepts, principles, value and challenges of ITIL 4’s five management practices...",
        "truncatedDescription": "This module compiles the understanding of...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4MonitorSupportFulfil.html?productId=66eb5723c40e0b0b76fe0a62",
        "_id": "66eb5723c40e0b0b76fe0a62",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-025"
    },
    {
        "name": "ITIL ® 4 PM : Incident Management",
        "description": "This module focuses on providing the understanding of the key concepts, principles, value and challenges of the Incident Management Practice...",
        "truncatedDescription": "This module focuses on providing the understanding...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4IncidentManagement.html?productId=66eb5723c40e0b0b76fe0a63",
        "_id": "66eb5723c40e0b0b76fe0a63",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-026"
    },
    {
        "name": "ITIL ® 4 PM : Problem Management",
        "description": "This module focuses on providing the understanding of the key concepts, principles, value and challenges of the Problem Management Practices...",
        "truncatedDescription": "This module focuses on providing the understanding...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ProblemManagement.html?productId=66eb5723c40e0b0b76fe0a64",
        "_id": "66eb5723c40e0b0b76fe0a64",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-027"
    },
    {
        "name": "ITIL ® 4 PM : Service Request Management",
        "description": "This module focuses on providing the understanding of the key concepts, principles, value and challenges of the ITIL 4 Service Request Management Practice...",
        "truncatedDescription": "This module focuses on providing the understanding...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ServiceRequestManagement.html?productId=66eb5723c40e0b0b76fe0a65",
        "_id": "66eb5723c40e0b0b76fe0a65",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-028"
    },
    {
        "name": "ITIL ® 4 PM : Monitoring & Event Management",
        "description": "This module focuses on providing the understanding of the key concepts, principles, value and challenges of the Monitoring and Event Management Practice...",
        "truncatedDescription": "This module focuses on providing the understanding...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4MonitoringEventManagement.html?productId=66eb5723c40e0b0b76fe0a66",
        "_id": "66eb5723c40e0b0b76fe0a66",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-029"
    },
    {
        "name": "ITIL ® 4 PM : Service Desk",
        "description": "This module focuses on providing the understanding of the key concepts, principles, value and challenges of the Service Desk Practice...",
        "truncatedDescription": "This module focuses on providing the understanding...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ServiceDesk.html?productId=66eb5723c40e0b0b76fe0a67",
        "_id": "66eb5723c40e0b0b76fe0a67",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-030"
    },
    {
        "name": "ITIL ® 4 Specialist: PIC",
        "description": "The ITIL 4 Specialist Plan Implement Control Practices Module is structured and aligned around the ITIL framework...",
        "truncatedDescription": "The ITIL 4 Specialist Plan Implement Control Practices...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4PIC.html?productId=66eb5723c40e0b0b76fe0a68",
        "_id": "66eb5723c40e0b0b76fe0a68",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-031"
    },
    {
        "name": "ITIL ® 4 PM : Release Management",
        "description": "The ITIL 4 Release Management Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Release Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ReleaseManagement.html?productId=66eb5723c40e0b0b76fe0a69",
        "_id": "66eb5723c40e0b0b76fe0a69",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-032"
    },
    {
        "name": "ITIL ® 4 PM : Deployment Management",
        "description": "The ITIL 4 Deployment Management Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Deployment Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4DeploymentManagement.html?productId=66eb5723c40e0b0b76fe0a70",
        "_id": "66eb5723c40e0b0b76fe0a70",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-033"
    },
    {
        "name": "ITIL ® 4 PM : Change Enablement",
        "description": "The ITIL 4 Change Enablement Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Change Enablement Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ChangeEnablement.html?productId=66eb5723c40e0b0b76fe0a71",
        "_id": "66eb5723c40e0b0b76fe0a71",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-034"
    },
    {
        "name": "ITIL ® 4 PM : ITAM",
        "description": "The ITIL 4 IT Asset Management (ITAM) Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 IT Asset Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ITAM.html?productId=66eb5723c40e0b0b76fe0a72",
        "_id": "66eb5723c40e0b0b76fe0a72",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-035"
    },
    {
        "name": "ITIL ® 4 PM : Service Configuration",
        "description": "The ITIL 4 Service Configuration Management Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Service Configuration Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ServiceConfiguration.html?productId=66eb5723c40e0b0b76fe0a73",
        "_id": "66eb5723c40e0b0b76fe0a73",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-036"
    },
    {
        "name": "ITIL ® 4 Specialist: CAI",
        "description": "The ITIL 4 Specialist Collaborate, Assure and Improve Practices Module is structured and aligned around the ITIL framework...",
        "truncatedDescription": "The ITIL 4 Specialist Collaborate, Assure and Improve...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4CAI.html?productId=66eb5723c40e0b0b76fe0a74",
        "_id": "66eb5723c40e0b0b76fe0a74",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-037"
    },
    {
        "name": "ITIL ® 4 PM: Relationship Management",
        "description": "The ITIL 4 Relationship Management Practice Module is structured and aligned around the ITIL framework...",
        "truncatedDescription": "The ITIL 4 Relationship Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4RelationshipManagement.html?productId=66eb5723c40e0b0b76fe0a75",
        "_id": "66eb5723c40e0b0b76fe0a75",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-038"
    },
    {
        "name": "ITIL ® 4 PM: Supplier Management",
        "description": "The ITIL 4 Supplier Management Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Supplier Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4SupplierManagement.html?productId=66eb5723c40e0b0b76fe0a76",
        "_id": "66eb5723c40e0b0b76fe0a76",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-039"
    },
    {
        "name": "ITIL ® 4 PM : Service Level Management",
        "description": "The ITIL 4 Service Level Management Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Service Level Management Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ServiceLevelManagement.html?productId=66eb5723c40e0b0b76fe0a77",
        "_id": "66eb5723c40e0b0b76fe0a77",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-040"
    },
    {
        "name": "ITIL ® 4 PM : Continual Improvement",
        "description": "The ITIL 4 Continual Improvement Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Continual Improvement Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4ContinualImprovement.html?productId=66eb5723c40e0b0b76fe0a78",
        "_id": "66eb5723c40e0b0b76fe0a78",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-041"
    },
    {
        "name": "ITIL ® 4 PM : Information Security",
        "description": "The ITIL 4 Information Security Practice Module includes process, roles, value streams and capability assessment...",
        "truncatedDescription": "The ITIL 4 Information Security Practice...",
        "image": "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png",
        "productUrl": "./productPage-ITIL4InformationSecurity.html?productId=66eb5723c40e0b0b76fe0a79",
        "_id": "66eb5723c40e0b0b76fe0a79",
        "category": "IT Service Management – ITIL ®",
        "product_id": "dg-training-042"
    },
    {
        "name": "SDI – Service Desk Analyst",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/SDI_ANALYST ATO.png",
        "productUrl": "./productPage-SDIServiceDeskAnalyst.html?productId=66eb5723c40e0b0b76fe0a80",
        "_id": "66eb5723c40e0b0b76fe0a80",
        "category": "SDI – Service Desk Manager",
        "product_id": "dg-training-043"
    },
    {
        "name": "SDI – Service Desk Manager",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/SDI_MANAGER ATO.png",
        "productUrl": "./productPage-SDIServiceDeskManager.html?productId=66eb5723c40e0b0b76fe0a81",
        "_id": "66eb5723c40e0b0b76fe0a81",
        "category": "SDI – Service Desk Manager",
        "product_id": "dg-training-044"
    },
    {
        "name": "SIAM™ Foundation (SIAMF)",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/SIAM™ Foundation (SIAMF).jpg",
        "productUrl": "./productPage-SIAMFoundation.html?productId=66eb5723c40e0b0b76fe0a82",
        "_id": "66eb5723c40e0b0b76fe0a82",
        "category": "SIAM",
        "product_id": "dg-training-045"
    },
    {
        "name": "SIAM™ Professional (SIAMP)",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/SIAM™ Professional (SIAMP).jpg",
        "productUrl": "./productPage-SIAMProfessional.html?productId=66eb5723c40e0b0b76fe0a83",
        "_id": "66eb5723c40e0b0b76fe0a83",
        "category": "SIAM",
        "product_id": "dg-training-046"
    },
    {
        "name": "ISO9001 Lead Auditor Training Course",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/No Image.png",
        "productUrl": "./productPage-ISO9001LeadAuditor.html?productId=66eb5723c40e0b0b76fe0a84",
        "_id": "66eb5723c40e0b0b76fe0a84",
        "category": "ISO Trainings",
        "product_id": "dg-training-047"
    },
    {
        "name": "ISO 14001 Lead Auditor Training Course",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/No Image.png",
        "productUrl": "./productPage-ISO14001LeadAuditor.html?productId=66eb5723c40e0b0b76fe0a85",
        "_id": "66eb5723c40e0b0b76fe0a85",
        "category": "ISO Trainings",
        "product_id": "dg-training-048"
    },
    {
        "name": "ISO27001 Foundations Training Course",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/No Image.png",
        "productUrl": "./productPage-ISO27001Foundations.html?productId=66eb5723c40e0b0b76fe0a86",
        "_id": "66eb5723c40e0b0b76fe0a86",
        "category": "ISO Trainings",
        "product_id": "dg-training-049"
    },
    {
        "name": "ISO27001 Lead Auditor Training Course",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/No Image.png",
        "productUrl": "./productPage-ISO27001LeadAuditor.html?productId=66eb5723c40e0b0b76fe0a87",
        "_id": "66eb5723c40e0b0b76fe0a87",
        "category": "ISO Trainings",
        "product_id": "dg-training-050"
    },
    {
        "name": "ISO 45001 Lead Auditor Training Course",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/No Image.png",
        "productUrl": "./productPage-ISO45001LeadAuditor.html?productId=66eb5723c40e0b0b76fe0a88",
        "_id": "66eb5723c40e0b0b76fe0a88",
        "category": "ISO Trainings",
        "product_id": "dg-training-051"
    },
    {
        "name": "EU GDPR Awareness",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/logo/new logo for cources/EU GDPR Awareness .png",
        "productUrl": "./productPage-EUGDPRAwareness.html?productId=66eb5723c40e0b0b76fe0a89",
        "_id": "66eb5723c40e0b0b76fe0a89",
        "category": "ISO Trainings",
        "product_id": "dg-training-052"
    },
    {
        "name": "DOI – Devops Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIDevopsFoundation.html?productId=66eb5723c40e0b0b76fe0a90",
        "_id": "66eb5723c40e0b0b76fe0a90",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-053"
    },
    {
        "name": "DOI - DevOps Leader (DOL)®",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIDevopsLeader.html?productId=66eb5723c40e0b0b76fe0a91",
        "_id": "66eb5723c40e0b0b76fe0a91",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-054"
    },
    {
        "name": "DOI - Site Reliability Engineering (SRE) Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOISREFoundation.html?productId=66eb5723c40e0b0b76fe0a92",
        "_id": "66eb5723c40e0b0b76fe0a92",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-055"
    },
    {
        "name": "DOI - Site Reliability Engineering (SRE) Practitioner℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOISREPractitioner.html?productId=66eb5723c40e0b0b76fe0a93",
        "_id": "66eb5723c40e0b0b76fe0a93",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-056"
    },
    {
        "name": "DOI - DevSecOps Foundation℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIDevSecOpsFoundation.html?productId=66eb5723c40e0b0b76fe0a94",
        "_id": "66eb5723c40e0b0b76fe0a94",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-057"
    },
    {
        "name": "DOI - DevSecOps Practitioner℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIDevSecOpsPractitioner.html?productId=66eb5723c40e0b0b76fe0a95",
        "_id": "66eb5723c40e0b0b76fe0a95",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-058"
    },
    {
        "name": "DOI - AIOps Foundation℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIAIOpsFoundation.html?productId=66eb5723c40e0b0b76fe0a96",
        "_id": "66eb5723c40e0b0b76fe0a96",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-059"
    },
    {
        "name": "DOI - Continuous Testing Foundation (CTF)℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIContinuousTestingFoundation.html?productId=66eb5723c40e0b0b76fe0a97",
        "_id": "66eb5723c40e0b0b76fe0a97",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-060"
    },
    {
        "name": "DOI - DevOps Engineering Foundation℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIDevOpsEngineeringFoundation.html?productId=66eb5723c40e0b0b76fe0a98",
        "_id": "66eb5723c40e0b0b76fe0a98",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-061"
    },
    {
        "name": "DOI - Observability Foundation℠",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/DOI-dev.png",
        "productUrl": "./productPage-DOIObservabilityFoundation.html?productId=66eb5723c40e0b0b76fe0a99",
        "_id": "66eb5723c40e0b0b76fe0a99",
        "category": "Devops Insitute - DOI",
        "product_id": "dg-training-062"
    },
    {
        "name": "P3O ® Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/P3O_AEO.png",
        "productUrl": "./productPage-P3OFoundation.html?productId=66eb5723c40e0b0b76fe0a100",
        "_id": "66eb5723c40e0b0b76fe0a100",
        "category": "Project Management",
        "product_id": "dg-training-063"
    },
    {
        "name": "P3O ® Practitioner",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/P3O_AEO.png",
        "productUrl": "./productPage-P3OPractitioner.html?productId=66eb5723c40e0b0b76fe0a101",
        "_id": "66eb5723c40e0b0b76fe0a101",
        "category": "Project Management",
        "product_id": "dg-training-064"
    },
    {
        "name": "MoP ® Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/Management-of-Portfolios_English.jpg",
        "productUrl": "./productPage-MoPFoundation.html?productId=66eb5723c40e0b0b76fe0a102",
        "_id": "66eb5723c40e0b0b76fe0a102",
        "category": "Project Management",
        "product_id": "dg-training-065"
    },
    {
        "name": "MoP ® Practitioner",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/Management-of-Portfolios_English.jpg",
        "productUrl": "./productPage-MoPPractitioner.html?productId=66eb5723c40e0b0b76fe0a103",
        "_id": "66eb5723c40e0b0b76fe0a103",
        "category": "Project Management",
        "product_id": "dg-training-066"
    },
    {
        "name": "MoV ® Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/Management-of-Value_English.jpg",
        "productUrl": "./productPage-MoVFoundation.html?productId=66eb5723c40e0b0b76fe0a104",
        "_id": "66eb5723c40e0b0b76fe0a104",
        "category": "Project Management",
        "product_id": "dg-training-067"
    },
    {
        "name": "MoV ® Practitioner",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/Management-of-Value_English.jpg",
        "productUrl": "./productPage-MoVPractitioner.html?productId=66eb5723c40e0b0b76fe0a105",
        "_id": "66eb5723c40e0b0b76fe0a105",
        "category": "Project Management",
        "product_id": "dg-training-068"
    },
    {
        "name": "Cobit 5 ® Foundation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/cobit-5.png",
        "productUrl": "./productPage-Cobit5Foundation.html?productId=66eb5723c40e0b0b76fe0a106",
        "_id": "66eb5723c40e0b0b76fe0a106",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-069"
    },
    {
        "name": "Cobit 5 ® Assessor",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/cobit-5.png",
        "productUrl": "./productPage-Cobit5Assessor.html?productId=66eb5723c40e0b0b76fe0a107",
        "_id": "66eb5723c40e0b0b76fe0a107",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-070"
    },
    {
        "name": "Cobit 5 ® Implementation",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/cobit-5.png",
        "productUrl": "./productPage-Cobit5Implementation.html?productId=66eb5723c40e0b0b76fe0a108",
        "_id": "66eb5723c40e0b0b76fe0a108",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-071"
    },
    {
        "name": "Six Sigma Yellow Belt - IASSC",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/six-sigma.png",
        "productUrl": "./productPage-SixSigmaYellowBelt.html?productId=66eb5723c40e0b0b76fe0a109",
        "_id": "66eb5723c40e0b0b76fe0a109",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-072"
    },
    {
        "name": "Six Sigma Green Belt - IASSC",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/six-sigma-green.png",
        "productUrl": "./productPage-SixSigmaGreenBeltIASSC.html?productId=66eb5723c40e0b0b76fe0a110",
        "_id": "66eb5723c40e0b0b76fe0a110",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-073"
    },
    {
        "name": "Six Sigma Black Belt - IASSC",
        "description": "",
        "truncatedDescription": "",
        "image": "../assets/assets_dg-site/product_img/six-sigma-black.png",
        "productUrl": "./productPage-SixSigmaBlackBeltIASSC.html?productId=66eb5723c40e0b0b76fe0a111",
        "_id": "66eb5723c40e0b0b76fe0a111",
        "category": "Six Sigma and Quality",
        "product_id": "dg-training-074"
    }
]
;

// Pagination Settings
const pageSize = 6; // Number of products to display per page
let currentPage = 1; // Current page
let totalPages = Math.ceil(products.length / pageSize); // Calculate total pages

function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    // Filter products based on the search query and selected categories
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    // Update pagination and render products
    totalPages = Math.ceil(filteredProducts.length / pageSize);
    currentPage = 1; // Reset to first page when filtering
    renderProducts(filteredProducts.slice(0, pageSize));
    renderPagination(totalPages, currentPage);
}

// Function to render products on the current page
function renderProducts(productsToRender) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = new ProductCard(product);
        productContainer.innerHTML += productCard.render();
    });

    // Event Delegation for Add to Cart
    productContainer.addEventListener('click', async (event) => {
        const addToCartButton = event.target.closest('.add-to-cart');
        if (addToCartButton) {
            const productId = addToCartButton.dataset.id;
            let cartId = localStorage.getItem("cartId");
            await CartService.addItemToCart(cartId, productId, 1);
            console.log(`Product ${productId} added to cart`);
        }
    });
}

// Render pagination controls
function renderPagination(totalPages, currentPage) {
    const pagination = new Pagination(totalPages, currentPage, (page) => {
        currentPage = page;
        const searchQuery = document.getElementById('searchBar').value;
        const selectedCategories = getSelectedCategories();
        fetchProducts(currentPage, searchQuery, selectedCategories); // Pass selected categories to fetchProducts
    });
    pagination.render();
}

// Fetch products based on the current page
function fetchProducts(page = 1, query = '', categories = []) {
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = categories.length === 0 || categories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    const totalFilteredProducts = filteredProducts.length; // Get the number of filtered products
    totalPages = Math.ceil(totalFilteredProducts / pageSize); // Update total pages based on filtered products

    // Check if the requested page is valid
    if (page > totalPages) {
        page = totalPages; // If the page is out of bounds, reset to the last page
    } else if (page < 1) {
        page = 1; // Reset to the first page if negative
    }

    const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize); // Paginate filtered results
    renderProducts(paginatedProducts);
    renderPagination(totalPages, page);
}

// Helper to get selected categories
const getSelectedCategories = () => {
    return Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
};

// Event listeners for category checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts); // Call filterProducts to update the display
});

// Initial fetch of products when the page loads
window.onload = () => {
    renderProducts(products.slice(0, pageSize)); // Render first page of products
    renderPagination(Math.ceil(products.length / pageSize), 1); // Calculate and render pagination
};

// Handle search
document.getElementById('searchBar').addEventListener('input', function () {
    fetchProducts(1, this.value); // Reset to first page on search
});

// Handle search icon click
document.getElementById('searchIcon').addEventListener('click', function () {
    fetchProducts(1, document.getElementById('searchBar').value); // Reset to first page on icon click
});

// Initialize search component
const search = new Search(fetchProducts);
search.render();