const fs = require("fs");
const path = require("path");

const TARGET_DIRECTORY = "./"; // Change this to your actual website folder path

// Identify the footer section using <footer> tags
const FOOTER_START_IDENTIFIER = '<footer';
const FOOTER_END_IDENTIFIER = '</footer>';

// New footer content
const NEW_FOOTER = `
      <footer
        class="text-center text-lg-start text-dark"
        style="background-color: #eceff1"
      >
        <!-- <div class="container text-center p-4">
          <h4 class="fw-bold mb-4">Get the latest Ducisgroup Updates</h4>
          <div class="row mw-75 m-auto">
            <div class="col-12 col-md-6 mb-2 mb-md-0">
              <input
                type="email"
                class="form-control p-3"
                placeholder="Enter your email"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="col-12 col-md-6">
              <button
                class="btn btn-secondary btn-md rounded-pill shadow w-100 fw-400 p-3"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div> -->
        <!-- <hr class="mb-4 mx-4 bg-light" /> -->

        <!-- Section: Links  -->
        <section>
          <div class="container text-center text-md-start mt-5">
            <!-- Grid row -->
            <div class="row mt-3">
              <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold">Ducis Management Consulting Private Limited</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px; background-color: #7c4dff; height: 2px" />
                <p><i class="fas fa-home mr-3"></i> Innov8 Coworking, Pride Plaza Hotel H43F+65, Aerocity, New Delhi, Delhi 110037</p>
                <p><i class="fas fa-envelope mr-3"></i> info@ducisgroup.com</p>
                <p><i class="fas fa-phone mr-3"></i> +91-9818023130</p>
                <p><i class="fas fa-building mr-3"></i> COMPANY REGISTRATION NO U93090DL2018PTC382922</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold">DUCIS TECHNOLOGY CONSULTING FZCO</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px; background-color: #7c4dff; height: 2px" />
                <p><i class="fas fa-home mr-3"></i> Duqe Square Business Center, <br> Quarter Deck, Mina Rashid, QE2, Dubai</p>
                <p><i class="fas fa-envelope mr-3"></i> Sunil@ducisgroup.ae</p>
                <p><i class="fas fa-phone mr-3"></i> +971 55 867 6586</p>
              </div>
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold">Quick Links</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px; background-color: #7c4dff; height: 2px" />
                <p><a href="./offering.html" class="text-dark no-underline">Our Offering</a></p>
                <p><a href="./offering.html#t&c" class="text-dark no-underline">Get Certified</a></p>
                <p><a href="./online-bootcamp-all-schedule-cources.html" class="text-dark no-underline">Open Batches</a></p>
                <p><a href="./offering.html#shop" class="text-dark no-underline">Shop</a></p>
                <p><a href="../html/shiv-pages/page-dg-site-Partner-us.html" class="text-dark no-underline">Partner us</a></p>
                <p><a href="../html/shiv-pages/page-dg-site-faq-dev-shiv.html" class="text-dark no-underline">FAQ</a></p>
              </div>
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold">Policies</h6>
                <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px; background-color: #7c4dff; height: 2px" />
                <p><a href="./shiv-pages/page-dg-site-cookie-policy-dev-shiv.html" class="text-dark">Cookie Policy</a></p>
                <p><a href="./shiv-pages/page-dg-site-refund-policy-dev-shiv.html" class="text-dark">Refund Policy</a></p>
                <p><a href="./shiv-pages/page-dg-site-privacy-policy-dev-shiv.html" class="text-dark">Privacy Policy</a></p>
                <p><a href="./shiv-pages/page-dg-site-terms-and-conditions-policy-dev-shiv.html" class="text-dark">Terms &amp; Conditions</a></p>
              </div>
            </div>
            <!-- Grid row -->
          </div>
        </section>

        <div class="row align-items-center mx-2 mt-5">
          <div
            class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0"
          >
            <a href="https://ducisgroup.com/"
              ><img
                style="width: 100px"
                src="../assets/assets_dg-site/logo/dg logo/ducis group logo v 0-0-2 trans dark.webp"
                alt="Company Logo"
                class="me-3"
            /></a>
            <b class="mx-3">|</b>
            <div>
              <h5 class="mb-0 fw-bold">Staying relevant in a VUCA world</h5>
            </div>
          </div>
          <div
            class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end my-4"
          >
            <a
              href="https://www.facebook.com/profile.php?id=100083062876354"
              class="text-dark me-3"
              ><i class="fab fa-facebook fa-2x"></i
            ></a>
            <a
              href="https://www.instagram.com/ducisgroup/?hl=en"
              class="text-dark me-3"
              ><i class="fab fa-instagram fa-2x"></i
            ></a>
            <a
              href="https://www.linkedin.com/company/ducisgroup/?originalSubdomain=in"
              class="text-dark me-3"
              ><i class="fab fa-linkedin fa-2x"></i
            ></a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="text-center p-3">
          ©2024 Ducisgroup:
          <a class="text-dark text-decoration-none text-xs" href=""
            >All Rights Reserved</a
          >
        </div>
        <!-- Copyright -->

        <!-- Section: Text -->
        <section class="mb-5">
          <div class="row d-flex justify-content-center mw-100 px-3 m-auto">
            <div>
              <p style="font-size: 14px">
                <b>Disclaimer:</b> ITIL® is a registered trademark of PeopleCert
                Group, used under permission of PeopleCert Group. All rights
                reserved. The Swirl logo™ is a trademark of PeopleCert Group,
                used under permission of PeopleCert Group. All rights reserved.
                PRINCE2® / MSP® 5 / MoP® / MoV ®/ P3O ®/ MoR ®, are a registered
                trademark of PeopleCert Group, used under permission of
                PeopleCert Group. All rights reserved. COBIT® is a trademark of
                ISACA® registered in the United States and other countries.
              </p>
            </div>
          </div>
        </section>
        <!-- Section: Text -->
      </footer>
`;

// Function to replace the footer in a single HTML file
const replaceFooterInFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8");

  // Check if the new footer is already present to avoid redundant updates
  if (content.includes(NEW_FOOTER.trim())) {
    console.log(`✅ Footer already updated in: ${filePath}`);
    return;
  }

  // Find the <footer> start and end positions
  const startIndex = content.indexOf(FOOTER_START_IDENTIFIER);
  const endIndex = content.indexOf(FOOTER_END_IDENTIFIER, startIndex) + FOOTER_END_IDENTIFIER.length;

  if (startIndex !== -1 && endIndex !== -1) {
    const oldFooter = content.substring(startIndex, endIndex);
    content = content.replace(oldFooter, NEW_FOOTER.trim());

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Footer updated in: ${filePath}`);
  } else {
    console.log(`⚠️ Footer not found in: ${filePath}`);
  }
};

// Function to process only HTML files in the target directory (ignores subdirectories)
const processDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith(".html")) {
      replaceFooterInFile(fullPath);
    }
  });
};

// Run the script
console.log("🔍 Scanning for HTML files in the target directory...");
processDirectory(TARGET_DIRECTORY);
console.log("✅ All relevant pages updated successfully!");
