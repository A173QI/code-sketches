const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Handle POST request to save decorations
    if (req.method === 'POST' && pathname === '/save-decorations') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const relativePath = data.filePath; // e.g., "sketches/p5js/flowfield.html"
                const newDecorHtml = data.decorHtml;

                if (!relativePath || typeof newDecorHtml !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid parameters' }));
                    return;
                }

                // Resolve path safely to prevent directory traversal
                const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
                const absolutePath = path.join(ROOT_DIR, safePath);

                if (!fs.existsSync(absolutePath)) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: `File not found: ${relativePath}` }));
                    return;
                }

                let content = fs.readFileSync(absolutePath, 'utf8');

                // Regex to find and replace the decoration section
                // It looks for <!-- Background collage decorations (behind papers) --> up to the next non-image tag
                const regex = /<!-- Background collage decorations \(behind papers\) -->[\s\S]*?(?=<img[^>]*class=["'][^"']*deco-img[^"']*["'])/;
                
                // Clear any existing comments and images containing class deco-img
                content = content.replace(/<!-- Background collage decorations \(behind papers\) -->/g, '');
                content = content.replace(/<img[^>]*class=["'][^"']*deco-img[^"']*["'][^>]*>\s*/g, '');

                // Inject the new decorations right inside the sketch-content container
                const match = content.match(/(<div[^>]*class=["']sketch-content[^"']*["'][^>]*>)/);

                if (match) {
                    const insertIndex = match.index + match[0].length;
                    const updatedContent = content.substring(0, insertIndex) + '\n' + newDecorHtml + content.substring(insertIndex);
                    
                    fs.writeFileSync(absolutePath, updatedContent, 'utf8');
                    console.log(`[Server] Overwrote decorations in: ${relativePath}`);
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Could not find sketch-content container in the target file.' }));
                }
            } catch (err) {
                console.error('[Server] Error saving decorations:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Default to index.html if pointing to a directory
    if (pathname.endsWith('/')) {
        pathname += 'index.html';
    }

    const filePath = path.join(ROOT_DIR, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${pathname}`);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`500 Internal Server Error: ${err.code}`);
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`[Server] Developer tools server running at http://localhost:${PORT}`);
    console.log(`[Server] Ready to save layout editor modifications directly to disk!`);
});
