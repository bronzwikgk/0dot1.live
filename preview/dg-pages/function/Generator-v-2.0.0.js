import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Handlebars from 'handlebars';

export default class Generator {
    constructor(basePath) {
        this.basePath = basePath;
        this.componentsCache = {}; // Cache to store processed component outputs

        // Registering the "eq" helper for comparing values
        Handlebars.registerHelper('eq', function (arg1, arg2) {
            return arg1 === arg2;
        });

        // Register the "or" helper for logical OR operations
        Handlebars.registerHelper('or', function () {
            const args = Array.prototype.slice.call(arguments, 0, -1);
            return args.some(Boolean);
        });
    }
    generateFromYaml(yamlFilePath, outputPath) {
        try {
            this.basePath = outputPath;
            console.log(`INFO: Generating from YAML: ${yamlFilePath}`);
            const yamlFile = fs.readFileSync(yamlFilePath, 'utf8');
            const data = yaml.load(yamlFile);
            const nodes = Array.isArray(data) ? data : [data];
            console.log(nodes)
            nodes.forEach(node => {
                if (this.validateNode(node)) {
                    this.processNode(node, this.basePath);
                } else {
                    console.error('ERROR: YAML structure validation failed.');
                }
            });
        } catch (error) {
            console.error(`ERROR: Reading or parsing YAML file: ${error.message}`);
        }
    }

    validateNode(node) {
        if (!['folder', 'file', 'page'].includes(node.type)) {
            console.error(`ERROR: Invalid node type: ${node.type}`);
            return false;
        }
        // Check for file node with either single data file for multiple products or multiple data files
        if (node.type === 'file' && (!node.outputFormat || !node.namePattern || !node.template || (!node.data && !node.dataFolder))) {
            console.error('ERROR: Missing required file node properties for multiple product pages');
            return false;
        }
        return true;
    }

    processNode(node, currentPath) {
        console.log(node)
        try {
            if (node.type === 'folder') {
                this.generateFolder(node, currentPath);
            } else if (node.type === 'file' && node.dataFolder) {
                this.generateFilesFromDataFolder(node, currentPath); // Multiple data files
            } else if (node.type === 'file' && node.data) {
                this.generateFilesFromSingleDataFile(node, currentPath); // Single data file for all products
            } else if (node.type === 'file') {
                this.generateFile(node, currentPath); // Single file generation
            } else if (node.type === 'page') {
                this.generatePageFromConfig(node); // Single file generation
            }

        } catch (error) {
            console.error(`ERROR: Processing node: ${error.message}`);
        }
    }

    generateFolder(node, currentPath) {
        try {
            const folderPath = path.join(currentPath, node.name);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log(`INFO: Folder created: ${folderPath}`);
            }
            if (Array.isArray(node.children)) {
                node.children.forEach(child => this.processNode(child, folderPath));
            }
        } catch (error) {
            console.error(`ERROR: Generating folder: ${error.message}`);
        }
    }

    async generateFilesFromDataFolder(node, currentPath) {
        try {
            const dataFolder = node.dataFolder;
            const files = fs.readdirSync(dataFolder);
            const templateFile = fs.readFileSync(node.template, 'utf8');
            const handleBarTemplate = Handlebars.compile(templateFile);

            files.forEach(file => {
                const dataFilePath = path.join(dataFolder, file);
                const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

                const outputFileName = this.interpolateFileName(node.namePattern, data);
                const filePath = path.join(currentPath, outputFileName);

                const html = handleBarTemplate(data);
                fs.writeFileSync(filePath, html, 'utf8');
                console.log(`INFO: File generated: ${filePath}`);
            });
        } catch (error) {
            console.error(`ERROR: Generating files from data folder: ${error.message}`);
        }
    }

    async generateFilesFromSingleDataFile(node, currentPath) {
        console.log("Generate File From Single Data File Called");

        try {
            const filePath = node.data; // The JSON file containing data for all products
            const templateFile = fs.readFileSync(node.template, 'utf8');


            const handleBarTemplate = Handlebars.compile(templateFile);


            // Read the entire JSON file containing data for all products
            const allProductsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            console.log(allProductsData);

            // Loop through each product in the data array
            allProductsData.forEach(productData => {
                const outputFileName = this.interpolateFileName(node.namePattern, productData);
                const fullPath = path.join(currentPath, outputFileName);

                // Generate HTML for the current product
                const html = handleBarTemplate(productData);
                fs.writeFileSync(fullPath, html, 'utf8');
                console.log(`INFO: File generated for product: ${outputFileName}`);
            });
        } catch (error) {
            console.error(`ERROR: Generating files from single data file: ${error.message}`);
        }
    }

    async generatePageFromConfig(pageConfig) {
        const { components, output, pageTemplate } = pageConfig;
        
        const pageTemplateContent = fs.readFileSync(pageTemplate, 'utf8');
        const pageTemplateCompiled = Handlebars.compile(pageTemplateContent);

        let context = {};
        for (let component of components) {
            const componentHTML = await this.processComponent(component);
            context[component.name] = componentHTML;
        }

        const pageContent = pageTemplateCompiled(context);
        // const outputPath = path.join(this.basePath, output.outputPath);
        fs.writeFileSync(output.outputPath, pageContent, 'utf8');
        console.log(`INFO: Page generated at: ${output.outputPath}`);
    }

    async processComponent(component) {
        const { name, template, data } = component;
        // if (this.componentsCache[name]) {
        //     return this.componentsCache[name]; // Return from cache if available
        // }
        // const templatePath = path.join(this.basePath, template);
        // const dataPath = path.join(this.basePath, data);
        const templateContent = fs.readFileSync(template, 'utf8');
        const dataContent = JSON.parse(fs.readFileSync(data, 'utf8'));

        const templateCompiled = Handlebars.compile(templateContent);
        const html = templateCompiled(dataContent);

        this.componentsCache[name] = html; // Cache the generated HTML
        return html;
    }

    interpolateFileName(pattern, data) {
        // Replace placeholders like {{name}} with corresponding data values
        return pattern.replace(/{{(.*?)}}/g, (_, key) => data[key] || 'unknown');
    }

    async generateFile(node, currentPath) {
        try {
            const filePath = path.join(currentPath, node.name);
            const templateFile = fs.readFileSync(node.template, 'utf8');
            const dataFile = JSON.parse(fs.readFileSync(node.data, 'utf8'));
            const handleBarTemplate = Handlebars.compile(templateFile);
            const html = handleBarTemplate(dataFile);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`INFO: File generated: ${filePath}`);
        } catch (error) {
            console.error(`ERROR: Generating single file: ${error.message}`);
        }
    }
}
