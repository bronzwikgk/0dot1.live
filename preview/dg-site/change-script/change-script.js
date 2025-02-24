const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoryPath = path.join(__dirname, '../'); // Specify your folder with HTML files

// Function to remove the specified HTML snippet
const removeSnippet = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            return;
        }

        const $ = cheerio.load(data);
        let modified = false;

        // Check and remove elements by id
        if ($('#chat-icon').length || $('#chat-window').length) {
            $('#chat-icon').remove();
            $('#chat-window').remove();
            modified = true;
        }

        // Check and remove the script
        $('script').each(function() {
            if ($(this).html().includes('toggleChat()')) {
                $(this).remove();
                modified = true;
            }
        });

        if (modified) {
            const modifiedHtml = $.html();
            // Write the modified HTML back to the same file
            fs.writeFile(filePath, modifiedHtml, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file: ${filePath}`, err);
                    return;
                }
                console.log(`File updated: ${filePath}`);
            });
        }
    });
};

// Recursive function to process each file and directory
const processDirectory = (dirPath) => {
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
        if (err) {
            console.error(`Error reading directory: ${dirPath}`, err);
            return;
        }

        dirents.forEach((dirent) => {
            const fullPath = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                processDirectory(fullPath); // Recursively process each directory
            } else if (dirent.isFile() && path.extname(dirent.name) === '.html') {
                removeSnippet(fullPath); // Process each HTML file
            }
        });
    });
};

// Start processing from the initial directory
processDirectory(directoryPath);
