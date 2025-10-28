const fs = require('fs');


fs.mkdir('myFolder', (err) => {
    if (err) {
        console.error('Error creating catalog:', err);
    } else {
        console.log('Catalog created successfully!')

        fs.rmdir('myFolder', (err) => {
            if (err) {
                console.error('Error deleting catalog:', err);
            } else {
                console.log('Catalog deleted successfully!')
            }
        });
    }
    
});

