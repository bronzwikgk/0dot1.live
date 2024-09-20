// Function to fetch all categories
async function fetchCategories() {
    try {
        const response = await fetch('https://dg-back.onrender.com/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        console.log('Categories fetched:', categories);
        
        // Handle displaying categories in the UI
        // For example:
        // renderCategories(categories);
        
    } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Error fetching categories. Please try again later.');
    }
}

// Function to fetch a single category by ID
async function fetchCategoryById(categoryId) {
    try {
        const response = await fetch(`https://dg-back.onrender.com/categories/${categoryId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }
        const category = await response.json();
        console.log('Category fetched:', category);
        
        // Handle displaying category details in the UI
        // For example:
        // renderCategoryDetail(category);
        
    } catch (error) {
        console.error('Error fetching category:', error);
        alert('Error fetching category. Please try again later.');
    }
}

// Function to create a new category
async function createCategory(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById('category-name').value;
    const description = document.getElementById('category-description').value;

    try {
        const response = await fetch('https://dg-back.onrender.com/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error('Failed to create category');
        }
        const newCategory = await response.json();
        console.log('Category created:', newCategory);

        // Handle successful category creation
        // For example:
        // fetchCategories(); // Refresh the category list

    } catch (error) {
        console.error('Error creating category:', error);
        alert('Error creating category. Please try again later.');
    }
}

// Function to update an existing category
async function updateCategory(categoryId, event) {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById('update-category-name').value;
    const description = document.getElementById('update-category-description').value;

    try {
        const response = await fetch(`https://dg-back.onrender.com/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error('Failed to update category');
        }
        const updatedCategory = await response.json();
        console.log('Category updated:', updatedCategory);

        // Handle successful category update
        // For example:
        // fetchCategories(); // Refresh the category list

    } catch (error) {
        console.error('Error updating category:', error);
        alert('Error updating category. Please try again later.');
    }
}

// Function to delete a category
async function deleteCategory(categoryId) {
    try {
        const response = await fetch(`https://dg-back.onrender.com/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete category');
        }
        console.log('Category deleted');

        // Handle successful category deletion
        // For example:
        // fetchCategories(); // Refresh the category list

    } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category. Please try again later.');
    }
}

// Event listeners for category forms
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('createCategoryForm');
    const updateForm = document.getElementById('updateCategoryForm');

    if (createForm) {
        createForm.addEventListener('submit', createCategory);
    }

    if (updateForm) {
        updateForm.addEventListener('submit', (event) => {
            const categoryId = document.getElementById('update-category-id').value;
            updateCategory(categoryId, event);
        });
    }

    // Fetch categories on page load
    fetchCategories();
});
