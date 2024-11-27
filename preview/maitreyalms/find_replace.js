const fs = require('fs');
const path = require('path');

/**
 * Replace occurrences of a word in file content, file names, and folder names.
 * @param {string} folderPath - The path of the folder to search.
 * @param {string} findWord - The word to find.
 * @param {string} replaceWord - The word to replace it with.
 */
function findAndReplace(folderPath, findWord, replaceWord) {
    if (!fs.existsSync(folderPath)) {
        console.error('The provided folder path does not exist:', folderPath);
        return;
    }

    // Read all items in the directory
    const items = fs.readdirSync(folderPath);

    items.forEach(item => {
        const currentPath = path.join(folderPath, item);
        let newPath;

        // Rename files and folders if they contain the findWord
        if (item.includes(findWord)) {
            newPath = path.join(folderPath, item.replace(findWord, replaceWord));
            fs.renameSync(currentPath, newPath);
            console.log(`Renamed: ${currentPath} -> ${newPath}`);
        } else {
            newPath = currentPath;
        }

        // Check if the current item is a directory
        if (fs.lstatSync(newPath).isDirectory()) {
            // Recursive call for subdirectories
            findAndReplace(newPath, findWord, replaceWord);
        } else {
            // Process file content for replacements
            const fileContent = fs.readFileSync(newPath, 'utf8');
            if (fileContent.includes(findWord)) {
                const updatedContent = fileContent.split(findWord).join(replaceWord);
                fs.writeFileSync(newPath, updatedContent, 'utf8');
                console.log(`Updated content in file: ${newPath}`);
            }
        }
    });
}

// Input parameters
const folderPath ="./dist";
const findWord = "Joseph S. Ferland";
const replaceWord = "Sunil Singh";

if (!folderPath || !findWord || !replaceWord) {
    console.error('Usage: node script.js <folderPath> <findWord> <replaceWord>');
    process.exit(1);
}

// Start the find and replace operation
findAndReplace(folderPath, findWord, replaceWord);
