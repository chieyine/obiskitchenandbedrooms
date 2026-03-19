const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const wpUrl = process.env.WORDPRESS_URL;
const username = process.env.WP_ADMIN_USER;
const password = process.env.WP_ADMIN_PASSWORD;

const productsData = [
    {
        name: "Sliding Door Wardrobe",
        regular_price: "1200",
        description: "Sliding doors are ideal where space is tight. We build around your exact measurements, with internal shelving, drawers and rails designed for how you actually use the space.",
        short_description: "A clean, space-saving wardrobe design tailored to your room.",
        categories: "Wardrobes",
        customImages: [
            "/images/photo-1616486029423-aaa4789e8c9a.jpg",
            "/images/photo-1567016432779-094069958ea5.jpg",
            "/images/photo-1567538096630-e0c55bd6374c.jpg",
            "/images/photo-1616486338812-3dadae4b4ace.jpg"
        ]
    },
    {
        name: "Hinged Door Wardrobe",
        regular_price: "950",
        description: "A simple, practical option that suits most bedrooms. Choose your finish, handles and internal layout—then we install it properly with no awkward gaps.",
        short_description: "Classic hinged doors with smart internal storage.",
        categories: "Wardrobes",
        customImages: [
            "/images/photo-1555041469-a586c61ea9bc.jpg",
            "/images/photo-1567016432779-094069958ea5.jpg",
            "/images/photo-1567538096630-e0c55bd6374c.jpg",
            "/images/photo-1616593969747-4797dc75033e.jpg"
        ]
    },
    {
        name: "Walk-in Wardrobe Design",
        regular_price: "1800",
        description: "We design a walk-in wardrobe around your room shape and storage needs—rails at the right height, drawers where you want them, and shelves that make sense.",
        short_description: "A walk-in layout planned for easy access and organisation.",
        categories: "Wardrobes",
        customImages: [
            "/images/photo-1618220179428-22790b461013.jpg",
            "/images/photo-1617103996702-96ff29b1c467.jpg",
            "/images/photo-1616593969747-4797dc75033e.jpg",
            "/images/photo-1616486338812-3dadae4b4ace.jpg"
        ]
    },
    {
        name: "Shaker Kitchen Cabinets",
        regular_price: "2500",
        description: "Your kitchen is the heart of the home. We build practical base and wall units, pantry cupboards and soft-close drawers with finishes that suit your style and budget.",
        short_description: "Timeless shaker-style cabinets built for daily life.",
        categories: "Kitchens",
        customImages: [
            "/images/photo-1615874959474-d609969a20ed.jpg",
            "/images/photo-1617806118233-18e1de247200.jpg",
            "/images/photo-1493666438817-866a91353ca9.jpg",
            "/images/photo-1484101403633-562f891dc89a.jpg"
        ]
    },
    {
        name: "Handleless Modern Kitchen",
        regular_price: "3200",
        description: "A modern look with practical storage. We can upgrade parts of your kitchen or handle a full transformation, including worktop installation.",
        short_description: "Clean lines, modern finishes, and smart storage.",
        categories: "Kitchens",
        customImages: [
            "/images/photo-1505693416388-ac5ce068fe85.jpg",
            "/images/photo-1484101403633-562f891dc89a.jpg",
            "/images/photo-1486946255434-2466348c2166.jpg",
            "/images/photo-1493666438817-866a91353ca9.jpg"
        ]
    },
    {
        name: "TV Media Wall Unit",
        regular_price: "900",
        description: "A tailored media wall can hide cables, add shelving and create a clean focal point. We build to your room and the size of your TV setup.",
        short_description: "A media wall with storage that keeps the room tidy.",
        categories: "Storage",
        customImages: [
            "/images/photo-1484101403633-562f891dc89a.jpg",
            "/images/photo-1617806118233-18e1de247200.jpg",
            "/images/photo-1567016432779-094069958ea5.jpg",
            "/images/photo-1616486338812-3dadae4b4ace.jpg"
        ]
    }
];

const postsData = [
    {
        title: "Sliding vs Hinged Wardrobes: What’s Best?",
        excerpt: "A quick way to choose the right wardrobe doors for your room size and layout.",
        content: "<p>If your bedroom feels tight around the bed, <strong>sliding doors</strong> can be a smart choice because they don’t swing out into the room.</p><p>If you want the easiest access to the full wardrobe width, <strong>hinged doors</strong> are often better—especially in larger rooms.</p><p>Either way, the biggest difference is inside: shelves, drawers and rails should be planned around how you actually store clothes.</p>",
        customImage: "/images/photo-1618220179428-22790b461013.jpg",
        categoryName: "Wardrobes"
    },
    {
        title: "Kitchen Cabinets: A Simple Planning Checklist",
        excerpt: "Five practical things to decide before you choose a finish or a style.",
        content: "<p>Start with how you cook and move around the kitchen. Then plan:</p><ul><li>Base and wall unit storage</li><li>Pantry space</li><li>Soft-close drawers where you need them</li><li>Worktop height and material</li><li>Lighting and sockets</li></ul><p>Once the layout works, choosing modern or classic finishes becomes easy.</p>",
        customImage: "/images/photo-1615874959474-d609969a20ed.jpg",
        categoryName: "Kitchens"
    },
    {
        title: "Media Walls: The Clean Way to Hide Cables",
        excerpt: "How to keep your TV setup tidy with smart storage and cable routes.",
        content: "<p>A good media wall does two jobs: it looks sharp <em>and</em> keeps everything organised.</p><p>Plan cable routes early, decide what needs cupboards vs open shelves, and keep access to sockets simple. We can build in storage for consoles, routers and sound systems—without making the room feel heavy.</p>",
        customImage: "/images/photo-1484101403633-562f891dc89a.jpg",
        categoryName: "Storage"
    }
];

async function run() {
    if (!wpUrl || !username || !password) {
        console.error("Missing required WordPress environment variables. Please set WORDPRESS_URL, WP_ADMIN_USER and WP_ADMIN_PASSWORD in .env.local.");
        process.exit(1);
    }
    console.log("🚀 Starting Headless WP Populator...");
    let browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log("🔐 Logging in...");
        await page.goto(`${wpUrl}/wp-admin`, { waitUntil: 'networkidle2' });
        
        await page.type('#user_login', username);
        await page.type('#user_pass', password);
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('#wp-submit')
        ]);
        console.log("✅ Logged in successfully.");
        
        console.log("🔑 Generating Application Password...");
        await page.goto(`${wpUrl}/wp-admin/profile.php`, { waitUntil: 'networkidle2' });
        
        // Wait for the Application Passwords section
        await page.waitForSelector('#new_application_password_name');
        await page.type('#new_application_password_name', 'AutoPopulator_' + Math.floor(Math.random() * 1000));
        
        await page.click('#do_new_application_password');
        
        // Wait for a bit to allow the AJAX request to complete
        await new Promise(r => setTimeout(r, 2000));
        
        // Try getting the password using multiple potential selectors since WP updates them sometimes
        const appPassword = await page.evaluate(() => {
            // Check the standard new password block
            let el = document.querySelector('.application-passwords-generate-fallback code, .new-application-password');
            if (!el) {
               // Fallback: look for exactly 24 character space-separated strings in any code block in that section
               const codes = Array.from(document.querySelectorAll('#application-passwords-section code'));
               el = codes.find(c => c.innerText.trim().length >= 19);
            }
            return el ? el.innerText.trim() : null;
        });

        if (!appPassword) {
            await page.screenshot({ path: '/Users/macbookpro/Documents/furniture/wp-admin-debug.png' });
            throw new Error("Could not extract application password. Saved screenshot to wp-admin-debug.png");
        }
        
        console.log(`✅ App Password generated successfully! Extracted: [HIDDEN]`);
        
        await browser.close();
        
        // Switch to REST API mode
        const authHeader = "Basic " + Buffer.from(`${username}:${appPassword}`).toString('base64');
        
        async function apiCall(endpoint, method = 'GET', body = null, headers = {}) {
            const defaultHeaders = { 'Authorization': authHeader };
            if (body && typeof body === 'object' && !(body instanceof Buffer)) {
                defaultHeaders['Content-Type'] = 'application/json';
                body = JSON.stringify(body);
            }
            
            await new Promise(r => setTimeout(r, 800)); // Rate limiting
            
            const response = await fetch(`${wpUrl}/wp-json${endpoint}`, {
                method,
                headers: { ...defaultHeaders, ...headers },
                body
            });
            
            if (!response.ok) {
                console.log(await response.text());
                throw new Error(`API error ${response.status}`);
            }
            return response.json();
        }

        async function uploadImage(imagePath) {
            console.log(`Uploading ${path.basename(imagePath)}...`);
            const publicRoot = process.env.PUBLIC_ASSETS_ROOT || path.join(__dirname, 'public');
            const fullPath = path.join(publicRoot, imagePath);
            if (!fs.existsSync(fullPath)) return null;
            
            const buffer = fs.readFileSync(fullPath);
            const filename = path.basename(fullPath);
            const res = await apiCall('/wp/v2/media', 'POST', buffer, {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="${filename}"`
            });
            return res.id;
        }

        const imageCache = {};
        async function getOrUploadImage(imagePath) {
            if (!imagePath) return null;
            if (imageCache[imagePath]) return imageCache[imagePath];
            const id = await uploadImage(imagePath);
            imageCache[imagePath] = id;
            return id;
        }

        const productCategoriesStore = {};
        async function ensureProductCategory(name) {
            if (productCategoriesStore[name]) return productCategoriesStore[name];
            try {
                const existing = await apiCall(`/wc/v3/products/categories?search=${encodeURIComponent(name)}`);
                if (existing && existing.length > 0) {
                    productCategoriesStore[name] = existing[0].id;
                    return existing[0].id;
                }
                const created = await apiCall(`/wc/v3/products/categories`, 'POST', { name });
                productCategoriesStore[name] = created.id;
                return created.id;
            } catch (e) { return null; }
        }

        const wpCategoriesStore = {};
        async function ensureWpCategory(name) {
            if (wpCategoriesStore[name]) return wpCategoriesStore[name];
            try {
                const existing = await apiCall(`/wp/v2/categories?search=${encodeURIComponent(name)}`);
                if (existing && existing.length > 0) {
                    wpCategoriesStore[name] = existing[0].id;
                    return existing[0].id;
                }
                const created = await apiCall(`/wp/v2/categories`, 'POST', { name });
                wpCategoriesStore[name] = created.id;
                return created.id;
            } catch (e) { return null; }
        }

        for (const prod of productsData) {
            console.log(`\n📦 Creating Product: ${prod.name}`);
            let catId = null;
            try { catId = await ensureProductCategory(prod.categories); } catch(e){}
            
            const imageObjects = [];
            for (const imgPath of prod.customImages) {
                const id = await getOrUploadImage(imgPath);
                if (id) imageObjects.push({ id });
            }
            
            try {
                await apiCall('/wc/v3/products', 'POST', {
                    name: prod.name,
                    type: 'simple',
                    regular_price: String(prod.regular_price),
                    description: prod.description,
                    short_description: prod.short_description,
                    categories: catId ? [{ id: catId }] : [],
                    images: imageObjects,
                    status: 'publish'
                });
                console.log(`✅ Product created.`);
            } catch (e) { console.log(`❌ Error: ${e.message}`); }
        }
        
        for (const post of postsData) {
            console.log(`\n📝 Creating Post: ${post.title}`);
            let catId = null;
            try { catId = await ensureWpCategory(post.categoryName); } catch(e){}
            const imgId = await getOrUploadImage(post.customImage);
            
            try {
                await apiCall('/wp/v2/posts', 'POST', {
                    title: post.title,
                    content: post.content,
                    excerpt: post.excerpt,
                    status: 'publish',
                    categories: catId ? [catId] : [],
                    featured_media: imgId || 0
                });
                console.log(`✅ Post created.`);
            } catch (e) { console.log(`❌ Error: ${e.message}`); }
        }

        console.log("\n🎉 Done!");
    } catch (e) {
        console.error("Fatal error:", e);
        if (browser) await browser.close();
    }
}

run();
