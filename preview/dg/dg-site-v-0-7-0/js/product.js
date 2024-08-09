
const products = [
    { title: "ITIL ® 4 Foundation", description: "ITIL 4 Foundation is the latest evolution of the most widely adopted guidance for ITSM. Its audience ranges from IT and business students taking their first steps in service management to seasoned professionals familiar with earlier versions of ITIL and other sources of industry best practice.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist -  Create Deliver Support", description: "ITIL® 4 Create, Deliver and Support addresses the cultural and team management aspects of product and service management; provides an overview of the tools and technologies which support service management; and demonstrates how to integrate management practices into end-to-end value streams.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – Direct Plan Improve", description: "The ITIL 4 Direct, Plan and Improve (DPI) qualification is intended to provide the candidate with the practical skills necessary to create a ‘learning and improving’ IT organization, with a strong and effective strategic direction.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – High Velocity IT", description: "This course is aimed at IT and service management practitioners who work in organizations that are becoming more digitally enabled. It will help those who are familiar with traditional", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist - Drive Stakeholder Value", description: "ITIL ® 4: Drive Stakeholder Value covers all types of engagement and interactions between a service provider and its customers, users, suppliers, and partners.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Strategic Leader – Digital and IT Strategy", description: "ITIL®4 Digital and IT Strategy focuses on the alignment of digital business strategy with IT strategy. It also covers how disruption from new technologies is impacting organizations in every industry and how business leaders are responding.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – Acquiring and Managing Cloud Services", description: "Technology has transformed the way we work, socialize, purchase goods, and interact with services, fueling new behaviours, demands and experiences. Using the ITIL framework, the module provides", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – Sustainability in Digital and IT", description: "Based on the ITIL 4 framework, the module focuses on the role that IT and digitally enabled services have in relation to the environment, whilst exploring opportunities to positively impact it by adopting and driving sustainable and ethical behaviour and a mindset that goes beyond individuals and impacts businesses at an organizational level.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – IT Asset Management", description: "Technology has transformed the way we work, socialize, purchase goods, and interact with services, fueling new behaviours, demands and experiences. Consumers and users now expect more, which puts pressure on providers to deliver higher quality IT-enabled products and services at a quicker pace.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Specialist – BRM", description: "Business relationship management (BRM) is often named as one of the most needed ITSM practices, but rarely among the most developed.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL® 4 Monitor Support Fulfil", description: "This module compiles for the candidates the understanding of the key concepts, principles, value and challenges of ITIL 4’s five management practices, namely, the ITIL 4 Incident Management Practice, the ITIL 4 Service Desk Practice, the ITIL 4 Service Request Management Practice, the ITIL 4 Monitoring and Event Management Practice, and the ITIL 4 Problem Management Practice.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Incident Management", description: "This module focuses on providing the candidates with the understanding of the key concepts, principles, value and challenges of the Incident Management Practice.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Problem Management", description: "This module focuses on providing the candidates with the understanding of the key concepts, principles, value and challenges of the Problem Management Practices.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Service Request Management", description: "This module focuses on providing the candidates with the understanding of the key concepts, principles, value and challenges of the ITIL 4 Service Request Management Practice.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Monitoring & Event Management", description: "This module focuses on providing the candidates with the understanding of the key concepts, principles, value and challenges of the Monitoring and Event Management Practice.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Service Desk", description: "This module focuses on providing the candidates with the understanding of the key concepts, principles, value and challenges of the Service Desk Practice", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 Specialist: PIC", description: "The ITIL 4 Specialist Plan Implement Control Practices Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Release Management", description: "The ITIL 4 Release Management Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Deployment Management", description: "The ITIL 4 Deployment Management Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Change Enablement", description: "The ITIL 4 Change Enablement Practice Module is structured and aligned around the ITIL framework", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : ITAM", description: "The ITIL 4 ITAM Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Service Configuration", description: "The ITIL 4 Service Configuration Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 Specialist: CAI", description: "The ITIL 4 Specialist Collaborate, Assure and Improve Practices Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM: Relationship Management", description: "The ITIL 4 Relationship Management Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM: Supplier Management", description: "The ITIL 4 Supplier Management Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Service Level Management", description: "The ITIL 4 Service Level Management Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Continual Improvement", description: "The ITIL 4 Continual Improvement Practice Module is structured and aligned around the ITIL framework", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },
    { title: "ITIL ® 4 PM : Information Security", description: "The ITIL 4 Information Security Practice Module is structured and aligned around the ITIL framework.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ITIL_ATO logo.png" },

    { title: "Agile Scrum Workshop", description: "Agile software development is a group of software development methods in which requirements and solutions evolve through collaboration between self-organizing, cross-functional teams.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png" },
    { title: "Peoplecert SCRUM Master 1", description: "The purpose of this qualification level is to confirm that a candidate has sufficient knowledge, understanding and application of the Scrum framework and will be able to work effectively with, or as a member of, a Scrum Team.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Scrum Logo.jpg" },
    { title: "Peoplecert SCRUM Master 2", description: "The purpose of this qualification level is to confirm that a candidate has sufficient knowledge, understanding and application of the Scrum framework and be able to work effectively with, or as a leading member of, a Scrum Team, analyzing and applying these skills and knowledge.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Scrum Logo.jpg" },
    { title: "Peoplecert SCRUM PRODUCT OWNER I", description: "Candidates will understand the Scrum framework and the role of the Product Owner, learn about Value-Driven Product Management and how to successfully build and refine the Product Backlog, and enable yourself and your organisation to deliver products of the highest value", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Scrum Logo.jpg" },
    { title: "Peoplecert SCRUM PRODUCT OWNER II", description: "Candidates will understand the Scrum framework and the role of the Product Owner, learn about Value-Driven Product Management and how to successfully build and refine the Product Backlog, and enable yourself and your organisa...", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Scrum Logo.jpg" },
    { title: "Peoplecert SCRUM Developer", description: "Candidates will understand the Scrum framework and the role of the Scrum Developer within a Scrum team, learn about Agile Software Architecture and Design, Refactoring, Test Driven Development (TDD) and Continuous Integration", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Scrum Logo.jpg" },
    { title: "Prince2 ® Agile Foundation", description: "The PRINCE2 Agile Foundation certificate is designed to help professionals deliver agile projects by tailoring PRINCE2 management controls with a broad toolset of agile delivery techniques and frameworks.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png" },
    { title: "Prince2 ® Agile Practitioner", description: "PRINCE2 Agile® has been developed as a single-tier Practitioner certification. The purpose of the Practitioner certification is to demonstrate that you can apply and tailor PRINCE2 Agile in a scenario situation. A successful Practitioner candidate should be able to start applying the method to a real project but may not be sufficiently skilled to do this appropriately for all situations.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2Agile_ATO logo.png" },



    { title: "Prince2 ® Foundation", description: "The PRINCE2® sixth edition Foundation course (based on PRINCE2 2017 update) provides an optimal mix of classroom lectures, interactive case studies, assignments, additional reading materials, and exam preparation material.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png" },
    { title: "Prince2 ® Practitioner", description: "The PRINCE2® Practitioner Sixth Edition course (based on PRINCE2 2017 update) builds on the knowledge that participants have gained in the PRINCE2 Foundation course and focuses on applying and tailoring PRINCE2", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png" },
    { title: "Prince2 ® 7 Foundation", description: "PRINCE2 is a project management method that offers a structured, scalable, and tailorable approach to project management. Its focus on governance, risk management, and benefits realization sets it apart from other qualifications.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png" },
    { title: "Prince2 ® 7 Practitioner", description: "PRINCE2 is a project management method that offers a structured, scalable, and tailorable approach to project management. Its focus on governance, risk management, and benefits realization sets it apart from other qualifications.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/PRINCE2_ATO logo.png" },
    { title: "MSP ® 5 Foundation", description: "MSP (Managing Successful Programmes), 5th edition is designed to align programmes and projects to organizational strategy and enable enterprise agility. MSP focuses on the delivery of outcomes of benefit, while mitigating risk and actively engaging stakeholders.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png" },
    { title: "MSP ® 5 Practitioner ", description: "MSP (Managing Successful Programmes), 5th edition is designed to align programmes and projects to organizational strategy and enable enterprise agility. MSP focuses on the delivery of outcomes of benefit, while mitigating risk and actively engaging stakeholders.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/MSP_ATO_Logo.png" },

    { title: "Six Sigma Green Belt", description: "The Six Sigma Green Belts training starts you on the journey towards Quality leadership Training provides an understanding of various Six Sigma models – DMAIC, DMADV &amp; DFSS that participants can right away implement the techniques at their work place to achieve productivity and better problem solving.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/six-sigma-green-belt.jpg" },
    { title: "Six Sigma Black Belt", description: "The Six Sigma Black Belt training completes the journey towards Quality leadership. Training provides the complete understanding of various Six Sigma models – DMAIC, DMADV &amp; DFSS that participants can right away implement the techniques at their work place to achieve productivity and better problem solving.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/six-sigma-black-belt.jpg" },

    { title: "SDI – Service Desk Analyst", description: "The Service Desk Institute (SDI) ® is the leading professional organization for everyone working in the IT service and support industry. As the driving force for the ITSM and service desk industry", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/SDI_ANALYST ATO.png" },
    { title: "SDI – Service Desk Manager", description: "SDI© Service Desk Manager is designed for existing and aspiring service desk managers and supervisors who intend to enhance their managerial and team management skills", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/SDI_MANAGER ATO.png" },

    { title: "SIAM™ Foundation (SIAMF)", description: "EXIN BCS SIAM™ Foundation tests a candidate’s knowledge and understanding of the terminology and the core principles of SIAM.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/SIAM™ Foundation (SIAMF).jpg" },
    { title: "SIAM™ Professional (SIAMP)", description: "EXIN BCS SIAM™ Professional tests a candidate’s knowledge of the application of SIAM™ to situations and the candidate’s ability to further analyze the SIAM concepts", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/SIAM™ Professional (SIAMP).jpg" },

    { title: "ISO9001 Lead Auditor Training Course", description: "ISO 9001 is the international standard that specifies requirements for a Quality Management System (QMS). Organizations use the standard to demonstrate the ability to consistently provide products and services that meet customer and regulatory requirements.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ISO9001 Lead Auditor Training Course.png" },
    { title: "ISO 14001 Lead Auditor Training Course", description: "This comprehensive course provides hands on training to ensure that auditor thoroughly understands the role and acquires the expertise needed or required to perform the audit effectively.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ISO 14001 Lead Auditor Training Course.jpg" },
    { title: "ISO27001 Foundations Training Course", description: "This is a self-paced course that makes you aware of the information security principles and introduces an approach to managing information security within an organization by implementing an information security management system (ISMS) based on the ISO 27001: 2013 standard.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ISO27001 Lead Auditor Training Course.jpg" },
    { title: "ISO27001 Lead Auditor Training Course", description: "ISO/IEC 27001 specifies a management system that is intended to bring information security under management control and gives specific requirements. Organizations that meet the requirements may be certified by an accredited certification body following successful completion of an audit.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ISO27001 Lead Auditor Training Course.jpg" },
    { title: "ISO 45001 Lead Auditor Training Course", description: "This occupational health and safety course outlines the necessary skills needed to lead an ISO 45001 audit team and conduct first, second and third-party audits against the standard requirements and in accordance with ISO 19011:2018 and ISO/IEC 17021-1:2015, as applicable.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/ISO 45001 Lead Auditor Training Course.jpg" },
    { title: "EU GDPR Awareness", description: "GDPR is the General Data Protection Regulation, also referred to as Regulation (EU) 2016/679. It has been created by the European Parliament and Council to strengthen and unify data privacy for EU individuals as well as to regulate the international transfer of their data.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/EU GDPR Awareness .png" },
    { title: "DOI – Devops Foundation", description: "DevOps is a software development methodology that combines software development (Dev) with information technology operations (Ops)", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - DevOps Leader (DOL)®", description: "DevOps is a software development methodology that combines software development (Dev) with information technology operations (Ops).", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - Site Reliability Engineering (SRE) Foundation", description: "Today’s organizations deal with a higher volume of change in a more complex tech environment leading to a higher risk of outage   s and incidents.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - Site Reliability Engineering (SRE) Practitioner℠", description: "Today’s organizations deal with a higher volume of change in a more complex tech environment leading to a higher risk of outages and incidents", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - DevSecOps Foundation℠", description: "With the rising number of data breaches and increased emphasis on data privacy regulations, organizations must prioritize security and compliance measures in everyday workflows.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - DevSecOps Practitioner℠	", description: "DevSecOps Practitioner introduces a range of practices for advancing to a more comprehensive understanding of DevSecOps practices.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - AIOps Foundation℠", description: "AIOps Foundation aims to cover the origins of AIOps, including the history behind the term, patterns that preceded it, and the technology context in which it has evolved. Candidates will gain an understanding of the processes of combining big data analytics, machine learning algorithms, automation, and optimization into a single platform.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - Continuous Testing Foundation (CTF)℠", description: "Continuous Testing enables faster, higher quality releases and reduced costs by seamlessly integrating into the Continuous Delivery process to identify and address risks at all stages of the development pipeline thereby minimizing business risk and impact on customers.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - DevOps Engineering Foundation℠", description: "DevOps is a software development methodology that combines software development (Dev) with information technology operations (Ops).", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg" },
    { title: "DOI - Observability Foundation℠", description: "Observability Foundation introduces a range of best practices for building full-stack observability towards advancing resilience in a distributed ecosystem.", imgSrc: "../assets/assets_dg-site/logo/new logo for cources/Devops Insitute - DOI.jpg", },

];


const cardsPerPage = 6;
let currentPage = 1;

function renderProducts(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    currentProducts.forEach(product => {
        const productCard = `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100" style="display: flex; flex-direction: column; ">
            <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;">
                    <img class="p-3" style="max-width: 100%; max-height: 100%; object-fit: contain;" src="${product.imgSrc}" alt="">
                </div>
          <div class="card-body" style="flex-grow: 1">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer" style="margin-top: auto; display: flex; justify-content: space-between;">
            <a href="./shiv-pages/page-dg-site-offering-product.html" type="button" class="btn btn-light">Know More</button></a>
          </div>
        </div>
      </div>`;
        productContainer.innerHTML += productCard;
    });

}

function renderPagination() {
    const totalPages = Math.ceil(products.length / cardsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    if (currentPage === 1) {
        prevPageItem.classList.add('disabled');
    }
    prevPageItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevPageItem);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderProducts(currentPage);
            renderPagination();
        });
        paginationContainer.appendChild(pageItem);
    }

    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextPageItem.classList.add('disabled');
    }
    nextPageItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextPageItem);
}

renderProducts(currentPage);
renderPagination();
